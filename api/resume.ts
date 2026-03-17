import type { IncomingMessage, ServerResponse } from "http";

type VercelRequest = IncomingMessage & { body: any; query: Record<string, string> };
type VercelResponse = ServerResponse & {
    json: (data: any) => VercelResponse;
    status: (code: number) => VercelResponse;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    res.status(200).json({
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
}
