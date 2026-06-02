import { useLocation } from "wouter";
import { useCallback } from "react";

export function useTransitionNavigate() {
  const [, setLocation] = useLocation();

  const navigate = useCallback(async (to: string) => {
    if (to === window.location.pathname) return;

    // Trigger exit animation (cover viewport with dynamic strokes)
    window.dispatchEvent(new CustomEvent("page-transition-start"));

    // Wait 1000ms for full stroke cover
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update location using wouter's default location hook (synchronously)
    setLocation(to);

    // Wait 100ms to ensure React mounts and renders the target page component
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Trigger entrance animation (sweep strokes away to reveal new page)
    window.dispatchEvent(new CustomEvent("page-transition-end"));
  }, [setLocation]);

  return navigate;
}
