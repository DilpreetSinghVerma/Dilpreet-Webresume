import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Send, User, Calendar, Sparkles, Loader2 } from "lucide-react";
import { insertGuestbookSchema, type GuestbookEntry, type InsertGuestbook } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function Guestbook() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: entries, isLoading } = useQuery<GuestbookEntry[]>({
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
      form.reset();
      setIsExpanded(false);
      toast.success("Message added to guestbook! ✨");
    },
    onError: () => {
      toast.error("Failed to add message. Please try again.");
    },
  });

  const onSubmit = (data: InsertGuestbook) => {
    mutation.mutate(data);
  };

  return (
    <section id="guestbook" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
              <Sparkles className="h-3 w-3" />
              DIGITAL GUESTBOOK
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 italic">
              Leave a <span className="text-primary not-italic">Legacy</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your thoughts, feedback, or just a friendly "hello". Your message stores on the blockchain... just kidding, it's on a high-performance Neon database.
            </p>
          </motion.div>

          {/* Form Trigger / Form */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={() => setIsExpanded(true)}
                    size="lg"
                    className="group rounded-full px-8 h-14 text-base shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all"
                  >
                    <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Sign the Guestbook
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="border-primary/20 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                    <CardContent className="p-6 md:p-8">
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                            <Input
                              {...form.register("name")}
                              placeholder="Alex Doe"
                              className="bg-background/50 border-white/10 focus:border-primary/50 rounded-xl h-12"
                            />
                            {form.formState.errors.name && (
                              <p className="text-xs text-red-500 ml-1">{form.formState.errors.name.message}</p>
                            )}
                          </div>
                          <div className="flex items-end pb-1 text-xs text-muted-foreground italic opacity-60">
                            * Name will be visible to everyone.
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                          <Textarea
                            {...form.register("message")}
                            placeholder="Loved the Jarvis HUD section! Amazing work on the 3D flipbooks too."
                            className="bg-background/50 border-white/10 focus:border-primary/50 rounded-xl min-h-[120px] resize-none"
                          />
                          {form.formState.errors.message && (
                            <p className="text-xs text-red-500 ml-1">{form.formState.errors.message.message}</p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="flex-1 rounded-xl h-12 shadow-lg shadow-primary/10"
                          >
                            {mutation.isPending ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Post Message
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsExpanded(false)}
                            className="rounded-xl h-12 border-white/10 hover:bg-white/5"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Entries Feed */}
          <div className="space-y-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
                <p className="text-sm font-mono text-muted-foreground animate-pulse">Accessing archives...</p>
              </div>
            ) : entries && entries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 4) * 0.1 }}
                  >
                    <Card className="h-full border-white/5 bg-background/20 backdrop-blur-sm hover:border-primary/20 transition-all duration-500 overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm tracking-tight">{entry.name}</h4>
                              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                                <Calendar className="h-3 w-3" />
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                             <Sparkles className="h-4 w-4 text-primary/30" />
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          "{entry.message}"
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                <p className="text-muted-foreground">The guestbook is currently empty. Be the first to leave a mark!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
