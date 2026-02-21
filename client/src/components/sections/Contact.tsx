import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RevealText } from "@/components/ui/reveal-text";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
    const { toast } = useToast();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactMessage>({
        resolver: zodResolver(contactSchema)
    });

    const mutation = useMutation({
        mutationFn: async (data: ContactMessage) => {
            // Using FormSubmit AJAX endpoint - 100% Free & No Registration needed
            const res = await fetch("https://formsubmit.co/ajax/dilpreetsinghverma@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    _subject: `New Portfolio Message from ${data.name}`,
                    _template: "table" // Makes the email look professional
                }),
            });

            if (!res.ok) throw new Error("Failed to send message");
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Message Sent! 🚀",
                description: "Check your inbox! I'll get back to you shortly.",
            });
            reset();
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: "Service temporarily busy. Please try dilpreetsinghverma@gmail.com directly.",
                variant: "destructive",
            });
        }
    });

    const onSubmit = (data: ContactMessage) => {
        mutation.mutate(data);
    };

    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Let's <span className="text-primary italic truncate inline-block">
                                <RevealText text="Connect" />
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-[500px]">
                            Currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:dilpreetsinghverma@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-all group">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Me</p>
                                    <p className="text-lg font-semibold">dilpreetsinghverma@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex gap-4">
                                {[
                                    { icon: Github, href: "https://github.com/DilpreetSinghVerma", color: "hover:text-foreground/80" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/dilpreet-singh-709b35310/", color: "hover:text-[#0077B5]" },
                                    { icon: Instagram, href: "https://www.instagram.com/dilpreet_singh_verma/", color: "hover:text-[#E4405F]" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-xl bg-foreground/5 border border-foreground/10 text-muted-foreground transition-all duration-300 ${social.color} hover:border-primary/50 hover:bg-primary/5`}
                                    >
                                        <social.icon className="h-6 w-6" />
                                    </a>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <a
                                    href="/Dilpreet_Singh_Resume.pdf"
                                    download
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <Download className="h-5 w-5 animate-bounce group-hover:animate-none" />
                                    <span>Download Resume</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <Card className="bg-background/60 backdrop-blur-xl border-foreground/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Send className="h-32 w-32 rotate-12" />
                            </div>
                            <CardContent className="p-8">
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Name</label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                placeholder="John Doe"
                                                className={`w-full px-4 py-3 rounded-lg bg-foreground/5 border ${errors.name ? 'border-destructive' : 'border-foreground/10'} focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all`}
                                            />
                                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                placeholder="john@example.com"
                                                className={`w-full px-4 py-3 rounded-lg bg-foreground/5 border ${errors.email ? 'border-destructive' : 'border-foreground/10'} focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all`}
                                            />
                                            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <textarea
                                            {...register("message")}
                                            rows={4}
                                            placeholder="Your message here..."
                                            className={`w-full px-4 py-3 rounded-lg bg-foreground/5 border ${errors.message ? 'border-destructive' : 'border-foreground/10'} focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none`}
                                        />
                                        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="w-full py-6 text-lg font-bold shadow-[0_0_20px_-5px_hsl(var(--primary))] flex items-center gap-2"
                                    >
                                        {mutation.isPending ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
