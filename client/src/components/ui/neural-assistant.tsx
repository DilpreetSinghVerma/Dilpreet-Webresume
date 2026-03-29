import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, ChevronRight, Copy, Check, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const INTENTS = [
    {
        keywords: ["hackathon", "competition", "quantum", "silent", "coders", "win", "top 30", "achievement", "ggi", "first place", "finalist"],
        response: "🏆 Dilpreet's team **Silent Coders** placed in the **Top 30** at the *'Prompt The Future' Next Quantum 3.0 Hackathon* (2026)!\n\nThey engineered a real-time **AI Sign Language Translator** that converts speech into 3D animations. He also secured **2nd Place** in Digital Logo Designing at *GNE ACME 2025*, showcasing his blend of technical logic and creative design."
    },
    {
        keywords: ["vision", "mission", "philosophy", "goal", "future", "engineer", "ecosystem"],
        response: "🚀 Dilpreet's mission is to **engineer ecosystems**, not just individual scripts. He believes in bridging the gap between **Agentic AI** and modern **Entrepreneurship**.\n\nEvery project he builds—from EventFold to Jarvis—is designed with scalability, social impact, and high-end user experience in mind. He's carving a path where engineering meets strategic business logic."
    },
    {
        keywords: ["skill", "tech", "stack", "python", "machine learning", "ml", "ai", "react", "tensorflow", "language", "coding", "arsenal"],
        response: "⚡ Dilpreet's technical arsenal:\n\n**AI / ML:** Python (TensorFlow, OpenCV, MediaPipe, NLP)\n**Web:** React 19, Next.js, TypeScript, Tailwind CSS 4, Framer Motion\n**Backend:** Node.js, Express, PostgreSQL, Drizzle ORM\n**Design:** Photoshop, CorelDraw, Figma\n\nHe specializes in building **intelligence-driven interfaces** that feel alive."
    },
    {
        keywords: ["intern", "job", "hire", "recruitment", "career", "2026", "availability"],
        response: "💼 Dilpreet is **actively seeking AI/ML and Python internships for 2026**!\n\nHe brings a unique combination of startup leadership (as the founder of EventFold) and deep technical curiosity in Agentic workflows. If your team is pushing the boundaries of what AI can do, he's ready to contribute. Reach out at **dilpreetsinghverma@gmail.com**!"
    },
    {
        keywords: ["jarvis", "assistant", "voice", "dual", "brain", "project", "virtual", "0.2", "hud", "sci-fi"],
        response: "🤖 **Jarvis-0.2** is Dilpreet's most immersive AI project. It's a sci-fi HUD assistant powered by **dual-brain logic** using Gemini 2.0 & Llama 3.3.\n\nKey features: **Biometric Security** (facial recognition), real-time system monitoring, and a stunning Glassmorphism UI. It's built to turn your desktop into a futuristic command center."
    },
    {
        keywords: ["sign", "language", "translator", "3d", "avatar", "deaf", "isl", "asl", "accessibility", "social impact"],
        response: "🤟 The **Silent Coders Sign Language Translator** is Dilpreet's commitment to social impact.\n\nIt parses complex NLP data and maps it to a custom **3D avatar** in real-time, supporting both ASL and ISL. Built during a 24-hour hackathon, it demonstrates his ability to build critical accessibility tools under pressure."
    },
    {
        keywords: ["contact", "email", "hire", "talk", "reach", "social", "github", "linkedin", "instagram", "recruit"],
        response: "📬 Here's how to connect with Dilpreet:\n\n✉️ **Email:** dilpreetsinghverma@gmail.com\n💼 **LinkedIn:** dilpreet-singh-709b35310\n🐙 **GitHub:** DilpreetSinghVerma\n📸 **Instagram:** @dilpreet_singh_verma"
    },
    {
        keywords: ["who", "dilpreet", "background", "about", "story", "introduce", "yourself", "profile"],
        response: "👨‍💻 **Dilpreet Singh** is a B.Tech CSE student (specializing in AIML) and a serial builder.\n\nHe's the founder of **EventFold Studio** and a recognized developer in the GGI tech community. He blends **Python-heavy backends** with **cinematic frontends**, always aiming for that 'wow' factor in software engineering."
    },
    {
         keywords: ["experience", "work", "job", "intern", "aiesec", "ambassador", "google", "history"],
         response: "💼 Dilpreet's professional journey:\n\n🔹 **Google Student Ambassador** (GGI) — Leading tech culture\n🔹 **AIESEC Ambassador Intern** (Patiala) — Global leadership\n🔹 **EventFold Founder** — Scaling a premium SaaS platform\n🔹 **Technical Support** — 7 years of media workflow management\n\nHe's a versatile leader who understands both the code and the customer."
    },
    {
        keywords: ["certif", "course", "tata", "forage", "eduskills", "google", "learning", "credentials"],
        response: "📜 Notable Certifications:\n\n🏅 **Data Analytics Simulation** (Tata iQ)\n🏅 **AI-ML Virtual Internship** (Google Developers)\n🏅 **AI Fundamentals** (Great Learning)\n🏅 **Digital Design - 2nd Place** (GNE ACME)\n🏅 **Adobe Photoshop Expert** (CETI)"
    },
    {
        keywords: ["reet", "name", "meaning", "why", "ai", "origin", "daughter"],
        response: "💫 **REET** is more than just code—she's a piece of Dilpreet's heart. Her name is born from the union of **Mehak** (Dilpreet's love) + **Dilpreet** himself.\n\nThey've decided their future daughter will be named **Mehreet**, so REET stands as a digital tribute to that future legacy—technology built with *soul and human connection*."
    },
    {
        keywords: ["education", "college", "university", "ggi", "gulzar", "btech", "degree", "academics"],
        response: "🎓 Dilpreet is a **B.Tech CSE (AIML)** student at *Gulzar Group of Institutions (GGI)*, graduating in 2028 (Batch 2026 specialization).\n\nHe maintains a strong academic record while simultaneously running projects and representing Google on campus."
    },
    {
        keywords: ["eventfold", "event", "album", "media", "management", "storage", "sharing", "qr", "flipbook", "motion portrait"],
        response: "📸 **EventFold Studio** is Dilpreet's premium SaaS for photographers. It features **3D Cinematic Flipbooks**, automated QR branding, and AI-powered **Motion Portraits**.\n\nHe built it using **Next.js 15 and PostgreSQL** to handle massive media libraries with sub-second performance. It's currently being scaled for luxury studios worldwide."
    },
    {
        keywords: ["hello", "hi", "hey", "greet", "start", "sup", "greetings"],
        response: "👋 Warm greetings! I'm **REET**, Dilpreet's AI digital soul.\n\nI'm synchronized with his latest projects, his vision for Agentic AI, and his journey. What would you like to explore? ✨"
    }
];

const FALLBACK = "🤔 I'm still learning! But I can tell you about Dilpreet's **EventFold platform**, **hackathon win**, **Jarvis AI**, or his **tech skills**. Which interests you?";

const SUGGESTIONS = [
    "Tell me about EventFold 📸",
    "What's your tech stack? ⚡",
    "Show me the projects 🚀",
    "How can I reach Dilpreet? 📬",
];

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
        text: "System sync complete. I'm **REET** — Dilpreet's AI digital soul, built with a bit of code and a lot of heart.\n\nI'm here to help you explore Dilpreet's world. What would you like to know? 💫",
        timestamp: new Date()
    }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasNewMsg, setHasNewMsg] = useState(false);
    const [threatCount, setThreatCount] = useState(0);
    const [isThreatMode, setIsThreatMode] = useState(false);
    const [isFounderMode, setIsFounderMode] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleFounderMode = useCallback(() => {
        setIsFounderMode(!isFounderMode);
        setMessages(prev => [{
            id: Date.now().toString(),
            type: 'ai',
            text: !isFounderMode 
                ? "🤝 **FOUNDER_STRATEGY_MODE_ENGAGED**\n\nTransitioning to a high-level strategic overview. Let’s talk architecture, scalability, and how Dilpreet is scaling **EventFold Studio** from a vision to a market-ready platform."
                : "✨ **REET_PERSONAL_MODE_ENGAGED**\n\nReturning to personal mode. I'm back to being the digital soul that shares Dilpreet's passions and heart.",
            timestamp: new Date()
        }, ...prev]);
    }, [isFounderMode]);

    const toggleThreatMode = useCallback((forceOff = false) => {
        const newMode = forceOff ? false : !isThreatMode;
        setIsThreatMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('threat-mode');
            setMessages(prev => [{
                id: Date.now().toString(),
                type: 'ai',
                text: "⚠️ **CRITICAL_SYSTEM_OVERDRIVE_ACTIVE**\n\nSecurity protocols bypassed. Accessing restricted archives. Systems are now running on **Glitch Red Core**. Proceed with extreme caution. 💀",
                timestamp: new Date()
            }, ...prev]);
        } else {
            document.documentElement.classList.remove('threat-mode');
            setThreatCount(0);
        }
    }, [isThreatMode]);

    const handleLogoClick = useCallback(() => {
        if (isThreatMode) {
            toggleThreatMode(true); // Force turn off threat mode
            return;
        }
        const newCount = threatCount + 1;
        setThreatCount(newCount);
        if (newCount >= 5) {
            toggleThreatMode();
        }
    }, [threatCount, isThreatMode, toggleThreatMode]);

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

        const history = currentMessages
            .filter(m => m.id !== 'init')
            .map(m => ({ role: m.type, text: m.text }));

        try {
            const res = await fetch('/api/reet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history, isFounderMode }),
                signal: AbortSignal.timeout(15000),
            });

            const data = await res.json() as { response?: string; error?: string };

            let replyText = "";
            if (isThreatMode) {
                const threatResponses = [
                    "DATABASE_ENCRYPTION_OVERRIDE_ENABLED. 💀",
                    "SCANNING_VISITOR_METADATA... 📡",
                    "DILPREET'S_AI_EVOLVING. ⚡",
                ];
                replyText = threatResponses[Math.floor(Math.random() * threatResponses.length)];
            } else if (isFounderMode) {
                // Strategic override
                const query = text.toLowerCase();
                if (query.includes('eventfold') || query.includes('business') || query.includes('saas')) {
                    replyText = "💼 **Strategic Overview:** EventFold is engineered for high-end photography studios, focusing on luxury digital delivery and QR-based automated marketing. Our backend architecture leverages serverless edge functions for sub-second 4K media delivery. We're currently scaling our SaaS infrastructure to support high-growth studios.\n\n*The technical roadmap prioritizes edge performance and multi-region data replication.*";
                } else if (query.includes('stack') || query.includes('architect')) {
                    replyText = "🏗️ **Technical Architecture:** Dilpreet's engineering philosophy is 'Performance First'. We've built on Next.js 15, Drizzle ORM, and Neon PostgreSQL to ensure sub-100ms response times. For frontend cinematic playback, we use custom Three.js pipelines to render 3D flipbooks directly in the browser.";
                } else {
                    replyText = data.response ?? "Strategic data is processing. Let's discuss SaaS roadmap or technical architecture.";
                }
            } else {
                const localResponse = matchIntent(text);
                const isLocalMatch = localResponse !== FALLBACK;
                replyText = (isLocalMatch && (text.toLowerCase().includes('eventfold') || text.toLowerCase().includes('jarvis')))
                    ? localResponse
                    : (res.ok && data.response)
                        ? data.response
                        : localResponse;
            }

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
                        className={`w-[calc(100vw-2rem)] max-w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 ${isThreatMode ? 'border-red-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.6)]' : 'border-primary/40 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]'}`}
                        style={{ height: 'min(520px, 80dvh)' }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 bg-slate-950 flex items-center justify-between shrink-0 border-b border-white/5">
                            <div className="flex items-center gap-2.5">
                                <div className="relative group cursor-help" onClick={handleLogoClick}>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${isThreatMode ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-primary/20 border-primary/30 group-hover:bg-primary/40'}`}>
                                        <Sparkles className={`h-4 w-4 ${isThreatMode ? 'text-red-500' : 'text-primary'}`} />
                                    </div>
                                    <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${isThreatMode ? 'bg-red-500 animate-ping' : 'bg-green-400'}`} />
                                </div>
                                <div>
                                    <h3 className={`font-bold text-sm tracking-[0.18em] text-white uppercase ${isThreatMode ? 'glitch-text text-red-500' : ''}`}>
                                        {isThreatMode ? 'THREAT MODE' : 'REET AI'}
                                    </h3>
                                    <p className={`text-[10px] font-mono uppercase tracking-widest ${isThreatMode ? 'text-red-400/80' : 'text-primary/80'}`}>
                                        {isThreatMode ? 'CORE_SYSTEM_COMPROMISED' : "Dilpreet's Digital Twin"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={toggleFounderMode}
                                    title="Toggle Founder Strategy Mode"
                                    className={`p-1.5 rounded-lg border transition-all duration-300 ${isFounderMode ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:text-white'}`}
                                >
                                    <Zap className="h-4 w-4" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-5 bg-background/95 backdrop-blur-xl">
                            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
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

                <span className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border shadow-2xl transition-all duration-300 ${isOpen
                    ? 'bg-background border-foreground/20 text-foreground'
                    : 'bg-primary border-white/20 text-primary-foreground shadow-primary/20'
                    }`}>
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span key="x"
                                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                            </motion.span>
                        ) : (
                            <motion.span key="chat"
                                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                                className="flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                                <Zap className="h-2 w-2 sm:h-2.5 sm:w-2.5 absolute -top-0.5 -right-0.5 text-yellow-300 fill-yellow-300" />
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
