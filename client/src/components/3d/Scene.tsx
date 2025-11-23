import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Stars(props: any) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree(); // Access mouse from R3F
  
  const sphere = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.2 * Math.cbrt(Math.random()) + 0.5; // Hollower center
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1000;
      const scrollProgress = scrollY / maxScroll;

      // Dynamic rotation based on scroll AND mouse
      // Mouse influence is subtle but adds "feel"
      const mouseX = mouse.x * 0.8; // Increased sensitivity from 0.2
      const mouseY = mouse.y * 0.8; // Increased sensitivity from 0.2

      ref.current.rotation.x = -(time * 0.05) - (scrollY * 0.0005) + mouseY;
      ref.current.rotation.y = -(time * 0.03) - (scrollY * 0.0005) + mouseX;
      
      // Slight zoom effect on scroll
      ref.current.scale.setScalar(1 + scrollProgress * 0.2);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          opacity={0.8}
          color="#00e5ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingFlare({ color, position, scale, speed }: { color: string, position: [number, number, number], scale: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      
      // Move flares based on scroll AND mouse parallax
      const parallaxX = mouse.x * 0.5;
      const parallaxY = mouse.y * 0.5;

      meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.5) * 0.1 + parallaxX;
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2 + (scrollY * 0.001) + parallaxY;
      meshRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[scale, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  
  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        {/* Transparent background in light mode, dark in dark mode */}
        {isDarkMode && <color attach="background" args={['#020204']} />} 
        
        <Stars />
        
        {/* Floating "Lens Flares" / Orbs */}
        <FloatingFlare color="#00e5ff" position={[-1.2, 0.5, 0]} scale={0.3} speed={1.5} />
        <FloatingFlare color="#7c3aed" position={[1.5, -0.8, 0.5]} scale={0.4} speed={1.2} />
        <FloatingFlare color="#ec4899" position={[0, 1.2, -0.5]} scale={0.2} speed={2} />

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0} 
            mipmapBlur 
            intensity={2.0} 
            radius={0.6}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
