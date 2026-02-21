import { useState, useCallback, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";

export default function useTextScramble(text: string) {
    const [displayText, setDisplayText] = useState(text);
    const iterationRef = useRef(0);
    const frameRef = useRef<number>(0);

    const scramble = useCallback(() => {
        iterationRef.current = 0;

        const update = () => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iterationRef.current) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iterationRef.current < text.length) {
                iterationRef.current += 1 / 3;
                frameRef.current = requestAnimationFrame(update);
            }
        };

        frameRef.current = requestAnimationFrame(update);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [text]);

    return { displayText, scramble };
}

export function ScrambledText({ text, className }: { text: string, className?: string }) {
    const { displayText, scramble } = useTextScramble(text);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenInView) {
                    scramble();
                    setHasBeenInView(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [scramble, hasBeenInView]);

    return (
        <span ref={ref} className={className} onMouseEnter={scramble}>
            {displayText}
        </span>
    );
}
