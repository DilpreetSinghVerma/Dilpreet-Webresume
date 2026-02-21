import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Quote, Star, MessageCircle, ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

const learningItems = [
    {
        title: "Large Language Models (LLMs)",
        provider: "DeepLearning.AI",
        status: "Currently Mastering",
        topics: ["Prompt Engineering", "RAG Systems", "Fine-tuning"]
    },
    {
        title: "Advanced Computer Vision",
        provider: "Research Papers (arXiv)",
        status: "Active Research",
        topics: ["Diffusion Models", "Segmentation", "Object Detection"]
    },
    {
        title: "System Design for AI",
        provider: "Professional Tracks",
        status: "Learning",
        topics: ["Scalability", "Low Latency", "Model Deployment"]
    }
];

const testimonials = [
    {
        name: "Academics & Mentors",
        role: "GGI Perspective",
        quote: "Dilpreet consistently demonstrates an exceptional ability to grasp complex AI concepts and implement them into functional, high-impact projects. His work during the Hackathon was truly impressive.",
        stars: 5
    },
    {
        name: "Peer Community",
        role: "Developer Network",
        quote: "His vision for combining creative Python development with Machine Learning is unique. Projects like Jarvis show a deep understanding of both user experience and backend intelligence.",
        stars: 5
    }
];

export default function Growth() {
    return (
        <section className="py-16 md:py-24 relative">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Growth/Learning Column */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="mb-10 flex items-center gap-4"
                        >
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-display font-bold">
                                Growth & <span className="text-primary">Mastery</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-6">
                            {learningItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="group relative p-6 rounded-2xl bg-foreground/5 border border-foreground/5 hover:border-primary/20 hover:bg-primary/5 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <GraduationCap className="h-4 w-4 text-primary" />
                                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{item.provider}</span>
                                                </div>
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                                            </div>
                                            <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">
                                                {item.status}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.topics.map((topic, ti) => (
                                                <span key={ti} className="text-[10px] px-2 py-1 bg-background/50 rounded-md border border-foreground/5 text-muted-foreground">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonials Column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="mb-10 flex items-center gap-4"
                        >
                            <div className="p-3 bg-accent/10 rounded-2xl">
                                <MessageCircle className="h-6 w-6 text-accent" />
                            </div>
                            <h2 className="text-3xl font-display font-bold">
                                Voices of <span className="text-accent">Peers</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-8">
                            {testimonials.map((test, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative p-8 rounded-3xl bg-background border border-foreground/5 shadow-xl hover:shadow-accent/5 transition-shadow"
                                >
                                    <Quote className="absolute top-6 right-6 h-12 w-12 text-accent/5" />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(test.stars)].map((_, si) => (
                                            <Star key={si} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed mb-6 italic text-sm">
                                        "{test.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-white text-xs">
                                            {test.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-tight">{test.name}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase font-mono">{test.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
