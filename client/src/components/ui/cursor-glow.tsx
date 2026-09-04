import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false);
    const visibleRef = useRef(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 200, mass: 0.1 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // Only enable on desktop devices with a fine pointer (mouse), not touchscreens
        const isFinePointer = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 768;
        if (!isFinePointer) return;

        setEnabled(true);

        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visibleRef.current) {
                visibleRef.current = true;
                setIsVisible(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const toElement = (e as any).toElement;
            if (!e.relatedTarget && !toElement) {
                visibleRef.current = false;
                setIsVisible(false);
            }
        };

        const handleMouseIn = () => {
            visibleRef.current = true;
            setIsVisible(true);
        };

        window.addEventListener("mousemove", moveMouse, { passive: true });
        document.addEventListener("mouseleave", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseIn);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            document.removeEventListener("mouseleave", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseIn);
        };
    }, [mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* GPU-accelerated soft radial glow instead of heavy blur-80px filter */}
            <motion.div
                className="absolute w-[260px] h-[260px] rounded-full pointer-events-none"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                    willChange: "transform",
                }}
            />
            <motion.div
                className="absolute w-8 h-8 rounded-full border border-primary/30 mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    willChange: "transform",
                }}
            />
        </motion.div>
    );
}
