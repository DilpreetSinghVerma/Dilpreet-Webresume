import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
];

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01アBITRATEKERNEL";

export default function EasterEgg() {
    const [active, setActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const keysRef = useRef<string[]>([]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            keysRef.current = [...keysRef.current, e.code].slice(-KONAMI.length);
            if (keysRef.current.join(",") === KONAMI.join(",")) {
                setActive(true);
                keysRef.current = [];
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const cols = Math.floor(canvas.width / fontSize);
        const drops: number[] = new Array(cols).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(2,2,4,0.06)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drops.forEach((y, i) => {
                // Lead character bright cyan
                ctx.fillStyle = "#ffffff";
                ctx.font = `bold ${fontSize}px monospace`;
                ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, y * fontSize);

                // Trail in cyan
                ctx.fillStyle = "#00e5ff";
                ctx.font = `${fontSize}px monospace`;
                ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, (y - 1) * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i] += 0.8;
            });

            animRef.current = requestAnimationFrame(draw);
        };

        ctx.fillStyle = "#020204";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);

        // Auto-dismiss after 6s
        const timeout = setTimeout(() => setActive(false), 6000);

        return () => {
            cancelAnimationFrame(animRef.current);
            clearTimeout(timeout);
        };
    }, [active]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="fixed inset-0 z-[9999] cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActive(false)}
                >
                    <canvas ref={canvasRef} className="w-full h-full" />
                    {/* Glowing center message */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                            className="text-center px-8 py-6 rounded-2xl border border-cyan-400/40"
                            style={{ background: "rgba(2,2,4,0.85)", backdropFilter: "blur(16px)" }}
                        >
                            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">🥚 You found the Easter Egg!</p>
                            <p className="text-white font-display text-2xl font-bold mb-1">Welcome to The Matrix</p>
                            <p className="text-cyan-400/60 font-mono text-xs">↑↑↓↓←→←→BA · Built by Dilpreet</p>
                            <p className="text-muted-foreground text-xs mt-3">Click anywhere to exit</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
