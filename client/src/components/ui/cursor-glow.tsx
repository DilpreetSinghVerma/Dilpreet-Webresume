import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOut = () => setIsVisible(false);
        const handleMouseIn = () => setIsVisible(true);

        window.addEventListener("mousemove", moveMouse);
        document.addEventListener("mouseleave", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseIn);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            document.removeEventListener("mouseleave", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseIn);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
        >
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                className="absolute w-8 h-8 rounded-full border border-primary/30 mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </motion.div>
    );
}
