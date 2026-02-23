import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState } from "react";

const STACK = [
    { name: "React 19", color: "#61DAFB" },
    { name: "Three.js", color: "#ffffff" },
    { name: "Tailwind CSS 4", color: "#38BDF8" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Framer Motion", color: "#BB4CF7" },
    { name: "Vite", color: "#BD34FE" },
    { name: "Node.js", color: "#68A063" },
    { name: "Groq AI", color: "#F55036" },
];

// In-page footer badge — not fixed/floating
export default function TechStackBadge() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center pb-10 pt-4"
        >
            <motion.div
                layout
                onClick={() => setExpanded(e => !e)}
                className="flex flex-col items-center gap-3 px-5 py-3 rounded-2xl border border-primary/15 bg-background/60 backdrop-blur-md cursor-pointer hover:border-primary/40 transition-colors shadow-lg max-w-sm w-full"
            >
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-mono tracking-widest uppercase">
                        {expanded ? "Built with ↑" : "Built with ↓"}
                    </span>
                </div>

                {expanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-2"
                    >
                        {STACK.map((tech) => (
                            <span
                                key={tech.name}
                                className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                                style={{ color: tech.color, borderColor: `${tech.color}40`, background: `${tech.color}12` }}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
