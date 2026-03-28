import { motion } from "framer-motion";
import { Quote, Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

export default function Vision() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Design Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="container px-4 md:px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex items-center gap-3 text-primary/60 font-mono text-xs tracking-widest uppercase"
                    >
                        <Sparkles className="h-4 w-4" />
                        THE FOUNDER'S VISION
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-12 text-foreground/90">
                        <Quote className="h-10 w-10 text-primary/20 mb-6" />
                        <span className="italic">
                            "I don't just build software; I engineer ecosystems. My mission is to bridge the frontier of {" "}
                            <span className="text-primary not-italic font-bold">Agentic AI</span>
                            {" "} with the creative spirit of modern {" "}
                            <span className="text-primary not-italic font-bold">Entrepreneurship</span>."
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-16 border-t border-foreground/5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 text-primary">
                                <TrendingUp className="h-5 w-5" />
                                <h3 className="font-bold uppercase tracking-wider text-sm">Scalable Impact</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                From EventFold Studio to AI-driven accessibility tools, every project is built with the goal of solving real-world challenges at a global scale. I prioritize systems that are robust, secure, and user-centric.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 text-accent">
                                <Lightbulb className="h-5 w-5" />
                                <h3 className="font-bold uppercase tracking-wider text-sm">Future Legacy</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                As a B.Tech student and active business owner, I am refining the path where engineering meets strategy. My goal is to build a digital legacy that uses technology to empower professionals and elevate human connection.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
