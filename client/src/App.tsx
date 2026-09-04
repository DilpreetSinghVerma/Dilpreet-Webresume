import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { AdminProvider } from "@/hooks/use-admin";
import SVGTransitionOverlay from "@/components/ui/svg-transition-overlay";

const ResumeView = lazy(() => import("@/pages/ResumeView"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/resume" component={ResumeView} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <SVGTransitionOverlay />
          <Router />
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
