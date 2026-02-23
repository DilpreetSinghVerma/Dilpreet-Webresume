import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";

type AudioState = { ctx: AudioContext; master: GainNode } | null;

function createAmbientMusic(ctx: AudioContext): GainNode {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    // Delay/reverb chain
    const delay = ctx.createDelay(1.0);
    const delayGain = ctx.createGain();
    delay.delayTime.value = 0.45;
    delayGain.gain.value = 0.3;
    delay.connect(delayGain);
    delayGain.connect(delay);
    delayGain.connect(master);

    // Low-pass filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(master);
    filter.connect(delay);

    // Slow LFO to modulate filter
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Cmaj7 chord: C3, E3, G3, B3, C4
    const notes = [130.81, 164.81, 196.00, 246.94, 261.63];
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const pan = ctx.createStereoPanner();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.detune.value = (i - 2) * 6; // gentle chorus detuning
        gain.gain.value = 0.038;
        pan.pan.value = (i - 2) * 0.28;
        osc.connect(gain);
        gain.connect(pan);
        pan.connect(filter);
        osc.start();
    });

    // Sub bass: C2
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = "sine";
    bass.frequency.value = 65.41;
    bassGain.gain.value = 0.06;
    bass.connect(bassGain);
    bassGain.connect(master);
    bass.start();

    return master;
}

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false);
    const [vol, setVol] = useState(0.18);
    const audioRef = useRef<AudioState>(null);

    const toggle = async () => {
        if (playing) {
            // Fade out then suspend
            if (audioRef.current) {
                audioRef.current.master.gain.linearRampToValueAtTime(0, audioRef.current.ctx.currentTime + 1.2);
                setTimeout(() => audioRef.current?.ctx.suspend(), 1300);
            }
            setPlaying(false);
        } else {
            if (!audioRef.current) {
                const ctx = new AudioContext();
                const master = createAmbientMusic(ctx);
                audioRef.current = { ctx, master };
            } else {
                await audioRef.current.ctx.resume();
                audioRef.current.master.gain.cancelScheduledValues(audioRef.current.ctx.currentTime);
                audioRef.current.master.gain.linearRampToValueAtTime(vol, audioRef.current.ctx.currentTime + 1.5);
            }
            setPlaying(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-20 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/15 bg-background/70 backdrop-blur-md shadow-lg"
        >
            <button
                onClick={toggle}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 hover:bg-primary/30 transition-colors text-primary"
                title={playing ? "Pause ambient music" : "Play ambient music"}
            >
                {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>
            <div className="flex items-center gap-1.5">
                <Music2 className="h-3 w-3 text-muted-foreground" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-foreground leading-tight">Ambient Synth</span>
                    <span className="text-[9px] text-muted-foreground leading-tight">
                        {playing ? (
                            <span className="flex items-center gap-1">
                                <motion.span
                                    className="inline-block w-1 h-1 rounded-full bg-primary"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                />
                                playing
                            </span>
                        ) : "paused"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
