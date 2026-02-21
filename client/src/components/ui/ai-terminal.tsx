import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, ChevronRight, Command } from "lucide-react";

const COMMANDS = {
    "/whois": "DILPREET SINGH: AIML Specialist, Python Developer, and Creative Enthusiast.",
    "/skills": "Python, Machine Learning, Data Structures, Creative Tech, and problem-solving.",
    "/contact": "Email: dilpreetsinghverma@gmail.com | LinkedIn: dilpreet-singh-709b35310",
    "/help": "Available commands: /whois, /skills, /contact, /clear, /help",
    "/clear": "CLEAR"
};

export default function AITerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>(["Welcome to DS-Terminal v1.0.0", "Type /help to see available commands."]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        setHistory(prev => [...prev, `> ${input}`]);

        if (cmd === "/clear") {
            setHistory([]);
        } else if (COMMANDS[cmd as keyof typeof COMMANDS]) {
            setHistory(prev => [...prev, COMMANDS[cmd as keyof typeof COMMANDS]]);
        } else {
            setHistory(prev => [...prev, `Command not found: ${cmd}. Type /help for assistance.`]);
        }

        setInput("");
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 left-4 sm:left-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 font-mono text-sm font-bold"
            >
                <TerminalIcon className="h-5 w-5" />
                <span className="hidden md:inline">TERMINAL</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] md:w-[450px] aspect-video md:aspect-auto md:h-[350px] bg-black/90 backdrop-blur-xl border border-primary/30 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 px-4 py-2 flex items-center justify-between border-b border-primary/20">
                            <div className="flex items-center gap-2 text-primary text-xs font-bold">
                                <Command className="h-3 w-3" />
                                <span>DS_OS TERMINAL</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-primary hover:bg-primary/20 p-1 rounded transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* History */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 text-primary/80 text-sm">
                            {history.map((line, i) => (
                                <div key={i} className={line.startsWith(">") ? "text-primary font-bold" : ""}>
                                    {line}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleCommand} className="p-4 border-t border-primary/20 flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-primary animate-pulse" />
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none flex-1 text-primary placeholder:text-primary/30 text-sm"
                                placeholder="Type a command..."
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
