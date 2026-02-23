import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const LETTERS = "DILPREET SINGH".split("");

// ── Premium 3-note ascending chime (pure sine — clean & musical) ──────────────
function playBootSound() {
    try {
        const ctx = new AudioContext();

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
        master.connect(ctx.destination);

        // Reverb-like effect using a convolver simulation (delay + feedback)
        const delay = ctx.createDelay(0.4);
        const delayGain = ctx.createGain();
        delay.delayTime.value = 0.18;
        delayGain.gain.value = 0.18;
        delay.connect(delayGain);
        delayGain.connect(delay);
        delayGain.connect(master);

        // Helper: play one pure sine note
        const note = (freq: number, startTime: number, duration: number, volume: number) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;

            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.04); // soft attack
            gainNode.gain.setValueAtTime(volume, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // smooth decay

            osc.connect(gainNode);
            gainNode.connect(master);
            gainNode.connect(delay); // add subtle reverb tail
            osc.start(startTime);
            osc.stop(startTime + duration + 0.05);
        };

        const t = ctx.currentTime;
        // A clean ascending major 7th arpeggio: D5 → F#5 → A5 → D6
        note(587.33, t + 0.00, 0.7, 0.28); // D5
        note(739.99, t + 0.18, 0.7, 0.24); // F#5
        note(880.00, t + 0.36, 0.8, 0.20); // A5
        note(1174.7, t + 0.56, 1.1, 0.15); // D6 — high sparkle

        return ctx;
    } catch {
        return null;
    }
}


// ─────────────────────────────────────────────────────────────────────────────
export default function SplashScreen({ onDone }: { onDone: () => void }) {
    const [phase, setPhase] = useState<"letters" | "logo" | "exit">("letters");
    const [soundBlocked, setSoundBlocked] = useState(false);
    const [muted, setMuted] = useState(false);
    const ctxRef = useRef<AudioContext | null>(null);

    // Try to play boot sound immediately on mount
    useEffect(() => {
        const ctx = playBootSound();
        if (ctx) {
            ctxRef.current = ctx;
            // If AudioContext is suspended (autoplay blocked), flag it
            if (ctx.state === "suspended") {
                setSoundBlocked(true);
            }
        } else {
            setSoundBlocked(true);
        }
    }, []);

    // Handle user clicking sound button when blocked
    const enableSound = () => {
        setSoundBlocked(false);
        setMuted(false);
        playBootSound();
    };

    const toggleMute = () => {
        setMuted(m => !m);
        if (!muted && !soundBlocked) {
            // Already playing, nothing to do for pure synthesis
        }
    };

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("logo"), 1600);
        const t2 = setTimeout(() => setPhase("exit"), 2600);
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

                    {/* Sound toggle button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={soundBlocked ? enableSound : toggleMute}
                        className="absolute top-5 right-5 p-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/15 transition-all text-cyan-400/60 hover:text-cyan-400"
                        title={soundBlocked ? "Click to enable sound" : muted ? "Unmute" : "Mute"}
                    >
                        {soundBlocked || muted
                            ? <VolumeX className="h-4 w-4" />
                            : <Volume2 className="h-4 w-4" />
                        }
                    </motion.button>

                    {/* Click-for-sound hint (only shows when blocked) */}
                    {soundBlocked && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            onClick={enableSound}
                            className="absolute top-12 right-2 text-[9px] font-mono text-cyan-400/40 uppercase tracking-widest cursor-pointer"
                        >
                            tap for sound
                        </motion.p>
                    )}

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
