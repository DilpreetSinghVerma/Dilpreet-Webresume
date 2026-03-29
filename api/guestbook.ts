import type { IncomingMessage, ServerResponse } from "http";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { desc, sql, eq } from "drizzle-orm";

// Define schema locally to avoid bundling issues with shared/ schema in serverless
const guestbookTable = pgTable("guestbook", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  message: text("message").notNull(),
  pinned: text("pinned").default("false"),
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const adminSecret = process.env.ADMIN_SECRET || "dilpreet_admin_2026"; // Default for now
    
    try {
        if (!databaseUrl) {
           return res.status(503).json({ message: "Database connection string missing" });
        }

        const client = neon(databaseUrl);
        const db = drizzle(client);

        // GET: Fetch all entries
        if (req.method === "GET") {
            const entries = await db.select().from(guestbookTable).orderBy(desc(guestbookTable.pinned), desc(guestbookTable.createdAt));
            return res.status(200).json(entries);
        }

        // POST: Add new entry
        if (req.method === "POST") {
            let body = req.body;
            if (typeof body === 'string') body = JSON.parse(body);

            const data = insertGuestbookSchema.parse(body);
            const [entry] = await db.insert(guestbookTable).values({ ...data, pinned: "false" }).returning();
            return res.status(201).json(entry);
        }

        // DELETE: Remove an entry (Admin only)
        if (req.method === "DELETE") {
            const { id, secret } = req.query;
            if (secret !== adminSecret) return res.status(401).json({ message: "Unauthorized" });
            if (!id) return res.status(400).json({ message: "ID required" });

            await db.delete(guestbookTable).where(eq(guestbookTable.id, id));
            return res.status(200).json({ success: true });
        }

        // PATCH: Pin/Unpin an entry (Admin only)
        if (req.method === "PATCH") {
            let body = req.body;
            if (typeof body === 'string') body = JSON.parse(body);
            
            const { id, pinned, secret } = body;
            if (secret !== adminSecret) return res.status(401).json({ message: "Unauthorized" });
            if (!id) return res.status(400).json({ message: "ID required" });

            await db.update(guestbookTable)
                .set({ pinned: pinned ? "true" : "false" })
                .where(eq(guestbookTable.id, id));
            
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error: any) {
        console.error("Guestbook API error:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}
