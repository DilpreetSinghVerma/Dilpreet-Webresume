import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Sparkles, Activity, Target, Zap, Heart, Search } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

export default function AIPlayground() {
    const [sentimentInput, setSentimentInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<{ score: number; label: string; icon: any; color: string } | null>(null);

    const analyzeSentiment = () => {
        if (!sentimentInput.trim()) return;
        setIsAnalyzing(true);

        // Simulating AI Processing
        setTimeout(() => {
            const text = sentimentInput.toLowerCase();
            let result = {
                score: 85,
                label: "Positive & Forward-Thinking",
                icon: Sparkles,
                color: "text-green-400"
            };

            if (text.includes("bad") || text.includes("sad") || text.includes("error") || text.includes("hate")) {
                result = { score: 20, label: "Critical / Negative", icon: Activity, color: "text-red-400" };
            } else if (text.length < 10) {
                result = { score: 50, label: "Neutral / Observation", icon: Search, color: "text-blue-400" };
            }

            setAnalysisResult(result);
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <section id="playground" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        AI <span className="text-primary italic">Playground</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Experience a glimpse of my machine learning logic. Interact with these micro-modules to see how I process data and sentiment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sentiment Analysis Module */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full bg-background/95 md:bg-background/40 md:backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden group">
                            <div className="p-6 border-b border-foreground/5 bg-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold tracking-tight">Neural Sentiment Engine</h3>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <CardContent className="p-8">
                                <p className="text-sm text-muted-foreground mb-6">Type a sentence below and my logic will attempt to decode the emotional tone and polarity of your text.</p>

                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter something like 'I love building AI...'"
                                        value={sentimentInput}
                                        onChange={(e) => setSentimentInput(e.target.value)}
                                        className="bg-foreground/5 border-foreground/10 focus:ring-primary/50"
                                    />
                                    <Button onClick={analyzeSentiment} disabled={isAnalyzing || !sentimentInput}>
                                        {isAnalyzing ? "Processing..." : "Analyze"}
                                    </Button>
                                </div>

                                <div className="mt-12 h-32 flex items-center justify-center border-2 border-dashed border-foreground/5 rounded-2xl relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {isAnalyzing ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center gap-2"
                                            >
                                                <div className="flex gap-1">
                                                    {[0, 0.2, 0.4].map((d) => (
                                                        <motion.div
                                                            key={d}
                                                            animate={{ scaleY: [1, 2, 1] }}
                                                            transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                                                            className="w-1 h-6 bg-primary/40 rounded-full"
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Scanning Patterns...</span>
                                            </motion.div>
                                        ) : analysisResult ? (
                                            <motion.div
                                                key="result"
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="text-center"
                                            >
                                                <div className={`inline-flex p-3 rounded-full bg-foreground/5 mb-3 ${analysisResult.color}`}>
                                                    <analysisResult.icon className="h-6 w-6" />
                                                </div>
                                                <h4 className={`text-xl font-bold ${analysisResult.color}`}>{analysisResult.label}</h4>
                                                <p className="text-xs text-muted-foreground mt-1 font-mono">CONFIDENCE: {analysisResult.score}%</p>
                                            </motion.div>
                                        ) : (
                                            <div className="text-muted-foreground/30 text-sm font-light italic">Waiting for input...</div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* AI Prediction Module */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full bg-background/95 md:bg-background/40 md:backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden group">
                            <div className="p-6 border-b border-foreground/5 bg-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold tracking-tight">Precision Benchmarking</h3>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                            </div>
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    {[
                                        { label: "Predictive Accuracy", value: 98.2, icon: Zap, color: "text-yellow-400" },
                                        { label: "Data Processing Speed", value: 45, icon: Activity, color: "text-blue-400" },
                                        { label: "Model Optimization", value: 92.1, icon: Heart, color: "text-red-400" },
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                                    <span className="font-medium">{stat.label}</span>
                                                </div>
                                                <span className="font-mono font-bold text-primary">{stat.value}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${stat.value}%` }}
                                                    transition={{ duration: 1.5, delay: i * 0.2 }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <p className="text-xs leading-relaxed text-muted-foreground italic">
                                        "This module represents my ability to create performance-driven AI models. I focus on high-confidence predictions and ultra-low latency response times."
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
