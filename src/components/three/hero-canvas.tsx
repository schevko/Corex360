"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   Corex360 hero — deliberately MINIMAL (Apple-calm): a single refined core
   (your business) ringed by two thin brass orbits (the 360° hint). One node
   drifts around. No dense wireframe, no crowding. Colors from CSS tokens.
   Lazy-loaded & client-only.
--------------------------------------------------------------------------- */

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function Core({ color, emissive }: { color: string; emissive: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
  });
  return (
    <Float speed={1} rotationIntensity={0.22} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.12}
          metalness={0.5}
          roughness={0.38}
        />
      </mesh>
      {/* soft halo */}
      <mesh scale={1.4}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color={emissive} transparent opacity={0.035} />
      </mesh>
    </Float>
  );
}

function Ring({
  radius,
  tilt,
  opacity,
  speed,
  node,
  ring,
}: {
  radius: number;
  tilt: [number, number, number];
  opacity: number;
  speed: number;
  node?: string;
  ring: string;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 10, 180]} />
        <meshBasicMaterial color={ring} transparent opacity={opacity} />
      </mesh>
      {node && (
        <group ref={g}>
          <mesh position={[radius, 0, 0]}>
            <sphereGeometry args={[0.055, 18, 18]} />
            <meshBasicMaterial color={node} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Particles({ color, count = 140 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.013}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reduced) return;
    camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.035;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const accent = useMemo(() => readToken("--accent", "#d2a86a"), []);
  const accent3 = useMemo(() => readToken("--accent-3", "#ead2a4"), []);
  const fg = useMemo(() => readToken("--foreground", "#f6f4ef"), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={26} color={accent3} />
      <pointLight position={[-5, -2, 1]} intensity={10} color={accent} />
      <group rotation={[0.18, 0, 0]}>
        <Core color={fg} emissive={accent} />
        <Ring radius={2.0} tilt={[1.3, 0.2, 0]} opacity={0.28} speed={0.18} ring={accent} node={accent3} />
        <Ring radius={2.7} tilt={[1.1, -0.4, 0.3]} opacity={0.16} speed={-0.12} ring={accent} />
        <Particles color={accent} />
      </group>
      <Rig reduced={reduced} />
    </Canvas>
  );
}
