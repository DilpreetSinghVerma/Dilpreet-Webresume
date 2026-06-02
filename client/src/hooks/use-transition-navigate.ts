import { useLocation } from "wouter";
import { useCallback } from "react";

/**
 * Navigation hook that orchestrates page transitions with the SVG overlay.
 *
 * Sequence:
 *   1. Dispatch "page-transition-start"  (overlay starts drawing IN)
 *   2. Wait for "page-transition-cover-done" (overlay has fully covered viewport)
 *   3. setLocation(to)                   (swap the route)
 *   4. Dispatch "page-transition-end"     (overlay starts drawing OUT)
 */
export function useTransitionNavigate() {
  const [, setLocation] = useLocation();

  const navigate = useCallback(
    async (to: string) => {
      if (to === window.location.pathname) return;

      // 1. Fire exit animation
      window.dispatchEvent(new CustomEvent("page-transition-start"));

      // 2. Wait until the overlay signals cover is complete
      await new Promise<void>((resolve) => {
        const onDone = () => {
          window.removeEventListener("page-transition-cover-done", onDone);
          resolve();
        };
        window.addEventListener("page-transition-cover-done", onDone);
      });

      // 3. Swap route (hidden behind overlay)
      setLocation(to);

      // 4. Small tick to let React render the new page
      await new Promise((r) => setTimeout(r, 50));

      // 5. Fire entrance animation (reveal new page)
      window.dispatchEvent(new CustomEvent("page-transition-end"));
    },
    [setLocation]
  );

  return navigate;
}
