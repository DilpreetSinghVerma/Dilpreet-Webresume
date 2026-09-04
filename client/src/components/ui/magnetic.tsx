import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!rectRef.current) {
            if (ref.current) {
                rectRef.current = ref.current.getBoundingClientRect();
            } else {
                return;
            }
        }
        const { clientX, clientY } = e;
        const { left, top, width, height } = rectRef.current;
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.25);
        y.set(middleY * 0.25);
    };

    const handleMouseLeave = () => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ 
                position: "relative",
                translateX: springX,
                translateY: springY
            }}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}
