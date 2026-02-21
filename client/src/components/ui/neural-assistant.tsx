import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Intent {
    keywords: string[];
    response: string;
}

interface KnowledgeBase {
    profile: {
        name: string;
        role: string;
        location: string;
        education: string;
        philosophy: string;
    };
    intents: Intent[];
}

// The "Brain" - Knowledge base for the AI
const KNOWLEDGE_BASE: KnowledgeBase = {
    profile: {
        name: "Dilpreet Singh",
        role: "Python Developer & AIML Specialist",
        location: "Ludhiana, India",
        education: "B.Tech in Computer Science at Gulzar Group of Institutions (GGI), Batch of 2026",
        philosophy: "Merging technical precision with creative design to solve real-world problems."
    },
    intents: [
        {
            keywords: ["hackathon", "competition", "quant", "future", "silent", "coders", "win", "achievement"],
            response: "Dilpreet recently made waves at the 'Prompt The Future' Next Quantum 3.0 Hackathon! Out of numerous teams, his team 'Silent Coders' secured a spot in the Top 30. They built an AI-powered sign language translator that works in real-time, converting speech to 3D avatars. It was a rigorous 24-hour sprint that proved their ability to deliver under pressure."
        },
        {
            keywords: ["skill", "tech", "stack", "language", "python", "machine", "learning", "ai", "react", "tailwind"],
            response: "Dilpreet's technical arsenal is deep. He is a specialist in Python (both core and advanced) and AI/ML. For logic, he uses TensorFlow and OpenAI APIs. For the web, he builds with React 19 and Tailwind CSS. He's also proficient in Linux systems, Data Structures (DSA), and professional design tools like Photoshop."
        },
        {
            keywords: ["jarvis", "assistant", "voice", "openai", "project"],
            response: "Jarvis is a premier project in Dilpreet's portfolio. It's a sophisticated virtual assistant built in Python. Unlike basic scripts, it integrates OpenAI's powerful logic to understand complex voice commands, making it a true demonstration of his AI integration skills."
        },
        {
            keywords: ["contact", "email", "hire", "talk", "reach", "social", "github", "linkedin", "instagram"],
            response: "You can reach Dilpreet via email at dilpreetsinghverma@gmail.com. You can also track his production code on GitHub (DilpreetSinghVerma) or connect on LinkedIn. He's currently open to collaborations and new career opportunities!"
        },
        {
            keywords: ["who", "dilpreet", "background", "about", "story"],
            response: "Dilpreet Singh is a Ludhiana-based developer who specializes in the intersection of Python and Machine Learning. With a strong foundation in Computer Science from GGI, he consistently pushes the boundaries of UI/UX while keeping the backend logic robust and intelligent."
        },
        {
            keywords: ["sign", "language", "translator", "3d", "avatar", "deaf"],
            response: "The Sign Language Translator was Dilpreet's Hackathon masterpiece. It bridges the gap for the hearing and speech impaired by using AI to convert spoken words into clear, accurate 3D animations of Sign Language (supporting ASL and ISL) in real-time."
        },
        {
            keywords: ["experience", "work", "job", "intern", "aiesec", "ggi"],
            response: "Dilpreet has diverse experience, including a Google Student Ambassador role at GGI and an Ambassador Internship at AIESEC in Patiala. He has also worked as a Graphic Designer and provided technical support in photography studios, showing his versatility."
        },
        {
            keywords: ["why", "purpose", "mission", "goal"],
            response: "Dilpreet's mission is to build software that has social impact. Whether it's helping the deaf community through sign language translation or making daily life easier with AI assistants, he aims to use his Python and ML skills for good."
        }
    ]
};

const INITIAL_MESSAGE = {
    id: 'init',
    type: 'ai',
    text: "Neural engine synchronized. I am Dilpreet's technical representative. Ask me anything about his Top 30 Hackathon win, his AI architectures, or his vision as a developer.",
    timestamp: new Date()
};

const SUGGESTIONS = [
    "Tell me about the Hackathon win",
    "What is your technical stack?",
    "Show me your AI projects",
    "How can I hire you?"
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
        let bestMatch: Intent | null = null;
        let highestScore = 0;

        // "Smart" Intent Matching Algorithm
        KNOWLEDGE_BASE.intents.forEach(intent => {
            let score = 0;
            intent.keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 1;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = intent;
            }
        });

        let response = "";

        if (highestScore > 0 && bestMatch) {
            response = bestMatch.response;
        } else if (text.length < 3) {
            response = "I'm ready when you are. Ask me about Dilpreet's work!";
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            response = "Greetings. I'm the Neural Assistant for Dilpreet's portfolio. I can provide detailed insights into his projects, his hackathon success, and his technical expertise. What would you like to explore?";
        } else {
            response = "That inquiry requires a deeper search of my records. While I refine that, I can tell you about his 'Silent Coders' AI project, his Top 30 Hackathon achievement at GGI, or his advanced Python skills. Which of these interests you?";
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
        }, 1200);
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
