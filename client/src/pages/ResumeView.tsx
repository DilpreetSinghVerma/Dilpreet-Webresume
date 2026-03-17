import { useLocation } from "wouter";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorGlow from "@/components/ui/cursor-glow";

export default function ResumeView() {
  const [, setLocation] = useLocation();

  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative bg-background flex flex-col">
      <CursorGlow />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 py-4 px-4 md:px-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Button>
        
        <div className="flex items-center gap-4">
          <Button variant="default" className="gap-2 shadow-[0_0_20px_-5px_hsl(var(--primary))]" asChild>
            <a href="/Dilpreet_Singh_Resume.pdf" download>
               <Download className="w-4 h-4" />
               Download
            </a>
          </Button>
        </div>
      </header>

      {/* PDF Viewer Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 h-full">
        <div className="w-full h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-foreground/5 relative flex flex-col">
          
          <div className="absolute inset-0 bg-primary/5 animate-pulse -z-10" />

          <iframe 
            src="/Dilpreet_Singh_Resume.pdf" 
            className="w-full h-full border-none z-10"
            title="Dilpreet Singh Resume"
          />
        </div>
      </div>
    </main>
  );
}
