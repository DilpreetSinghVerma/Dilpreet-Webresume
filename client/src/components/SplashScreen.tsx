import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { splitIntoChars, splitIntoLines } from "@/lib/split-text";

gsap.registerPlugin(CustomEase);

/** Images shown during the preloader cascade */
const PRELOADER_IMAGES = [
  "/splash_screen_optimized/img_1.jpg",
  "/splash_screen_optimized/img_2.jpg",
  "/splash_screen_optimized/img_3.jpg",
  "/splash_screen_optimized/img_4.jpg",
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

    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];
    const middleChars = chars.slice(1, -1);

    // Measure positions safely BEFORE applying GSAP transforms
    const viewportWidth = window.innerWidth;
    const centerX = viewportWidth / 2;
    const initialRect = initialChar.getBoundingClientRect();
    const lastRect = lastChar.getBoundingClientRect();

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

    // Set initial state for images (GPU translation reveal instead of clip-path)
    preloaderImages.forEach((img) => {
      gsap.set(img, { yPercent: 100 });
    });
    preloaderImagesInner.forEach((img) => {
      gsap.set(img, { yPercent: -100, scale: 2 });
    });

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
      force3D: true,
    })
      .set(".preloader .progress-bar", { transformOrigin: "right" })
      .to(".preloader .progress-bar", {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.in",
        force3D: true,
      });

    // 2. Image cascade — slide reveal
    preloaderImages.forEach((img, i) => {
      tl.to(
        img,
        {
          yPercent: 0,
          duration: 1,
          ease: "hop",
          delay: i * 0.75,
          force3D: true,
        },
        0.25
      );
    });

    // 3. Image zoom-out & counter-translate
    preloaderImagesInner.forEach((img, i) => {
      tl.to(
        img,
        {
          yPercent: 0,
          scale: 1,
          duration: 1.5,
          ease: "hop",
          delay: i * 0.75,
          force3D: true,
        },
        0.25
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
        force3D: true,
      },
      0.5
    );

    // 5. Name chars animate in
    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        force3D: true,
      },
      0.75
    );

    // Add a label for the exit sequence
    tl.addLabel("exit", 4.25);

    // 6. Images fly away upward (completely off-screen)
    tl.to(
      ".preloader-images",
      {
        y: -window.innerHeight,
        duration: 1.25,
        ease: "hop",
        force3D: true,
      },
      "exit"
    );

    // 7. Copy lines slide out
    tl.to(
      lines,
      {
        y: "-125%",
        duration: 1.25,
        ease: "hop",
        stagger: 0.075,
        force3D: true,
      },
      "exit"
    );

    // 8. Name chars redistribute — middle fly out
    tl.to(
      middleChars,
      {
        yPercent: (i: number) => (i % 2 === 0 ? 100 : -100),
        duration: 0.8,
        ease: "hop",
        stagger: 0.02,
        force3D: true,
      },
      "exit"
    );

    // Make masks overflow: visible so first/last letters can move freely
    tl.set([initialChar.parentElement, lastChar.parentElement], {
      overflow: "visible",
    }, "exit");

    // Move first and last characters to the center to form "DH"
    tl.to([initialChar, lastChar], {
      x: (i: number) => {
        if (i === 0) {
          return centerX - initialRect.left - initialRect.width;
        } else {
          return centerX - lastRect.left;
        }
      },
      duration: 0.8,
      ease: "hop",
      force3D: true,
    }, "exit+=0.25");

    // 9. Preloader slides upward & header scales down in parallel!
    tl.set(headerRef.current, { mixBlendMode: "difference" }, "exit+=1.05")
      .to(headerRef.current, {
        y: "2rem",
        scale: 0.35,
        duration: 1.5,
        ease: "hop",
        force3D: true,
      }, "exit+=1.05")
      .to(
        ".preloader",
        {
          yPercent: -100,
          duration: 1.5,
          ease: "hop",
          force3D: true,
        },
        "exit+=1.05"
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
