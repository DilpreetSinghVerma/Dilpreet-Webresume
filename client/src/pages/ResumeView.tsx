import { useTransitionNavigate } from "@/hooks/use-transition-navigate";
import { ArrowLeft, Download, Trophy, Eye, X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlow from "@/components/ui/cursor-glow";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CYPHERVERSE_PHOTOS = [
  {
    title: "₹15,000 Prize Ceremony — 2nd Position",
    subtitle: "Team Dream Dive on stage at CGC University, Mohali",
    src: "/achievements/CypherVerse Prize Ceremony.jpg"
  },
  {
    title: "Certificate of Appreciation — 2nd Position",
    subtitle: "Awarded by CGC University & DevHive Club",
    src: "/achievements/CypherVerse 2nd Position Certificate.jpg"
  },
  {
    title: "Certificates, Badges & Hackathon Kit",
    subtitle: "CypherVerse 2026 Hackathon Setup",
    src: "/achievements/CypherVerse Badges and Certificates.jpg"
  },
  {
    title: "Certificate of Participation",
    subtitle: "Dilpreet Singh (Team Dream Dive)",
    src: "/achievements/CypherVerse Participation Certificate.jpg"
  },
  {
    title: "Dilpreet Singh at CypherVerse 2026",
    subtitle: "Representing Gulzar Group of Institutes",
    src: "/achievements/Dilpreet CypherVerse.jpg"
  }
];

export default function ResumeView() {
  const navigate = useTransitionNavigate();
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative bg-background flex flex-col">
      <CursorGlow />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 py-4 px-4 md:px-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Button>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="gap-2 border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hidden sm:inline-flex"
            onClick={() => setPhotoIndex(0)}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Hackathon Win Photos
          </Button>

          <Button variant="default" className="gap-2 shadow-[0_0_20px_-5px_hsl(var(--primary))]" asChild>
            <a href="/Dilpreet_Singh_Resume.pdf" download>
               <Download className="w-4 h-4" />
               Download PDF
            </a>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col gap-4">
        {/* Latest Achievement Callout Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-background/60 to-primary/10 p-4 sm:p-5 backdrop-blur-xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-semibold uppercase tracking-wider border border-amber-500/30">
                    Latest Win • August 2026
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">₹15,000 Cash Prize</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-foreground mt-1">
                  2nd Position — CypherVerse 2026 Hackathon (Team Dream Dive)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  24-Hour Hackathon hosted by DevHive Club at CGC University, Mohali • Built functional AI/ML prototype
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-amber-500/40 hover:bg-amber-500/20 text-amber-300 gap-1.5 w-full sm:w-auto shrink-0"
                onClick={() => setPhotoIndex(0)}
              >
                <Eye className="w-3.5 h-3.5" />
                View Proof & Photos ({CYPHERVERSE_PHOTOS.length})
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="w-full flex-1 min-h-[70vh] rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-foreground/5 relative flex flex-col">
          <div className="absolute inset-0 bg-primary/5 animate-pulse -z-10" />

          <iframe 
            src="/Dilpreet_Singh_Resume.pdf" 
            className="w-full h-full min-h-[70vh] border-none z-10"
            title="Dilpreet Singh Resume"
          />
        </div>
      </div>

      {/* Lightbox Modal for Hackathon Photos */}
      <AnimatePresence>
        {photoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setPhotoIndex(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setPhotoIndex(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/50 flex items-center justify-center">
                <img 
                  src={CYPHERVERSE_PHOTOS[photoIndex].src} 
                  alt={CYPHERVERSE_PHOTOS[photoIndex].title}
                  className="max-h-[72vh] w-auto object-contain rounded-xl"
                />

                {/* Prev/Next Controls */}
                {CYPHERVERSE_PHOTOS.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoIndex((photoIndex - 1 + CYPHERVERSE_PHOTOS.length) % CYPHERVERSE_PHOTOS.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition-transform active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoIndex((photoIndex + 1) % CYPHERVERSE_PHOTOS.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition-transform active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h4 className="text-base font-bold text-white">
                  {CYPHERVERSE_PHOTOS[photoIndex].title}
                </h4>
                <p className="text-xs text-white/70 mt-0.5">
                  {CYPHERVERSE_PHOTOS[photoIndex].subtitle} ({photoIndex + 1} of {CYPHERVERSE_PHOTOS.length})
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
