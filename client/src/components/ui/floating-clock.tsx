import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FloatingClock() {
    const [time, setTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const ist = new Date(utc + 5.5 * 3600000);
            const h = ist.getHours();
            const m = ist.getMinutes().toString().padStart(2, "0");
            const s = ist.getSeconds().toString().padStart(2, "0");
            const ampm = h >= 12 ? "PM" : "AM";
            const h12 = h % 12 || 12;
            setTime(`${h12}:${m}:${s} ${ampm}`);
            setIsDay(h >= 6 && h < 20);
            if (h >= 5 && h < 12) setGreeting("Good morning");
            else if (h >= 12 && h < 17) setGreeting("Good afternoon");
            else if (h >= 17 && h < 20) setGreeting("Good evening");
            else setGreeting("Late night coding");
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="fixed bottom-6 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/15 bg-background/70 backdrop-blur-md text-xs font-mono shadow-lg select-none"
        >
            <span className="text-base">{isDay ? "☀️" : "🌙"}</span>
            <div>
                <div className="text-foreground font-semibold tracking-wider">{time}</div>
                <div className="text-muted-foreground text-[10px]">{greeting} · IST</div>
            </div>
        </motion.div>
    );
}
