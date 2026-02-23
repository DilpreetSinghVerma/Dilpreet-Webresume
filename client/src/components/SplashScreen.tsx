import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const LETTERS = "DILPREET SINGH".split("");

// ── Cyberpunk boot chime synthesizer ──────────────────────────────────────────
function playBootSound() {
    try {
        const ctx = new AudioContext();

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.18, ctx.currentTime);
        master.connect(ctx.destination);

        // 1. Low power-on hum sweep (80Hz → 320Hz over 0.8s)
        const sweep = ctx.createOscillator();
        const sweepGain = ctx.createGain();
        sweep.type = "sawtooth";
        sweep.frequency.setValueAtTime(80, ctx.currentTime);
        sweep.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.8);
        sweepGain.gain.setValueAtTime(0.4, ctx.currentTime);
        sweepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        sweep.connect(sweepGain);
        sweepGain.connect(master);
        sweep.start(ctx.currentTime);
        sweep.stop(ctx.currentTime + 0.9);

        // 2. Data-stream glitch (white noise burst)
        const bufferSize = ctx.sampleRate * 0.08;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.value = 2400;
        noiseFilter.Q.value = 0.8;
        noise.buffer = noiseBuffer;
        noiseGain.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);
        noise.start(ctx.currentTime + 0.1);

        // 3. Rising tone chime (confirmation ping — 440Hz → 880Hz)
        const ping = ctx.createOscillator();
        const pingGain = ctx.createGain();
        ping.type = "sine";
        ping.frequency.setValueAtTime(440, ctx.currentTime + 0.85);
        ping.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 1.15);
        pingGain.gain.setValueAtTime(0.0, ctx.currentTime + 0.85);
        pingGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.9);
        pingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
        ping.connect(pingGain);
        pingGain.connect(master);
        ping.start(ctx.currentTime + 0.85);
        ping.stop(ctx.currentTime + 1.45);

        // 4. Soft harmonic overtone on the ping
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = "sine";
        overtone.frequency.setValueAtTime(880, ctx.currentTime + 0.9);
        overtone.frequency.exponentialRampToValueAtTime(1840, ctx.currentTime + 1.15);
        overtoneGain.gain.setValueAtTime(0.0, ctx.currentTime + 0.9);
        overtoneGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.95);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
        overtone.connect(overtoneGain);
        overtoneGain.connect(master);
        overtone.start(ctx.currentTime + 0.9);
        overtone.stop(ctx.currentTime + 1.45);

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
