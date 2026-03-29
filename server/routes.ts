import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, insertGuestbookSchema } from "@shared/schema";
import { log } from "./app";

export async function registerRoutes(app: Express): Promise<Server> {
  // Guestbook Routes
  app.get("/api/guestbook", async (_req, res) => {
    try {
      const entries = await storage.getGuestbookEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guestbook entries" });
    }
  });

  app.post("/api/guestbook", async (req, res) => {
    try {
      const data = insertGuestbookSchema.parse(req.body);
      const entry = await storage.createGuestbookEntry(data);
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({
        message: error.errors?.[0]?.message || "Invalid guestbook entry"
      });
    }
  });

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

  // Developer Easter Egg: Hidden API Route
  app.get("/api/resume", (req, res) => {
    res.json({
      name: "Dilpreet Singh",
      role: "AIML Specialist & Python Developer",
      location: "Ludhiana, Punjab, India",
      education: [
        {
          degree: "B.Tech in Computer Science (AIML)",
          institution: "Gulzar Group of Institutes, Khanna",
          expected: "01/2028"
        },
        {
          degree: "12th Grade (90.2%)",
          institution: "Teja Singh Sutantar Memorial Sr. Sec. School",
          status: "Completed"
        }
      ],
      experience: [
        {
          title: "Google Student Ambassador",
          company: "Gulzar Group of Institutes",
          period: "2025 - 2026",
          description: "Representing Google, promoting technologies, and bridging the gap between students and industry resources."
        },
        {
          title: "Technical Support & Assistance",
          company: "Photography and Videography Studio",
          period: "01/2018 - 07/2025",
          description: "Delivered technical assistance, managed media workflows, and optimized processes."
        }
      ],
      skills: [
        "Python", "JavaScript", "TypeScript", "React", "Node.js", "Express", 
        "Machine Learning", "Data Analysis", "SQL", "Tailwind CSS", "Framer Motion"
      ],
      contact: {
        email: "dilpreetsinghverma@gmail.com",
        github: "https://github.com/DilpreetSinghVerma",
        linkedin: "https://www.linkedin.com/in/dilpreet-singh-709b35310/"
      },
      message: "Hey fellow dev! Nice to see you looking around the APIs. Want to build something cool together? Shoot me an email! 🚀"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
