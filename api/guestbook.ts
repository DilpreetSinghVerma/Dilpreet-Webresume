import type { IncomingMessage, ServerResponse } from "http";
import { db } from "../server/db";
import { guestbook, insertGuestbookSchema } from "../shared/schema";
import { desc } from "drizzle-orm";

type VercelRequest = IncomingMessage & { body: any; query: Record<string, string> };
type VercelResponse = ServerResponse & {
    json: (data: any) => VercelResponse;
    status: (code: number) => VercelResponse;
    send: (data: any) => VercelResponse;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // GET: Fetch all entries
    if (req.method === "GET") {
        try {
            if (!db) {
                return res.status(200).json([]);
            }
            const entries = await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));
            return res.status(200).json(entries);
        } catch (error) {
            console.error("Guestbook GET error:", error);
            return res.status(500).json({ message: "Failed to fetch guestbook entries" });
        }
    }

    // POST: Create a new entry
    if (req.method === "POST") {
        try {
            if (!db) {
                return res.status(503).json({ message: "Database not configured on server" });
            }
            
            // For Vercel, req.body might need parsing if not automatically handled
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const data = insertGuestbookSchema.parse(body);
            
            const [entry] = await db.insert(guestbook).values(data).returning();
            return res.status(201).json(entry);
        } catch (error: any) {
            console.error("Guestbook POST error:", error);
            return res.status(400).json({
                message: error.errors?.[0]?.message || "Invalid guestbook entry or database error"
            });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
