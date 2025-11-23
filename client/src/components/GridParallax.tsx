import { useEffect, useState } from "react";

export default function GridParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) return; // Only apply in bright mode

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(200, 200, 200, 0.15) 25%, rgba(200, 200, 200, 0.15) 26%, transparent 27%, transparent 74%, rgba(200, 200, 200, 0.15) 75%, rgba(200, 200, 200, 0.15) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(200, 200, 200, 0.15) 25%, rgba(200, 200, 200, 0.15) 26%, transparent 27%, transparent 74%, rgba(200, 200, 200, 0.15) 75%, rgba(200, 200, 200, 0.15) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `0 ${scrollY * 0.5}px`,
        backgroundAttachment: "scroll",
        willChange: "background-position",
      }}
    />
  );
}
