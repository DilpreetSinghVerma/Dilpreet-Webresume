import { type User, type InsertUser, type GuestbookEntry, type InsertGuestbook, users, guestbook } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Guestbook methods
  getGuestbookEntries(): Promise<GuestbookEntry[]>;
  createGuestbookEntry(entry: InsertGuestbook): Promise<GuestbookEntry>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));
  }

  async createGuestbookEntry(entry: InsertGuestbook): Promise<GuestbookEntry> {
    const [newEntry] = await db.insert(guestbook).values(entry).returning();
    return newEntry;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private guestbookEntries: GuestbookEntry[];

  constructor() {
    this.users = new Map();
    this.guestbookEntries = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return [...this.guestbookEntries].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createGuestbookEntry(entry: InsertGuestbook): Promise<GuestbookEntry> {
    const id = randomUUID();
    const newEntry: GuestbookEntry = { ...entry, id, createdAt: new Date() };
    this.guestbookEntries.push(newEntry);
    return newEntry;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
