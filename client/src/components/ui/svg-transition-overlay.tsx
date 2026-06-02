import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

const DEFAULT_LENGTH = 15000; // Safe fallback length to prevent 0-length layout bugs

export default function SVGTransitionOverlay() {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const lengthsRef = useRef({ len1: DEFAULT_LENGTH, len2: DEFAULT_LENGTH });

  useEffect(() => {
    const updateLengths = () => {
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;
      if (!p1 || !p2) return;

      const len1 = p1.getTotalLength() || DEFAULT_LENGTH;
      const len2 = p2.getTotalLength() || DEFAULT_LENGTH;

      lengthsRef.current = { len1, len2 };

      p1.style.strokeDasharray = `${len1}`;
      p1.style.strokeDashoffset = `${len1}`;
      p2.style.strokeDasharray = `${len2}`;
      p2.style.strokeDashoffset = `${len2}`;
    };

    // Initialize lengths immediately
    updateLengths();
    
    // Schedule a secondary update after browser layout has occurred
    const r1 = requestAnimationFrame(() => {
      requestAnimationFrame(updateLengths);
    });

    const handleStart = () => {
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;
      if (!p1 || !p2) return;

      // Force recalculation if it was previously unresolved
      const len1 = p1.getTotalLength() || lengthsRef.current.len1 || DEFAULT_LENGTH;
      const len2 = p2.getTotalLength() || lengthsRef.current.len2 || DEFAULT_LENGTH;
      lengthsRef.current = { len1, len2 };

      p1.style.strokeDasharray = `${len1}`;
      p2.style.strokeDasharray = `${len2}`;

      animate(p1, { strokeDashoffset: 0, strokeWidth: 700 }, { duration: 1.0, ease: "easeInOut" });
      animate(p2, { strokeDashoffset: 0, strokeWidth: 700 }, { duration: 1.0, ease: "easeInOut" });
    };

    const handleEnd = async () => {
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;
      if (!p1 || !p2) return;

      const { len1, len2 } = lengthsRef.current;

      const a1 = animate(p1, { strokeDashoffset: -len1, strokeWidth: 200 }, { duration: 1.0, ease: "easeInOut" });
      const a2 = animate(p2, { strokeDashoffset: -len2, strokeWidth: 200 }, { duration: 1.0, ease: "easeInOut" });
      
      await Promise.all([a1, a2]);

      // Reset paths to hidden state for future transition triggers
      p1.style.strokeDashoffset = `${len1}`;
      p2.style.strokeDashoffset = `${len2}`;
    };

    window.addEventListener("page-transition-start", handleStart);
    window.addEventListener("page-transition-end", handleEnd);

    return () => {
      cancelAnimationFrame(r1);
      window.removeEventListener("page-transition-start", handleStart);
      window.removeEventListener("page-transition-end", handleEnd);
    };
  }, []);

  return (
    <div className="transition-svg-overlay" aria-hidden="true">
      <svg
        viewBox="0 0 2453 2535"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          ref={path1Ref}
          d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
          stroke="var(--transition-stroke-1)"
          strokeWidth="200"
          strokeLinecap="round"
        />
        <path
          ref={path2Ref}
          d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
          stroke="var(--transition-stroke-2)"
          strokeWidth="200"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
