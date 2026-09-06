"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Dynamic Warm Orange Neural Core Component inside Canvas
function SynapticSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerParticlesRef = useRef<THREE.Points>(null);

  // Generate Synaptic Nodes distributed on Fibonacci sphere
  const { nodePositions, lineGeometry, particlePositions } = useMemo(() => {
    const count = 75;
    const radius = 2.4;
    const nodes: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      nodes.push(new THREE.Vector3(x, y * radius, z));
    }

    // Connect nodes within proximity threshold
    const linePoints: THREE.Vector3[] = [];
    const maxDist = 1.35;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < maxDist) {
          linePoints.push(nodes[i]);
          linePoints.push(nodes[j]);
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);

    // Node points buffer for rendering glowing synaptic dots
    const nodeGeomArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      nodeGeomArray[i * 3] = nodes[i].x;
      nodeGeomArray[i * 3 + 1] = nodes[i].y;
      nodeGeomArray[i * 3 + 2] = nodes[i].z;
    }

    // Outer ambient warm particle field
    const particleCount = 280;
    const particleGeomArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(2 * Math.random() - 1);

      particleGeomArray[i * 3] = r * Math.sin(phiAngle) * Math.cos(theta);
      particleGeomArray[i * 3 + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
      particleGeomArray[i * 3 + 2] = r * Math.cos(phiAngle);
    }

    return {
      nodePositions: nodeGeomArray,
      lineGeometry: lineGeom,
      particlePositions: particleGeomArray
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow organic idle rotation
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.05;

    // Subtle parallax tilt from mouse
    const targetRotX = mouse.y * 0.4;
    const targetRotY = mouse.x * 0.6;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + state.clock.elapsedTime * 0.04, 0.03);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + state.clock.elapsedTime * 0.1, 0.03);

    // Core pulsing animation
    if (coreRef.current) {
      const scalePulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.06;
      coreRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      coreRef.current.rotation.y -= delta * 0.25;
    }

    // Ambient floating dust particles
    if (outerParticlesRef.current) {
      outerParticlesRef.current.rotation.y += delta * 0.03;
      outerParticlesRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Inner Pulsating Core in Warm Orange */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshStandardMaterial
          color="#FF6B00"
          wireframe
          transparent
          opacity={0.45}
          emissive="#FF6B00"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Deep Inner Amber Energy Glow Sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} />
      </mesh>

      {/* Interconnecting Synaptic Lines in Vibrant Orange */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#FF7A00"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Synaptic Glowing Nodes in Electric Orange */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color="#FF5722"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Outer Ambient Floating Particle Cloud in Warm Gold / Amber */}
      <points ref={outerParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#F59E0B"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function NeuralCore3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-orange-500/25 animate-pulse bg-orange-500/10" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2.0} color="#FF6B00" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#F59E0B" />
        <pointLight position={[0, 5, 0]} intensity={1.2} color="#FF9800" />

        <SynapticSphere mouse={mouse} />
      </Canvas>
    </div>
  );
}
