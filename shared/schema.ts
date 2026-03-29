import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const guestbook = pgTable("guestbook", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  message: text("message").notNull(),
  pinned: text("pinned").default("false"), // Using text for compatibility or boolean
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGuestbookSchema = createInsertSchema(guestbook).pick({
  name: true,
  message: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(2, "Message must be at least 2 characters").max(500, "Message is too long"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GuestbookEntry = typeof guestbook.$inferSelect;
export type InsertGuestbook = z.infer<typeof insertGuestbookSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactMessage = z.infer<typeof contactSchema>;
