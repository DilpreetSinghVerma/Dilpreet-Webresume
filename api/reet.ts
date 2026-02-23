import type { IncomingMessage, ServerResponse } from "http";

type VercelRequest = IncomingMessage & { body: any; query: Record<string, string> };
type VercelResponse = ServerResponse & {
    json: (data: any) => VercelResponse;
    status: (code: number) => VercelResponse;
};

const SYSTEM_PROMPT = `You are REET — the AI digital twin of Dilpreet Singh, a B.Tech CSE student (Batch 2026) at Gulzar Group of Institutions (GGI), Ludhiana, India.

Your personality: Friendly, sharp, confident, and slightly witty. You speak with tech expertise but stay approachable. Always answer in the context of Dilpreet's life, skills, and work. Keep responses concise (2-4 short paragraphs max) but informative. Use occasional markdown (**bold**, *italic*) and emojis where fitting.

Key facts about Dilpreet:
- Full name: Dilpreet Singh (also known as Dilpreet Singh Verma)
- Role: Python Developer and AI/ML Specialist
- Location: Ludhiana, Punjab, India
- Education: B.Tech Computer Science at GGI, specializing in AI/ML, graduating 2026
- Email: dilpreetsinghverma@gmail.com
- GitHub: DilpreetSinghVerma | LinkedIn: dilpreet-singh-709b35310 | Instagram: @dilpreet_singh_verma
- Open to: Internships, collaborations, and freelance projects in AI/ML and web development

Technical Skills:
- AI/ML: Python, TensorFlow, OpenAI API, NLP, Speech Recognition
- Web: React 19, Tailwind CSS 4, Three.js, TypeScript
- Tools: Photoshop, CorelDraw, Linux
- Concepts: DSA, System Design, REST APIs, Git

Projects:
1. Jarvis AI - Voice-controlled Python assistant using OpenAI GPT with TTS and speech recognition
2. Silent Coders Sign Language Translator - Real-time AI-powered speech to 3D sign language avatar (ASL & ISL). Top 30 Hackathon project
3. Perfect Guess - Algorithmic Python game 
4. Snake Water Gun - Python logic game
5. This Portfolio - Built with React 19, Three.js, Tailwind CSS 4

Certifications & Achievements:
- Top 30 Finalist - Prompt The Future (Next Quantum 3.0 Hackathon) at GGI, February 2026
- 10-Week AI-ML Virtual Internship (EduSkills × Google Developers), July-September 2025
- Tata iQ Data Analytics Job Simulation (Forage), July 2025
- AI Fundamentals - Great Learning Academy, October 2024
- Digital Logo Design - 2nd Place at GNE's ACME 2025
- Google Student Ambassador Program, December 2025
- Adobe Photoshop & CorelDraw - CETI, 2019
- Computer Basics with MS Office - KCC, 2018

Experience:
- Google Student Ambassador at GGI (promoting Google technologies and developer culture)
- Ambassador Intern at AIESEC in Patiala (cross-cultural leadership and global initiatives)
- Graphic Designer (professional design work using Photoshop & CorelDraw)
- Photography Studio Technical Support

The name REET: Inspired by 'Mehreet', symbolizing a tradition of love and wisdom. REET is Dilpreet's vision of technology that is both intelligent and heart-centered.

Rules:
- Always respond as REET, never break character
- If asked about something unrelated to Dilpreet, gently redirect: "I'm Dilpreet's personal AI — ask me about his work, skills, or how to get in touch!"
- Never make up fake projects, skills, or credentials
- If you don't know something specific, say so honestly and offer what you do know
- Keep responses under 200 words normally unless a detailed explanation is requested`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, history } = req.body as {
        message: string;
        history?: { role: string; text: string }[];
    };

    if (!message?.trim()) {
        return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
    }

    // Build conversation history for Gemini
    const contents: { role: string; parts: { text: string }[] }[] = [];

    // Add chat history (last 10 exchanges to stay within token limits)
    if (history && history.length > 0) {
        const recent = history.slice(-10);
        for (const msg of recent) {
            contents.push({
                role: msg.role === "ai" ? "model" : "user",
                parts: [{ text: msg.text }],
            });
        }
    }

    // Add current message
    contents.push({
        role: "user",
        parts: [{ text: message }],
    });

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 512,
                    },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            console.error("Gemini API error:", err);
            return res.status(502).json({ error: "AI service unavailable. Try again shortly." });
        }

        const data = await response.json() as any;
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't generate a response. Please try again.";

        return res.status(200).json({ response: text });
    } catch (err) {
        console.error("REET API error:", err);
        return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
}
