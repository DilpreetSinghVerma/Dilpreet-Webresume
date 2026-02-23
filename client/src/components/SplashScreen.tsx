import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = "DILPREET SINGH".split("");

export default function SplashScreen({ onDone }: { onDone: () => void }) {
    const [phase, setPhase] = useState<"letters" | "logo" | "exit">("letters");

    useEffect(() => {
        // Phase 1: show letters for 1.6s
        const t1 = setTimeout(() => setPhase("logo"), 1600);
        // Phase 2: hold logo for 0.9s then exit
        const t2 = setTimeout(() => setPhase("exit"), 2600);
        // Phase 3: unmount after exit animation (0.7s)
        const t3 = setTimeout(() => onDone(), 3300);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    return (
        <AnimatePresence>
            {phase !== "exit" ? (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020204] overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    {/* Animated radial glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        style={{
                            background:
                                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 80%)",
                        }}
                    />

                    {/* Scanning line */}
                    <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none"
                        initial={{ top: "-2px", opacity: 0 }}
                        animate={{ top: "102%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.4, delay: 0.2, ease: "linear" }}
                    />

                    {phase === "letters" && (
                        <div className="flex items-center gap-[2px] sm:gap-1 select-none">
                            {LETTERS.map((char, i) => (
                                <motion.span
                                    key={i}
                                    className={`font-display font-bold tracking-tighter text-foreground ${char === " " ? "w-4 sm:w-6" : "text-3xl sm:text-5xl md:text-7xl"
                                        }`}
                                    style={{
                                        color: char === " " ? "transparent" : undefined,
                                        textShadow: char !== " " ? "0 0 30px rgba(0,229,255,0.6)" : undefined,
                                    }}
                                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        delay: i * 0.06,
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                >
                                    {char === " " ? "\u00a0" : char}
                                </motion.span>
                            ))}
                        </div>
                    )}

                    {phase === "logo" && (
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* DS monogram */}
                            <motion.div
                                className="w-20 h-20 rounded-2xl border border-cyan-400/30 flex items-center justify-center"
                                style={{
                                    background: "rgba(0,229,255,0.05)",
                                    boxShadow: "0 0 40px rgba(0,229,255,0.2), inset 0 0 20px rgba(0,229,255,0.03)",
                                }}
                                animate={{
                                    boxShadow: [
                                        "0 0 30px rgba(0,229,255,0.2)",
                                        "0 0 60px rgba(0,229,255,0.35)",
                                        "0 0 30px rgba(0,229,255,0.2)",
                                    ],
                                }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span
                                    className="text-4xl font-display font-bold text-cyan-400"
                                    style={{ textShadow: "0 0 20px rgba(0,229,255,0.8)" }}
                                >
                                    DS.
                                </span>
                            </motion.div>
                            <motion.p
                                className="text-xs font-mono tracking-[0.4em] text-cyan-400/60 uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                AIML · Python · Developer
                            </motion.p>
                        </motion.div>
                    )}

                    {/* Bottom progress bar */}
                    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-cyan-400/40"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
