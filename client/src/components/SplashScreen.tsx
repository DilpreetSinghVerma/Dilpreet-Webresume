import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { splitIntoChars, splitIntoLines } from "@/lib/split-text";

gsap.registerPlugin(CustomEase);

/** Images shown during the preloader cascade */
const PRELOADER_IMAGES = [
  "/dilpreet-portrait.png",
  "/achievements/Hacathon 1.jpg",
  "/achievements/Hackathon 2.jpg",
  "/achievements/logo designing compitition 1.jpg",
];

const COPY_TEXT =
  "A full-stack developer and AI engineer focused on building scalable, real-world solutions with precision and passion.";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Register custom ease
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const nameEl = headerRef.current?.querySelector(
      ".name-text"
    ) as HTMLElement | null;
    const copyEl = containerRef.current?.querySelector(
      ".preloader-copy p"
    ) as HTMLElement | null;

    if (!nameEl || !copyEl || !containerRef.current || !headerRef.current)
      return;

    // ─── Split text into chars / lines ───
    const charSplit = splitIntoChars(nameEl);
    const lineSplit = splitIntoLines(copyEl);
    const chars = charSplit.elements;
    const lines = lineSplit.elements;

    // Initial states
    chars.forEach((char, i) => {
      gsap.set(char, { yPercent: i % 2 === 0 ? -100 : 100 });
    });
    gsap.set(lines, { yPercent: 100 });

    const preloaderImages = gsap.utils.toArray<HTMLElement>(
      ".preloader-images .img"
    );
    const preloaderImagesInner = gsap.utils.toArray<HTMLElement>(
      ".preloader-images .img img"
    );

    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];

    // ─── Main timeline ───
    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        // Clean up preloader DOM + tell Home the splash is done
        if (headerRef.current) {
          headerRef.current.style.display = "none";
        }
        onDone();
      },
    });

    // 1. Progress bar fills
    tl.to(".preloader .progress-bar", {
      scaleX: 1,
      duration: 4,
      ease: "power3.inOut",
    })
      .set(".preloader .progress-bar", { transformOrigin: "right" })
      .to(".preloader .progress-bar", {
        scaleX: 0,
        duration: 1,
        ease: "power3.in",
      });

    // 2. Image cascade — clip-path reveal
    preloaderImages.forEach((img, i) => {
      tl.to(
        img,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "hop",
          delay: i * 0.75,
        },
        "-=5"
      );
    });

    // 3. Image zoom-out
    preloaderImagesInner.forEach((img, i) => {
      tl.to(
        img,
        {
          scale: 1,
          duration: 1.5,
          ease: "hop",
          delay: i * 0.75,
        },
        "-=5.25"
      );
    });

    // 4. Copy lines slide in
    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=5.5"
    );

    // 5. Name chars animate in
    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
      },
      "-=5"
    );

    // 6. Images clip away upward
    tl.to(
      ".preloader-images",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      },
      "-=1.5"
    );

    // 7. Copy lines slide out
    tl.to(
      lines,
      {
        y: "-125%",
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=2"
    );

    // 8. Name chars redistribute — middle fly out, first + last stay
    tl.to(
      chars,
      {
        yPercent: (index: number) => {
          if (index === 0 || index === chars.length - 1) return 0;
          return index % 2 === 0 ? 100 : -100;
        },
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        delay: 0.5,
        onStart: () => {
          // Allow first and last chars to escape their masks
          const initialMask = initialChar.parentElement;
          const lastMask = lastChar.parentElement;

          if (initialMask?.classList.contains("char-mask")) {
            initialMask.style.overflow = "visible";
          }
          if (lastMask?.classList.contains("char-mask")) {
            lastMask.style.overflow = "visible";
          }

          // Move first + last to center
          const viewportWidth = window.innerWidth;
          const centerX = viewportWidth / 2;
          const initialRect = initialChar.getBoundingClientRect();
          const lastRect = lastChar.getBoundingClientRect();

          gsap.to([initialChar, lastChar], {
            duration: 1,
            ease: "hop",
            delay: 0.5,
            x: (i: number) => {
              if (i === 0) {
                return centerX - initialRect.left - initialRect.width;
              } else {
                return centerX - lastRect.left;
              }
            },
            onComplete: () => {
              // Scale the entire header down and blend
              gsap.set(headerRef.current, { mixBlendMode: "difference" });
              gsap.to(headerRef.current, {
                y: "2rem",
                scale: 0.35,
                duration: 1.75,
                ease: "hop",
              });
            },
          });
        },
      },
      "-=2.5"
    );

    // 9. Preloader wipes upward to reveal the hero
    tl.to(
      ".preloader",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.75,
        ease: "hop",
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <>
      {/* Dark overlay with images + copy */}
      <div ref={containerRef} className="preloader">
        <div className="progress-bar" />

        <div className="preloader-images">
          {PRELOADER_IMAGES.map((src, i) => (
            <div className="img" key={i}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>

        <div className="preloader-copy">
          <p>{COPY_TEXT}</p>
        </div>
      </div>

      {/* Name header — lives outside the preloader for mix-blend-mode */}
      <div ref={headerRef} className="preloader-header">
        <span className="name-text">Dilpreet Singh</span>
      </div>
    </>
  );
}
