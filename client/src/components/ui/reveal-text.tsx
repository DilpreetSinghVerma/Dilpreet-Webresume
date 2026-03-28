import { motion } from "framer-motion";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
    const words = text.split(" ");
    
    return (
        <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-flex mr-[0.3em] overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.05,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
