import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// The "Brain" - Knowledge base for the AI
const KNOWLEDGE_BASE = {
    profile: {
        name: "Dilpreet Singh",
        role: "Python Developer & AIML Specialist",
        location: "Ludhiana, India",
        education: "Bachelors in Computer Science at Gulzar Group of Institutions (GGI)"
    },
    skills: [
        "Python (Core/Advanced)",
        "Machine Learning & AI",
        "OpenAI Integration",
        "React.js & Tailwind CSS",
        "Linux Administration",
        "Data Structures & Algorithms",
        "Graphic Design (Photoshop/CorelDraw)"
    ],
    hackathon: {
        name: "Prompt The Future (Next Quantum 3.0)",
        achievement: "Top 30 Finalist",
        project: "Silent Coders Sign-Translator",
        tech: "Python, TensorFlow, NLP, Blender",
        description: "Built a real-time system that translates speech and text into 3D sign language animations in just 24 hours."
    },
    projects: [
        { title: "Jarvis", desc: "Voice-controlled virtual assistant with OpenAI brain." },
        { title: "Silent Coders", desc: "AI-based sign language translator for social impact." },
        { title: "Perfect Guess", desc: "Algorithmic number-matching game using Python logic." }
    ],
    contact: {
        email: "dilpreetsinghverma@gmail.com",
        github: "github.com/DilpreetSinghVerma",
        linkedin: "Search for Dilpreet Singh"
    }
};

const INITIAL_MESSAGE = {
    id: 'init',
    type: 'ai',
    text: "Hello! I'm Dilpreet's Neural Assistant. I've been indexed with his full technical profile. Ask me anything about his projects, skills, or that recent Hackathon win!",
    timestamp: new Date()
};

const SUGGESTIONS = [
    "Tell me about the Hackathon win",
    "What are your Python skills?",
    "Tell me about Jarvis",
    "How can I contact you?"
];

export function NeuralAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const processMessage = (input: string) => {
        const text = input.toLowerCase();
        let response = "";

        if (text.includes('hackathon') || text.includes('top 30') || text.includes('silent coders')) {
            response = `Dilpreet recently competed in the "Prompt The Future" Hackathon at GGI. His team, "Silent Coders", placed in the Top 30! They built a system that translates text/speech into sign language using AI and 3D avatars.`;
        } else if (text.includes('skills') || text.includes('tech') || text.includes('know')) {
            response = `Dilpreet is a specialist in Python and AIML. His stack includes TensorFlow, OpenAI API, React, and Linux. He's also strong in DSA and graphic design.`;
        } else if (text.includes('jarvis')) {
            response = `Jarvis is one of his favorite projects! It's a voice-controlled assistant built in Python that uses OpenAI's logic to handle tasks and conversations.`;
        } else if (text.includes('contact') || text.includes('email') || text.includes('hire')) {
            response = `You can reach Dilpreet directly at ${KNOWLEDGE_BASE.contact.email} or find him on GitHub. He's currently open to new opportunities!`;
        } else if (text.includes('who') || text.includes('about')) {
            response = `Dilpreet Singh is an AIML Specialist and Python Developer currently studying at GGI. He focuses on building high-impact AI solutions, like his recent work on sign language translation.`;
        } else if (text.includes('hello') || text.includes('hi')) {
            response = `Hi there! Hope you're enjoying the portfolio. What would you like to know about Dilpreet's work?`;
        } else {
            response = `That's interesting! While I'm still indexing some details, I can tell you all about Dilpreet's Python work, his Top 30 Hackathon achievement, or his AI projects like Jarvis. Try asking about those!`;
        }

        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'ai',
                text: response,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            type: 'user' as const,
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        processMessage(inputValue);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px]"
                    >
                        <Card className="flex flex-col h-[500px] bg-background/80 backdrop-blur-2xl border-primary/20 shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="p-4 bg-primary flex items-center justify-between text-primary-foreground">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Neural Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-[10px] opacity-80">Synchronized Engine</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-white/10"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 font-sans scroll-smooth"
                            >
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.type === 'ai' ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`flex gap-2 max-w-[85%] ${msg.type === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <div className={`mt-1 p-1.5 rounded-md h-fit ${msg.type === 'ai' ? 'bg-primary/10 text-primary' : 'bg-foreground/5 text-foreground/40'}`}>
                                                {msg.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                            </div>
                                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'ai'
                                                    ? 'bg-foreground/5 rounded-tl-none border border-foreground/5 shadow-sm'
                                                    : 'bg-primary text-primary-foreground rounded-tr-none shadow-md'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start gap-2">
                                        <div className="p-1.5 rounded-md bg-primary/10 text-primary h-fit">
                                            <Bot className="h-4 w-4" />
                                        </div>
                                        <div className="bg-foreground/5 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                            <div className="h-1.5 w-1.5 bg-foreground/20 rounded-full animate-bounce" />
                                            <div className="h-1.5 w-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="h-1.5 w-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer / Suggestions */}
                            <div className="p-4 border-t border-foreground/5 bg-foreground/5">
                                {messages.length < 3 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {SUGGESTIONS.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => {
                                                    setInputValue(s);
                                                    setTimeout(() => handleSend(), 100);
                                                }}
                                                className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full bg-background/50 border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-muted-foreground hover:text-primary flex items-center gap-1 group"
                                            >
                                                {s} <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <form onSubmit={handleSend} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask about Dilpreet..."
                                        className="flex-1 bg-background border border-foreground/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                    <Button type="submit" size="icon" className="rounded-xl h-10 w-10 shrink-0">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button - Floating Neural Orb */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
            >
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500 animate-pulse" />
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative h-14 w-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 overflow-hidden ${isOpen ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X className="h-6 w-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="flex items-center justify-center"
                            >
                                <MessageSquare className="h-6 w-6 absolute" />
                                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </div>
    );
}
