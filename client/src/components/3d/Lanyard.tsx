/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Extend Three.js with MeshLine
extend({ MeshLineGeometry, MeshLineMaterial });

const cardGLB = '/models/card.glb';
const cardTexturePath = '/textures/card_texture.png?v=6';
const strapTexturePath = '/textures/strap_texture.png?v=4';

export default function Lanyard({
  position = [0, 0, 20] as [number, number, number],
  gravity = [0, -40, 0] as [number, number, number],
  fov = 25,
  transparent = true
}) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef<any>(),
    fixed = useRef<any>(),
    j1 = useRef<any>(),
    j2 = useRef<any>(),
    j3 = useRef<any>(),
    card = useRef<any>();

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials }: any = useGLTF(cardGLB);
  const cardTexture = useTexture('/textures/card_texture.png?v=7');
  const strapTexture = useTexture(strapTexturePath);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.1, 0, 0),
    new THREE.Vector3(0.2, 0, 0),
    new THREE.Vector3(0.3, 0, 0)
  ]));

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  // Joints for the "rope" effect
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      // End the strap exactly at the visual card top in world space.
      // Visual card top = body_center + rotate([0, 0.575, 0], card_rotation)
      // 0.575 = groupPos.y(-1.45) + groupScale(1.8) × planeHalfH(1.125) = 0.575
      const cardBodyTrans = card.current.translation();
      const cardQuat = card.current.rotation();
      const visualTopLocal = new THREE.Vector3(0, 0.575, 0).applyQuaternion(
        new THREE.Quaternion(cardQuat.x, cardQuat.y, cardQuat.z, cardQuat.w)
      );
      curve.points[0].set(
        cardBodyTrans.x + visualTopLocal.x,
        cardBodyTrans.y + visualTopLocal.y,
        cardBodyTrans.z + visualTopLocal.z
      );
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = 'chordal';
  strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping;

  // PlaneGeometry has native 0→1 UVs — use flipY=true (default) so portrait is right-side up.
  cardTexture.flipY = true;
  cardTexture.wrapS = cardTexture.wrapT = THREE.ClampToEdgeWrapping;
  cardTexture.repeat.set(1, 1);
  cardTexture.offset.set(0, 0);
  cardTexture.needsUpdate = true;

  return (
    <>
      <group position={[-0.5, 6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={1.8}
            position={[0, -1.45, -0.05]}  
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Front face — PlaneGeometry faces +Z by default, no rotation needed */}
            <mesh position={[0, 0, 0.006]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshStandardMaterial
                map={cardTexture}
                emissiveMap={cardTexture}
                emissive="white"
                emissiveIntensity={0.9}
                roughness={0.2}
                metalness={0.0}
                side={THREE.FrontSide}
              />
            </mesh>
            {/* Back face — rotated 180° on Y to face the other direction */}
            <mesh position={[0, 0, -0.006]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshStandardMaterial
                map={cardTexture}
                emissiveMap={cardTexture}
                emissive="white"
                emissiveIntensity={0.9}
                roughness={0.2}
                metalness={0.0}
                side={THREE.FrontSide}
              />
            </mesh>
            {/* Keep GLB metal parts (clip + clamp) */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#cccccc"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={strapTexture}
          repeat={[3, 1]}
          lineWidth={2}
        />
      </mesh>
    </>
  );
}
