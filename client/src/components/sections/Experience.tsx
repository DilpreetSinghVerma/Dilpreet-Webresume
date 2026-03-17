import { motion, useScroll, useTransform } from "framer-motion";
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
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; currentIndex: number } | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openLightbox = (images: string[], index: number) => {
    setImageLoading(true);
    setLightboxState({ images, currentIndex: index });
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxState) return;
    setImageLoading(true);
    setLightboxState({
      ...lightboxState,
      currentIndex: (lightboxState.currentIndex + 1) % lightboxState.images.length
    });
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxState) return;
    setImageLoading(true);
    setLightboxState({
      ...lightboxState,
      currentIndex: (lightboxState.currentIndex - 1 + lightboxState.images.length) % lightboxState.images.length
    });
  };

  // Scroll logic for the glowing center line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 relative overflow-hidden" id="experience" ref={containerRef}>
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-mono tracking-wider">MY JOURNEY</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold leading-tight">
            <RevealText text="Experience & Education" />
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A timeline of my academic milestones, technical roles, and achievements.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Glowing Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-foreground/10 md:-translate-x-1/2 transform rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY: pathLength, originY: 0 }}
              className="absolute top-0 w-full h-full bg-gradient-to-b from-primary via-accent to-blue-500 shadow-[0_0_15px_rgba(var(--primary),1)]"
            />
          </div>

          <div className="space-y-12">
            {JOURNEY_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal w-full" >
                  
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`absolute left-[24px] md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background bg-background shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${item.bgColor.replace('/10', '')} shadow-[0_0_10px_currentColor] ${item.color}`} />
                  </motion.div>

                  {/* Desktop Layout Space (Empty side) */}
                  <div className={`hidden md:block w-[45%] ${!isEven ? 'order-1' : 'order-3'}`} />

                  {/* Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? 'md:pr-12 md:text-right order-1' : 'md:pl-12 order-3 text-left'}`}
                  >
                    <div 
                      className={`relative p-6 rounded-2xl bg-background/60 backdrop-blur-xl border ${item.borderColor} hover:border-current transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-current/10 ${item.isGoogle ? 'cursor-pointer' : ''}`}
                      onClick={() => item.isGoogle && setShowAmbassadorModal(true)}
                    >
                      {/* Hover glow effect internally */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl -z-10`} />
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full ${item.bgColor} border flex items-center justify-center mb-4 ${item.borderColor} ${isEven ? 'md:ml-auto' : ''}`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>

                      {/* Header Section */}
                      <div className="space-y-1 mb-4">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${item.color}`}>
                          {item.date}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground w-full">
                          {item.subtitle}
                        </p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.description}
                      </p>

                      {/* Attached Journey Images */}
                      {(item as any).images && (
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {(item as any).images.map((src: string, i: number) => (
                            <div 
                              key={i} 
                              className="relative rounded-lg overflow-hidden border border-foreground/10 aspect-video bg-foreground/5 relative group/img cursor-pointer"
                              onClick={() => openLightbox((item as any).images, i)}
                            >
                               {/* Use WebP format equivalent or modern HTML lazy loading for optimization */}
                               <img 
                                 src={src} 
                                 alt={`${item.title} photo ${i + 1}`} 
                                 loading="lazy"
                                 decoding="async"
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                               />
                               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <span className="text-white bg-black/50 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/img:translate-y-0">
                                    View Full
                                  </span>
                               </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.isGoogle && (
                        <div className={`mt-4 inline-flex items-center gap-2 text-xs font-mono ${item.color} group-hover:underline`}>
                          View Credential <Star className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ambassador Badge Modal Restored */}
        {showAmbassadorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAmbassadorModal(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card rounded-xl overflow-hidden shadow-2xl max-w-lg w-full border border-blue-500/30"
            >
              <button
                onClick={() => setShowAmbassadorModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10 bg-background border border-border/50"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <img
                src="/gap-badge-full.jpg"
                alt="Google Student Ambassador Badge"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Dynamic Image Lightbox Modal with Carousel */}
        {lightboxState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxState(null)}
            className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-5xl w-full max-h-[90vh] flex items-center justify-center border border-foreground/10 bg-black group/modal"
            >
              <button
                onClick={() => setLightboxState(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-30 bg-black/50 backdrop-blur-md border border-white/10"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </button>

              {/* Loader */}
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}

              {/* Prev Button */}
              {lightboxState.images.length > 1 && (
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-2 md:left-4 p-2 md:p-3 hover:bg-white/20 rounded-full transition-colors z-20 bg-black/50 backdrop-blur-md border border-white/10 opacity-100 md:opacity-0 md:group-hover/modal:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </button>
              )}

              {/* object-contain ensures the entire image fits inside without cropping */}
              <img
                key={lightboxState.images[lightboxState.currentIndex]}
                src={lightboxState.images[lightboxState.currentIndex]}
                alt="Expanded view"
                className={`w-full h-[90vh] object-contain relative z-10 transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setImageLoading(false)}
              />

              {/* Next Button */}
              {lightboxState.images.length > 1 && (
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-2 md:right-4 p-2 md:p-3 hover:bg-white/20 rounded-full transition-colors z-20 bg-black/50 backdrop-blur-md border border-white/10 opacity-100 md:opacity-0 md:group-hover/modal:opacity-100"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </button>
              )}

              {/* Image Counter */}
              {lightboxState.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                  {lightboxState.currentIndex + 1} / {lightboxState.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
