import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGuestbookSchema, type GuestbookEntry, type InsertGuestbook } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, ShieldCheck, Pin, Trash2, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";

export default function Guestbook() {
    const { toast } = useToast();
    const { isAdmin } = useAdmin();
    const [showAll, setShowAll] = useState(false);
    
    const { data: entries = [], isLoading } = useQuery<GuestbookEntry[]>({
        queryKey: ["/api/guestbook"],
    });

    const form = useForm<InsertGuestbook>({
        resolver: zodResolver(insertGuestbookSchema),
        defaultValues: {
            name: "",
            message: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: InsertGuestbook) => {
            const res = await apiRequest("POST", "/api/guestbook", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/guestbook"] });
            toast({ title: "Message Shared!", description: "Your legacy has been added to the guestbook." });
            form.reset();
        },
        onError: (error: any) => {
            toast({ 
                variant: "destructive", 
                title: "Error", 
                description: error.message || "Failed to post message. Please try again." 
            });
        }
    });

    const adminMutation = useMutation({
        mutationFn: async ({ action, id, pinned }: { action: 'pin' | 'delete', id: string, pinned?: boolean }) => {
            const secret = "dilpreet_admin_2026"; // In real app, this would be from context
            if (action === 'delete') {
                await apiRequest("DELETE", `/api/guestbook?id=${id}&secret=${secret}`);
            } else {
                await apiRequest("PATCH", "/api/guestbook", { id, pinned, secret });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/guestbook"] });
            toast({ title: "Admin Action Successful" });
        }
    });

    const displayEntries = useMemo(() => {
        if (showAll) return entries;
        return entries.slice(0, 3);
    }, [entries, showAll]);

    return (
        <section id="guestbook" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        Leave a <span className="text-primary italic">Legacy</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Share your thoughts, feedback, or just a friendly "hello". Your message stores on a high-performance Neon database.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-[1fr,1.5fr] gap-8">
                    {/* Form */}
                    <Card className="bg-white/5 border-primary/20 backdrop-blur-sm h-fit sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <MessageSquare className="h-5 w-5" />
                                Post a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">YOUR NAME</label>
                                    <Input 
                                        {...form.register("name")} 
                                        placeholder="Dilpreet Singh"
                                        className="bg-primary/5 border-primary/20 focus:border-primary transition-all"
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-xs text-red-500 ml-1">{form.formState.errors.name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">MESSAGE</label>
                                    <Textarea 
                                        {...form.register("message")} 
                                        placeholder="Write something cool..."
                                        className="bg-primary/5 border-primary/20 focus:border-primary transition-all min-h-[120px]"
                                    />
                                    {form.formState.errors.message && (
                                        <p className="text-xs text-red-500 ml-1">{form.formState.errors.message.message}</p>
                                    )}
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? "Sharing..." : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Post Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Entries */}
                    <div className="space-y-4">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl border border-primary/10" />
                            ))
                        ) : entries.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground italic bg-white/5 rounded-xl border border-dashed border-primary/20">
                                No messages yet. Be the first to leave one!
                            </div>
                        ) : (
                            <>
                                <AnimatePresence mode="popLayout">
                                    {displayEntries.map((entry) => (
                                        <motion.div
                                            key={entry.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`p-6 rounded-xl border transition-all ${
                                                entry.pinned === "true" 
                                                    ? "bg-primary/10 border-primary ring-1 ring-primary/30" 
                                                    : "bg-white/5 border-primary/10 hover:border-primary/30"
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-primary">{entry.name}</h4>
                                                    {entry.pinned === "true" && (
                                                        <span className="flex items-center gap-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                                            <Star className="h-2.5 w-2.5 fill-current" /> Pinned
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(entry.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {isAdmin && (
                                                        <div className="flex items-center gap-1 ml-2 border-l border-primary/20 pl-2">
                                                            <button 
                                                                onClick={() => adminMutation.mutate({ 
                                                                    action: 'pin', 
                                                                    id: entry.id, 
                                                                    pinned: entry.pinned !== "true" 
                                                                })}
                                                                className={`p-1.5 rounded transition-colors ${entry.pinned === "true" ? "text-primary bg-primary/20" : "text-muted-foreground hover:bg-white/10"}`}
                                                                title="Pin message"
                                                            >
                                                                <Pin className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button 
                                                                onClick={() => adminMutation.mutate({ action: 'delete', id: entry.id })}
                                                                className="p-1.5 rounded text-red-400 hover:bg-red-400/10 transition-colors"
                                                                title="Delete message"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed whitespace-pre-wrap">{entry.message}</p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {entries.length > 3 && (
                                    <Button
                                        variant="ghost"
                                        onClick={() => setShowAll(!showAll)}
                                        className="w-full border border-primary/20 hover:bg-primary/10 text-primary py-6 rounded-xl font-bold group"
                                    >
                                        {showAll ? (
                                            <>
                                                <ChevronUp className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                                                Show Less
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                                                View {entries.length - 3} More Messages
                                            </>
                                        )}
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Admin Status */}
                {isAdmin && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <ShieldCheck className="h-5 w-5" />
                            <span>SUPERUSER ADMIN MODE ACTIVE</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => logout()} className="border-primary/20 hover:bg-red-500/10 hover:text-red-500">
                             Deactivate
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
