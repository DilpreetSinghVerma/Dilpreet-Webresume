import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { log } from "./app";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);

      // In a real production app, you would use a service like Resend or SendGrid here:
      // await resend.emails.send({ ... })

      log(`New Contact Form Submission: ${JSON.stringify(data)}`);

      res.status(200).json({
        message: "Message received successfully. I'll get back to you soon!"
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.errors?.[0]?.message || "Invalid form data"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
