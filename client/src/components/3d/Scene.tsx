import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

function Stars({ count = 1000, color = "#00e5ff" }: { count?: number, color?: string }) {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          opacity={0.6}
          color={color}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function AmbientGlow({ color, position, isMobile }: { color: string, position: [number, number, number], isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 0.3) * 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.03}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Scene() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeColor, setActiveColor] = useState("#00e5ff"); // Default Cyan

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      // Dynamic color shifts based on scroll position
      if (scrollY < height * 0.8) {
        setActiveColor("#00e5ff"); // Hero - Cyan
      } else if (scrollY < height * 1.8) {
        setActiveColor("#10b981"); // Skills - Emerald
      } else if (scrollY < height * 2.8) {
        setActiveColor("#8b5cf6"); // Experience - Violet
      } else if (scrollY < height * 3.8) {
        setActiveColor("#f43f5e"); // Projects - Rose
      } else {
        setActiveColor("#f59e0b"); // Contact - Amber
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Performance-focused GL settings
  const glConfig = useMemo(() => ({
    antialias: false,
    alpha: true,
    powerPreference: "high-performance" as const,
    stencil: false,
    depth: false,
  }), []);

  const starColor = isDark ? activeColor : "#005a66";

  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{
        background: isDark ? "#020204" : "#ffffff",
        transition: "background 0.45s ease",
      }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 45 }}
        gl={glConfig}
        dpr={isMobile ? [1, 1] : [1, 1.2]}
      >
        <Stars count={isMobile ? 150 : 800} color={starColor} />
        <AmbientGlow color={activeColor} position={[-1.5, 0.5, -1]} isMobile={isMobile} />
        <AmbientGlow color={isDark ? "#7c3aed" : "#8b5cf6"} position={[1.5, -0.5, -1]} isMobile={isMobile} />

        {isDark && !isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.5} intensity={1} radius={0.3} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}


