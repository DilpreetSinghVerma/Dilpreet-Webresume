import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const LETTERS = "DILPREET SINGH".split("");

function playBootSound() {
    try {
        const ctx = new AudioContext();
        const master = ctx.createGain();
        master.gain.setValueAtTime(0.0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
        master.connect(ctx.destination);

        const delay = ctx.createDelay(0.4);
        const delayGain = ctx.createGain();
        delay.delayTime.value = 0.18;
        delayGain.gain.value = 0.18;
        delay.connect(delayGain);
        delayGain.connect(delay);
        delayGain.connect(master);

        const note = (freq: number, t: number, dur: number, vol: number) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(vol, t + 0.04);
            g.gain.exponentialRampToValueAtTime(0.001, t + dur);
            osc.connect(g); g.connect(master); g.connect(delay);
            osc.start(t); osc.stop(t + dur + 0.05);
        };

        const t = ctx.currentTime;
        note(587.33, t + 0.00, 0.7, 0.28);
        note(739.99, t + 0.18, 0.7, 0.24);
        note(880.00, t + 0.36, 0.8, 0.20);
        note(1174.7, t + 0.56, 1.1, 0.15);
        return ctx;
    } catch { return null; }
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
    const [phase, setPhase] = useState<"logo" | "letters" | "exit">("logo");
    const [soundBlocked, setSoundBlocked] = useState(false);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        const ctx = playBootSound();
        if (!ctx || ctx.state === "suspended") setSoundBlocked(true);
    }, []);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("letters"), 1200);
        const t2 = setTimeout(() => {
            setPhase("exit");
            // Tell Hero to show its text and begin its cross-fade IN
            window.dispatchEvent(new CustomEvent("splashRevealing"));
        }, 2800);
        // Give time for the cross-fade to complete before unmounting
        const t3 = setTimeout(() => onDone(), 3700);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    const enableSound = () => { setSoundBlocked(false); setMuted(false); playBootSound(); };

    return (
        <AnimatePresence>
            {phase !== "exit" ? (
                // ── INTRO SCREEN (logo + letters) ──────────────────────────────
                <motion.div
                    key="splash"
                    className="no-transition fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#020204" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div className="no-transition absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 80%)" }}
                    />
                    <motion.div className="no-transition absolute left-0 right-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(to right, transparent, rgba(0,229,255,0.6), transparent)" }}
                        initial={{ top: "-2px", opacity: 0 }}
                        animate={{ top: "102%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.4, delay: 0.2, ease: "linear" }}
                    />

                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        onClick={soundBlocked ? enableSound : () => setMuted(m => !m)}
                        className="no-transition absolute top-5 right-5 p-2 rounded-full"
                        style={{ border: "1px solid rgba(0,229,255,0.2)", background: "rgba(0,229,255,0.05)", color: "rgba(0,229,255,0.6)" }}
                    >
                        {soundBlocked || muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </motion.button>
                    {soundBlocked && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                            onClick={enableSound} className="no-transition absolute top-12 right-2 cursor-pointer"
                            style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(0,229,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                            tap for sound
                        </motion.p>
                    )}

                    <AnimatePresence mode="wait">
                        {phase === "logo" && (
                            <motion.div key="logo" className="no-transition flex flex-col items-center gap-4"
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div className="no-transition w-24 h-24 rounded-2xl flex items-center justify-center"
                                    style={{ border: "1px solid rgba(0,229,255,0.3)", background: "rgba(0,229,255,0.05)", boxShadow: "0 0 40px rgba(0,229,255,0.2)" }}
                                    animate={{ boxShadow: ["0 0 30px rgba(0,229,255,0.2)", "0 0 65px rgba(0,229,255,0.4)", "0 0 30px rgba(0,229,255,0.2)"] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                >
                                    <span className="no-transition text-5xl font-display font-bold" style={{ color: "#00e5ff", textShadow: "0 0 24px rgba(0,229,255,0.9)" }}>DS.</span>
                                </motion.div>
                                <motion.p className="no-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                    style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.35em", color: "rgba(0,229,255,0.5)", textTransform: "uppercase" }}>
                                    Initializing...
                                </motion.p>
                            </motion.div>
                        )}

                        {phase === "letters" && (
                            <motion.div key="letters" className="no-transition flex flex-col items-center gap-6"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                            >
                                <div className="no-transition flex items-center gap-[2px] sm:gap-1 select-none">
                                    {LETTERS.map((char, i) => (
                                        <motion.span key={i}
                                            className={`no-transition font-display font-bold tracking-tighter ${char === " " ? "w-4 sm:w-6" : "text-3xl sm:text-5xl md:text-7xl"}`}
                                            style={{ color: char === " " ? "transparent" : "#ffffff", textShadow: char !== " " ? "0 0 30px rgba(0,229,255,0.5)" : undefined }}
                                            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            transition={{ delay: i * 0.065, duration: 0.35, ease: "easeOut" }}
                                        >
                                            {char === " " ? "\u00a0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                                <motion.p className="no-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                                    style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.4em", color: "rgba(0,229,255,0.55)", textTransform: "uppercase" }}>
                                    AIML · Python · Developer
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div className="no-transition absolute bottom-0 left-0 h-[2px]"
                        style={{ background: "rgba(0,229,255,0.45)" }}
                        initial={{ width: "0%" }} animate={{ width: "100%" }}
                        transition={{ duration: 3.0, ease: "easeInOut" }}
                    />
                </motion.div>
            ) : (
                // ── EXIT PHASE: ONLY the background fades — text does NOT move ──
                // The hero h1 cross-fades IN simultaneously at the same spot
                <motion.div
                    key="splash-exit"
                    className="no-transition fixed inset-0 z-[9998] pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    style={{ backgroundColor: "#020204" }}
                />
            )}
        </AnimatePresence>
    );
}
