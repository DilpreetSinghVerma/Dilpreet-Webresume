import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music2, Volume2 } from "lucide-react";

export default function MusicPlayer() {
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
            await audio.play();
            setPlaying(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-6 left-4 z-50 flex items-center gap-2.5 px-3 py-2 rounded-xl border border-primary/15 bg-background/80 backdrop-blur-md shadow-lg"
        >
            {/* Play / Pause */}
            <button
                onClick={toggle}
                disabled={!loaded}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 hover:bg-primary/30 disabled:opacity-40 transition-colors text-primary"
                title={playing ? "Pause" : "Play music"}
            >
                {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>

            {/* Info */}
            <div className="flex items-center gap-1.5">
                <Music2 className="h-3 w-3 text-muted-foreground shrink-0" />
                <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-mono text-foreground">Ambient Mix</span>
                    <span className="text-[9px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        {playing ? (
                            <>
                                <motion.span
                                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
                                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                                <span>playing</span>
                            </>
                        ) : loaded ? (
                            "paused"
                        ) : (
                            "loading..."
                        )}
                    </span>
                </div>
            </div>

            {/* Volume indicator */}
            {playing && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    className="flex items-center gap-0.5 overflow-hidden"
                >
                    <Volume2 className="h-2.5 w-2.5 text-primary/60" />
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-0.5 bg-primary/60 rounded-full"
                            animate={{ height: ["4px", `${4 + i * 4}px`, "4px"] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}
