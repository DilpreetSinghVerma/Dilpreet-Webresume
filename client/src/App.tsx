import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ResumeView from "@/pages/ResumeView";
import { AdminProvider } from "@/hooks/use-admin";
import SVGTransitionOverlay from "@/components/ui/svg-transition-overlay";
import { useState, useEffect, useCallback } from "react";

// Custom location hook that introduces transition delays for wouter routing
function useTransitionLocation() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback(async (to: string) => {
    if (to === window.location.pathname) return;

    // Trigger exit animation (cover viewport with dynamic strokes)
    window.dispatchEvent(new CustomEvent("page-transition-start"));

    // Wait 1000ms for full stroke cover
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Perform history state update and state change
    window.history.pushState(null, "", to);
    setPath(to);

    // Wait 50ms for React tree to swap active route components
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Trigger entrance animation (sweep strokes away to reveal new page)
    window.dispatchEvent(new CustomEvent("page-transition-end"));
  }, []);

  return [path, navigate] as [string, (to: string) => void];
}

function RouterComponent() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resume" component={ResumeView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <WouterRouter hook={useTransitionLocation}>
          <TooltipProvider>
            <Toaster />
            <SVGTransitionOverlay />
            <RouterComponent />
          </TooltipProvider>
        </WouterRouter>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
