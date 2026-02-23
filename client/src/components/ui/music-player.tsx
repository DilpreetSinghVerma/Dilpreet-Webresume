import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music2, Volume2 } from "lucide-react";

export default function MusicPlayer({ className = "" }: { className?: string }) {
    const [playing, setPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio("/music.mp3");
        audio.loop = true;
        audio.volume = 0.25; // low volume
        audio.preload = "metadata";
        audio.addEventListener("canplaythrough", () => setLoaded(true));
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    const toggle = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            try {
                await audio.play();
                setPlaying(true);
            } catch (err) {
                console.error("Audio playback failed:", err);
            }
        }
    };

    return (
        <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md shadow-sm ${className}`}>
            {/* Play / Pause */}
            <button
                onClick={toggle}
                disabled={!loaded}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 hover:bg-primary/30 disabled:opacity-40 transition-colors text-primary"
                title={playing ? "Pause" : "Play music"}
            >
                {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>

            {/* Info */}
            <div className="flex items-center gap-1.5">
                <Music2 className="h-3 w-3 text-muted-foreground shrink-0" />
                <div className="hidden sm:flex flex-col leading-none">
                    <span className="text-[9px] font-mono text-foreground">Music</span>
                    <span className="text-[8px] text-muted-foreground flex items-center gap-1">
                        {playing ? "playing" : loaded ? "paused" : "loading"}
                    </span>
                </div>
            </div>

            {/* Volume Visualizer */}
            {playing && (
                <div className="flex items-center gap-0.5 overflow-hidden ml-1">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-0.5 bg-primary/60 rounded-full"
                            animate={{ height: ["3px", `${3 + i * 3}px`, "3px"] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
