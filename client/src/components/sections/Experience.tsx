import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Award, Star, X, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { RevealText } from "@/components/ui/reveal-text";

// Combine Education, Experience, and Awards into a single Chronological Journey
const JOURNEY_ITEMS = [
  {
    id: 1,
    type: "education",
    icon: GraduationCap,
    title: "B.Tech in Computer Science (AIML)",
    subtitle: "Gulzar Group of Institutes, Khanna",
    date: "Expected 01/2028",
    description: "Pursuing Bachelor of Technology with a specialization in Artificial Intelligence and Machine Learning.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30"
  },
  {
    id: 2,
    type: "experience",
    icon: Star,
    title: "Google Student Ambassador",
    subtitle: "Gulzar Group of Institutes",
    date: "2025 - 2026",
    description: "Selected to represent Google and foster a culture of innovation. Organizing workshops, promoting technologies, and bridging the gap between students and industry resources.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/30",
    isGoogle: true
  },
  {
    id: 3,
    type: "award",
    icon: Award,
    title: "Top 30 Finalist - Prompt The Future Hackathon",
    subtitle: "Next Quantum 3.0 | GGI",
    date: "Feb 2026",
    description: "Competed in an intensive 24-hour hackathon, developing AI-driven solutions and ranking among the Top 30 Finalists out of hundreds of participants.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-400/30",
    images: ["/achievements/Hacathon 1.jpg", "/achievements/Hackathon 2.jpg"]
  },
  {
    id: 4,
    type: "award",
    icon: Award,
    title: "2nd Position - Digital Logo Designing",
    subtitle: "GNE's ACME 2025",
    date: "2025",
    description: "Represented Gulzar Group of Institutes at Guru Nanak Dev Engineering College. Demonstrated creativity and precision in digital design.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    images: ["/achievements/logo designing compitition 1.jpg", "/achievements/logo designing compitition 2.jpg", "/achievements/logo designing compitition 3.jpg", "/achievements/logo designing compitition 4.jpg"]
  },
  {
    id: 5,
    type: "experience",
    icon: Briefcase,
    title: "Technical Support & Assistance",
    subtitle: "Photography and Videography Studio • Ludhiana",
    date: "01/2018 - 07/2025",
    description: "Delivered technical assistance, managed media workflows, troubleshot equipment, and optimized processes for remote and on-site customers.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30"
  },
  {
    id: 6,
    type: "education",
    icon: GraduationCap,
    title: "12th Grade (90.2%)",
    subtitle: "Teja Singh Sutantar Memorial Sr. Sec. School",
    date: "Completed",
    description: "Completed Senior Secondary education with an outstanding academic record.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/10",
    borderColor: "border-muted/30",
    images: ["/achievements/12th class last day.jpg"]
  },
  {
    id: 7,
    type: "education",
    icon: GraduationCap,
    title: "10th Grade (74.9%)",
    subtitle: "Baba Nand Singh Convent Sr. Sec. School",
    date: "Completed",
    description: "Completed High School education with a strong foundation in science and mathematics.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/10",
    borderColor: "border-muted/30"
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education" | "award">("all");
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; currentIndex: number } | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "all", label: "Full Journey", icon: Star },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "award", label: "Honors", icon: Award },
  ];

  const filteredItems = activeTab === "all" 
    ? JOURNEY_ITEMS 
    : JOURNEY_ITEMS.filter(item => item.type === activeTab);

  const openLightbox = (images: string[], index: number) => {
    setImageLoading(true);
    setLightboxState({ images, currentIndex: index });
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxState) return;
    setImageLoading(true);
    setLightboxState({ ...lightboxState, currentIndex: (lightboxState.currentIndex + 1) % lightboxState.images.length });
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxState) return;
    setImageLoading(true);
    setLightboxState({ ...lightboxState, currentIndex: (lightboxState.currentIndex - 1 + lightboxState.images.length) % lightboxState.images.length });
  };

  return (
    <section className="py-24 relative overflow-hidden" id="experience" ref={containerRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-mono tracking-wider">CHRONICLES</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold leading-tight">
            <RevealText text="My Journey" />
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="flex p-1.5 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-500 overflow-hidden ${
                  activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary shadow-lg shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div 
                  className={`relative h-full p-6 rounded-3xl bg-background/60 backdrop-blur-xl border ${item.borderColor} hover:border-current transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-current/10 ${item.isGoogle ? 'cursor-pointer' : ''}`}
                  onClick={() => item.isGoogle && setShowAmbassadorModal(true)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl -z-10`} />

                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${item.bgColor} border flex items-center justify-center ${item.borderColor}`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${item.borderColor} ${item.bgColor} ${item.color}`}>
                      {item.date}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-bold font-display text-foreground leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-widest leading-none">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                    {item.description}
                  </p>

                  {/* Journey Images (Compact) */}
                  {(item as any).images && (
                    <div className="grid grid-cols-3 gap-2">
                      {(item as any).images.map((src: string, i: number) => (
                        <div 
                          key={i} 
                          className="relative rounded-xl overflow-hidden border border-foreground/5 aspect-square bg-foreground/5 group/img cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); openLightbox((item as any).images, i); }}
                        >
                           <img 
                             src={src} 
                             alt={`${item.title} ${i + 1}`} 
                             loading="lazy"
                             className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                           />
                           <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}

                  {item.isGoogle && (
                    <div className={`mt-4 inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase ${item.color} group-hover:underline`}>
                      Verify Credential <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modals... */}
        <AnimatePresence>
          {showAmbassadorModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAmbassadorModal(false)} className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.7, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative bg-card rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full border border-blue-500/30">
                <button onClick={() => setShowAmbassadorModal(false)} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10 bg-background border">
                  <X className="h-5 w-5" />
                </button>
                <img src="/gap-badge-full.jpg" alt="Google Student Ambassador Badge" className="w-full h-auto" />
              </motion.div>
            </motion.div>
          )}

          {lightboxState && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxState(null)} className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] flex items-center justify-center border border-foreground/10 bg-black group/modal">
                <button onClick={() => setLightboxState(null)} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-30 bg-black/50 backdrop-blur-md border border-white/10">
                  <X className="h-6 w-6 text-white" />
                </button>
                {imageLoading && <div className="absolute inset-0 flex items-center justify-center z-0"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>}
                
                {lightboxState.images.length > 1 && (
                  <>
                    <button onClick={prevLightboxImage} className="absolute left-4 p-3 hover:bg-white/20 rounded-full transition-colors z-20 bg-black/50 border border-white/10"><ChevronLeft className="h-6 w-6 text-white" /></button>
                    <button onClick={nextLightboxImage} className="absolute right-4 p-3 hover:bg-white/20 rounded-full transition-colors z-20 bg-black/50 border border-white/10"><ChevronRight className="h-6 w-6 text-white" /></button>
                  </>
                )}
                
                <img key={lightboxState.images[lightboxState.currentIndex]} src={lightboxState.images[lightboxState.currentIndex]} alt="Expanded view" className={`w-full h-[90vh] object-contain relative z-10 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setImageLoading(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
