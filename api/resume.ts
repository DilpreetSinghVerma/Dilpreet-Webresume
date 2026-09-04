import type { IncomingMessage, ServerResponse } from "http";

type VercelRequest = IncomingMessage & { body: any; query: Record<string, string> };
type VercelResponse = ServerResponse & {
    json: (data: any) => VercelResponse;
    status: (code: number) => VercelResponse;
    send: (data: any) => VercelResponse;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const resumeData = {
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
        achievements: [
            {
                title: "2nd Position & ₹15,000 Cash Prize — CypherVerse 2026 Hackathon",
                organization: "DevHive Club, CGC University, Mohali",
                date: "08/2026",
                description: "Secured 2nd Position as Team Dream Dive competing in a 24-hour sprint, developing a complete functional AI/ML prototype."
            },
            {
                title: "Top 30 Finalist — Prompt The Future Next Quantum 3.0 Hackathon",
                organization: "Gulzar Group of Institutes",
                date: "02/2026",
                description: "Engineered real-time AI Sign Language Translator (ASL/ISL) with 3D avatars."
            },
            {
                title: "Silver Medalist (2nd Position) — Digital Logo Designing Competition",
                organization: "GNE's ACME 2025",
                date: "04/2025",
                description: "Demonstrated creative digital graphic design and precision."
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
    };

    // Use JSON.stringify with a 2-space indent to pretty-print for terminal users (curl)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(JSON.stringify(resumeData, null, 2));
}
