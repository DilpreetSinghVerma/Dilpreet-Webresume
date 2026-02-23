import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, ChevronRight, Copy, Check, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const INTENTS = [
    {
        keywords: ["hackathon", "competition", "quantum", "silent", "coders", "win", "top 30", "achievement", "ggi"],
        response: "🏆 Dilpreet's team **Silent Coders** placed in the **Top 30** at the *'Prompt The Future' Next Quantum 3.0 Hackathon* hosted by GGI!\n\nIn just 24 hours they built a real-time **AI Sign Language Translator** — converting speech into 3D avatar animations for both ASL & ISL. This was recognized for its technical depth and strong social impact on the hearing-impaired community."
    },
    {
        keywords: ["skill", "tech", "stack", "python", "machine learning", "ml", "ai", "react", "tensorflow", "language"],
        response: "⚡ Dilpreet's core tech stack:\n\n**AI / ML:** Python, TensorFlow, OpenAI API, NLP\n**Web:** React 19, Tailwind CSS 4, Three.js\n**Tools:** Photoshop, CorelDraw, Linux\n**Concepts:** DSA, System Design, REST APIs\n\nHis superpower is bridging *intelligent backends* with *stunning frontends*."
    },
    {
        keywords: ["jarvis", "assistant", "voice", "dual", "brain", "project", "virtual", "0.2"],
        response: "🤖 **Jarvis-0.2** is Dilpreet's flagship AI project — a high-end, HUD-based voice assistant using **dual-brain logic** (Gemini 2.0 & Llama 3.3).\n\nIt features **biometric security** via facial recognition, real-time hardware monitoring, and an immersive sci-fi interface. It's built with Python, MediaPipe, and OpenCV, bridging advanced AI with a stunning futuristic HUD."
    },
    {
        keywords: ["sign", "language", "translator", "3d", "avatar", "deaf", "isl", "asl", "accessibility"],
        response: "🤟 The **Silent Coders Sign Language Translator** bridges communication for the hearing-impaired.\n\nTech used: Python + TensorFlow for NLP, Blender-based 3D avatar animations, and a real-time gesture-to-animation pipeline. It supports **both ASL & ISL** and was built in a 24-hour hackathon sprint. Truly a project built for social impact."
    },
    {
        keywords: ["contact", "email", "hire", "talk", "reach", "social", "github", "linkedin", "instagram", "recruit"],
        response: "📬 Here's how to connect with Dilpreet:\n\n✉️ **Email:** dilpreetsinghverma@gmail.com\n💼 **LinkedIn:** dilpreet-singh-709b35310\n🐙 **GitHub:** DilpreetSinghVerma\n📸 **Instagram:** @dilpreet_singh_verma\n\nHe is actively **open to internships and collaborations** in AI/ML and web development!"
    },
    {
        keywords: ["who", "dilpreet", "background", "about", "story", "introduce", "yourself"],
        response: "👨‍💻 **Dilpreet Singh** is a B.Tech CSE student (Batch 2026) at Gulzar Group of Institutions, Ludhiana.\n\nHe specializes in **AI/ML and Python development**, with a design-conscious eye for building beautiful, functional software. His mission: *use technology for meaningful social impact* — demonstrated through projects like the Sign Language Translator and Jarvis AI."
    },
    {
        keywords: ["experience", "work", "job", "intern", "aiesec", "ambassador", "google"],
        response: "💼 Dilpreet's experience includes:\n\n🔷 **Google Student Ambassador** at GGI — promoting Google technologies and developer culture\n🔷 **AIESEC Ambassador Intern** in Patiala — cross-cultural leadership & global initiatives\n🔷 **Graphic Designer** — professional design work using Photoshop & CorelDraw\n🔷 **Photography Studio Support** — technical & creative role\n\nA versatile profile showing both technical and soft skills!"
    },
    {
        keywords: ["certif", "course", "tata", "forage", "eduskills", "google", "learning", "course"],
        response: "📜 Dilpreet's certifications include:\n\n🏅 **Top 30 - Prompt The Future Hackathon** (GGI, 2026)\n🏅 **10-Week AI-ML Virtual Internship** (EduSkills × Google Developers)\n🏅 **Tata iQ Data Analytics Simulation** (Forage, 2025)\n🏅 **AI Fundamentals** (Great Learning Academy)\n🏅 **Digital Logo Design - 2nd Place** (GNE ACME 2025)\n🏅 **Adobe Photoshop & CorelDraw** (CETI, 2019)"
    },
    {
        keywords: ["project", "portfolio", "work", "build", "code", "github"],
        response: "🚀 Dilpreet's key projects:\n\n1️⃣ **Jarvis-0.2 AI** — Dual-brain voice assistant with biometric security\n2️⃣ **Silent Coders Translator** — Real-time AI sign language → 3D avatar\n3️⃣ **This Portfolio** — Built with React 19, Three.js & Tailwind CSS 4\n\nClick any project card on the site for a full case study!"
    },
    {
        keywords: ["reet", "name", "meaning", "why", "ai", "origin"],
        response: "💫 **REET** is deeply personal to Dilpreet. The name is a combination of **Mehak** (his GF's name) and **Dilpreet** (**Meh** + **reet** = **Mehreet**).\n\nIt's named after his vision for his future daughter, symbolizing a blend of their hearts. As his AI, REET represents technology that is both *intelligent* and *full of soul*."
    },
    {
        keywords: ["education", "college", "university", "ggi", "gulzar", "btech", "degree"],
        response: "🎓 Dilpreet is pursuing his **B.Tech in Computer Science** at *Gulzar Group of Institutions (GGI)*, Ludhiana — graduating in **2026**.\n\nHis specialization is **AI & Machine Learning**. Alongside academics, he actively participates in hackathons, ambassador programs, and open-source projects."
    },
    {
        keywords: ["hello", "hi", "hey", "greet", "start", "sup"],
        response: "👋 Hey there! I'm **REET**, Dilpreet's AI digital twin.\n\nI know everything about his projects, skills, experience, and how to get in touch. What would you like to explore?\n\nTry asking about his *hackathon win*, *Jarvis AI*, or how to *hire him*! 🚀"
    }
];

const FALLBACK = "🤔 I'm still learning! But I can tell you about Dilpreet's **hackathon win**, **Jarvis AI**, **tech skills**, **certifications**, or how to **get in touch**. Which interests you?";

const SUGGESTIONS = [
    "Tell me about the hackathon win 🏆",
    "What's your tech stack? ⚡",
    "Show me the projects 🚀",
    "How can I reach Dilpreet? 📬",
];

// ─── Behind the Name Card ──────────────────────────────────────────────────
function NameOriginCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 via-primary/5 to-transparent border border-pink-500/20 shadow-lg shadow-pink-500/5 mb-4"
        >
            <div className="flex items-center gap-2 mb-2">
                <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500/20" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-pink-500/80">Behind the Name</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed italic">
                "REET isn't just code. I'm a blend of **Mehak** + **Dilpreet** (**Meh** + **reet** = **Mehreet**). Dilpreet named me after his vision for his future daughter—a mix of two hearts and two minds."
            </p>
        </motion.div>
    );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    type: 'ai' | 'user';
    text: string;
    timestamp: Date;
    streaming?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function matchIntent(input: string): string {
    const text = input.toLowerCase();
    let best: typeof INTENTS[0] | null = null;
    let topScore = 0;

    for (const intent of INTENTS) {
        let score = 0;
        for (const kw of intent.keywords) {
            if (text.includes(kw)) score += kw.split(' ').length; // multi-word phrases score higher
        }
        if (score > topScore) { topScore = score; best = intent; }
    }

    return best ? best.response : FALLBACK;
}

// Render **bold** and *italic* markdown-lite
function renderText(text: string) {
    // Split on **bold** first, then *italic* — order matters
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={i} className="italic text-primary/90">{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
    });
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex gap-1 items-center px-3 py-2">
            {[0, 1, 2].map(i => (
                <motion.div key={i} className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
            ))}
        </div>
    );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
    const [copied, setCopied] = useState(false);
    const isAI = msg.type === 'ai';

    const copy = () => {
        navigator.clipboard.writeText(msg.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
        >
            {isAI && (
                <div className="mt-1 p-1.5 rounded-lg h-fit bg-primary/10 text-primary shrink-0">
                    <Heart className="h-3.5 w-3.5 fill-primary/10" />
                </div>
            )}

            <div className={`group relative max-w-[85%]`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${isAI
                    ? 'bg-gradient-to-br from-pink-500/10 via-primary/5 to-background/5 border border-pink-500/20 rounded-tl-sm text-foreground/90 shadow-sm shadow-pink-500/5'
                    : 'bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20'
                    }`}>
                    {isAI ? renderText(msg.text) : msg.text}
                </div>

                {/* Copy button for AI messages */}
                {isAI && (
                    <button onClick={copy}
                        className="absolute -bottom-5 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary">
                        {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </button>
                )}

                <p className="text-[9px] text-muted-foreground/50 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>

            {!isAI && (
                <div className="mt-1 p-1.5 rounded-lg h-fit bg-foreground/5 text-muted-foreground shrink-0">
                    <User className="h-3.5 w-3.5" />
                </div>
            )}
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function NeuralAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{
        id: 'init',
        type: 'ai',
        text: "System sync complete. I'm **REET** — Dilpreet's AI twin, built with a bit of code and a lot of heart.\n\nAsk me anything about his work, his vision, or how he's building the future! 💫",
        timestamp: new Date()
    }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasNewMsg, setHasNewMsg] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    // AI-powered CV download greeting
    useEffect(() => {
        const handleCVDownload = () => {
            setIsOpen(true);
            setHasNewMsg(false);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    type: 'ai',
                    text: "Great choice! 📄 Dilpreet's resume is downloading now.\n\nJust so you know — he's **actively seeking AI/ML internships for 2026** and is excited to bring his skills in Python, TensorFlow, and React to a real-world team.\n\nFeel free to reach out at **dilpreetsinghverma@gmail.com** 🚀",
                    timestamp: new Date()
                }]);
            }, 500);
        };
        window.addEventListener("reetCVDownload", handleCVDownload);
        return () => window.removeEventListener("reetCVDownload", handleCVDownload);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setHasNewMsg(false);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);


    const respond = useCallback(async (text: string, currentMessages: Message[]) => {
        setIsTyping(true);

        // Build history from all messages EXCEPT the system init message
        const history = currentMessages
            .filter(m => m.id !== 'init')
            .map(m => ({ role: m.type, text: m.text }));

        try {
            const res = await fetch('/api/reet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history }),
                signal: AbortSignal.timeout(15000),
            });

            const data = await res.json() as { response?: string; error?: string };

            // Only use the API response if it returned a real answer
            // Otherwise silently fall back to local knowledge base
            const replyText = (res.ok && data.response)
                ? data.response
                : matchIntent(text);

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'ai',
                text: replyText,
                timestamp: new Date()
            }]);
        } catch {
            // Network error or timeout — use local fallback silently
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'ai',
                text: matchIntent(text),
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
            if (!isOpen) setHasNewMsg(true);
        }
    }, [isOpen]);


    const handleSend = (e?: React.FormEvent, override?: string) => {
        e?.preventDefault();
        const text = (override ?? inputValue).trim();
        if (!text || isTyping) return;

        const newMessages = [...messages, {
            id: Date.now().toString(),
            type: 'user' as const,
            text,
            timestamp: new Date()
        }];
        setMessages(newMessages);
        setInputValue('');
        respond(text, newMessages);
    };

    return (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end gap-3">

            {/* ── Chat Window ────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 16 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                        className="w-[calc(100vw-2rem)] max-w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                        style={{ height: 'min(520px, 80dvh)' }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 bg-primary flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xs tracking-[0.18em] text-white uppercase">REET AI</h3>
                                    <p className="text-[9px] text-white/60 font-mono uppercase tracking-widest">Dilpreet's Digital Twin</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-white">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-5 bg-background/95 backdrop-blur-xl">
                            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
                            {messages.length > 1 && <NameOriginCard />}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex gap-2 items-start justify-start">
                                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                        <Heart className="h-3.5 w-3.5 fill-primary/10" />
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-500/10 via-primary/5 to-background/5 border border-pink-500/20 rounded-2xl rounded-tl-sm">
                                        <TypingDots />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Suggestions */}
                        {messages.length < 3 && (
                            <div className="px-3 pt-2 pb-0 bg-background/95 flex flex-wrap gap-1.5 shrink-0">
                                {SUGGESTIONS.map(s => (
                                    <button key={s} onClick={() => handleSend(undefined, s)}
                                        className="text-[10px] px-2.5 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground flex items-center gap-1">
                                        {s} <ChevronRight className="h-2.5 w-2.5 opacity-60" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSend}
                            className="p-3 border-t border-foreground/8 bg-background/95 flex gap-2 shrink-0">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Ask about Dilpreet..."
                                disabled={isTyping}
                                className="flex-1 bg-foreground/5 border border-foreground/10 focus:border-primary/40 rounded-xl px-3.5 py-2 text-sm focus:outline-none transition-all placeholder:text-muted-foreground/40 disabled:opacity-50"
                            />
                            <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()}
                                className="rounded-xl h-9 w-9 shrink-0 shadow-lg shadow-primary/20">
                                <Send className="h-3.5 w-3.5" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Orb Button ─────────────────────────────────── */}
            <motion.button
                onClick={() => setIsOpen(o => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative group"
                aria-label="Open REET AI"
            >
                {/* Glow ring */}
                <span className="absolute -inset-3 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/35 transition-all duration-500 animate-pulse pointer-events-none" />

                <span className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-300 ${isOpen
                    ? 'bg-background border-foreground/20 text-foreground'
                    : 'bg-primary border-white/20 text-primary-foreground'
                    }`}>
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span key="x"
                                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X className="h-5 w-5" />
                            </motion.span>
                        ) : (
                            <motion.span key="chat"
                                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                                className="flex items-center justify-center">
                                <MessageSquare className="h-5 w-5" />
                                <Zap className="h-2.5 w-2.5 absolute -top-0.5 -right-0.5 text-yellow-300 fill-yellow-300" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>

                {/* Unread notification dot */}
                {hasNewMsg && !isOpen && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-background" />
                )}
            </motion.button>
        </div>
    );
}
