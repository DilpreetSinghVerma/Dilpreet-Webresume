import { motion } from "framer-motion";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
    return (
        <span className={`inline-flex overflow-hidden ${className}`}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.02,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}
