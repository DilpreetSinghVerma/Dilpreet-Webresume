import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Torus, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function JarvisVisual() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.5;
            group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
        }
    });

    return (
        <group ref={group}>
            {/* Outer Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.5} />
            </mesh>

            {/* Inner Rotating Rings */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <torusGeometry args={[0.7, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#0a84ff" transparent opacity={0.8} />
                </mesh>
            </Float>

            {/* Core Sphere */}
            <Sphere args={[0.3, 32, 32]}>
                <MeshDistortMaterial
                    color="#00e5ff"
                    speed={4}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>

            {/* Pulsing light */}
            <pointLight color="#00e5ff" intensity={2} distance={5} />
        </group>
    );
}

function EventFoldVisual() {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.8;
            mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
        }
    });

    return (
        <group>
            <mesh ref={mesh}>
                <boxGeometry args={[1.2, 0.1, 0.8]} />
                <MeshWobbleMaterial
                    color="#a855f7"
                    speed={2}
                    factor={0.1}
                />
            </mesh>
            <gridHelper args={[2, 10, "#a855f7", "#3b0764"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} />
            <pointLight color="#a855f7" intensity={3} position={[1, 1, 1]} />
        </group>
    );
}

function SilentVisual() {
    return (
        <group>
            <mesh>
                <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
                <MeshDistortMaterial
                    color="#f59e0b"
                    speed={3}
                    distort={0.3}
                />
            </mesh>
            <pointLight color="#f59e0b" intensity={2} position={[-2, 1, 2]} />
        </group>
    );
}

export default function ProjectVisual({ projectId }: { projectId: string }) {
    return (
        <div className="w-full h-48 md:h-64 relative bg-primary/5 rounded-2xl overflow-hidden border border-primary/10 mb-6">
            <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
                <ambientLight intensity={0.5} />
                {projectId === "jarvis" && <JarvisVisual />}
                {projectId === "eventfold" && <EventFoldVisual />}
                {projectId === "silent" && <SilentVisual />}
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-primary/40 uppercase tracking-widest">
                Interactive Hologram V-1.0
            </div>
        </div>
    );
}
