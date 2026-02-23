import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState } from "react";

const STACK = [
    { name: "React 19", color: "#61DAFB" },
    { name: "Three.js", color: "#ffffff" },
    { name: "Tailwind 4", color: "#38BDF8" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Framer Motion", color: "#BB4CF7" },
    { name: "Vite", color: "#BD34FE" },
];

export default function TechStackBadge() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <motion.div
                layout
                onClick={() => setExpanded(e => !e)}
                className="flex flex-col items-center gap-2 px-4 py-2 rounded-2xl border border-primary/15 bg-background/70 backdrop-blur-md cursor-pointer hover:border-primary/40 transition-colors shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <Layers className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                        Built with
                    </span>
                </div>

                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap justify-center gap-1.5 max-w-[220px]"
                    >
                        {STACK.map((tech) => (
                            <span
                                key={tech.name}
                                className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                                style={{ color: tech.color, borderColor: `${tech.color}40`, background: `${tech.color}10` }}
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
