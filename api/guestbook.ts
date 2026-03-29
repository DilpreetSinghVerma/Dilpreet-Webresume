import type { IncomingMessage, ServerResponse } from "http";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { desc, sql } from "drizzle-orm";

// Define schema locally to avoid bundling issues with shared/ schema in serverless
const guestbookTable = pgTable("guestbook", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertGuestbookSchema = createInsertSchema(guestbookTable).pick({
  name: true,
  message: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(2, "Message must be at least 2 characters").max(500, "Message is too long"),
});

type VercelRequest = IncomingMessage & { body: any; query: Record<string, string> };
type VercelResponse = ServerResponse & {
    json: (data: any) => VercelResponse;
    status: (code: number) => VercelResponse;
};

// Error handling helper
const sendError = (res: VercelResponse, code: number, message: string) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message }));
    return res;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Add missing methods if not present (Vercel usually adds them but just in case)
    res.json = (data: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
    };
    res.status = (code: number) => {
        res.statusCode = code;
        return res;
    };

    const databaseUrl = process.env.DATABASE_URL;
    
    try {
        if (!databaseUrl) {
           return res.status(503).json({ message: "Database connection string missing (DATABASE_URL)" });
        }

        const client = neon(databaseUrl);
        const db = drizzle(client);

        if (req.method === "GET") {
            const entries = await db.select().from(guestbookTable).orderBy(desc(guestbookTable.createdAt));
            return res.status(200).json(entries);
        }

        if (req.method === "POST") {
            // Vercel pre-parses the body in many cases
            let body = req.body;
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return res.status(400).json({ message: "Invalid JSON body" });
                }
            }

            const data = insertGuestbookSchema.parse(body);
            const [entry] = await db.insert(guestbookTable).values(data).returning();
            
            if (!entry) {
                throw new Error("Failed to insert entry");
            }

            return res.status(201).json(entry);
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error: any) {
        console.error("Guestbook API error:", error);
        
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors[0]?.message || "Invalid input data"
            });
        }

        return res.status(500).json({
            message: error.message || "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
