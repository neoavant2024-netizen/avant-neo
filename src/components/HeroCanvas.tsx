"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DEPTH = 48; // トンネルの奥行き
const R_MIN = 1.2; // 中心の空洞（トンネルの内径）
const R_MAX = 11; // トンネル外径

// 宇宙空間のワープ・トンネル。星を円筒状に配置し、奥から手前へ高速で流す。
// 中心を空けることで「トンネルの中を突き進む」感覚を生む。
function WarpTunnel({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#22d3ee");
    const violet = new THREE.Color("#8b5cf6");
    const white = new THREE.Color("#eaf2ff");
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // 中心ほど疎、外周ほど密になるよう sqrt 分布
      const radius = R_MIN + Math.sqrt(Math.random()) * (R_MAX - R_MIN);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * DEPTH;

      const r = Math.random();
      tmp.copy(r < 0.5 ? cyan : r < 0.8 ? violet : white);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    const speed = 16 * delta; // ワープスピード
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speed; // 手前へ突き進む
      if (arr[i * 3 + 2] > 7) {
        const angle = Math.random() * Math.PI * 2;
        const radius = R_MIN + Math.sqrt(Math.random()) * (R_MAX - R_MIN);
        arr[i * 3] = Math.cos(angle) * radius;
        arr[i * 3 + 1] = Math.sin(angle) * radius;
        arr[i * 3 + 2] = -DEPTH;
      }
    }
    geo.attributes.position.needsUpdate = true;
    // トンネルの渦（スワール）
    if (ref.current) ref.current.rotation.z += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// マウスでわずかに視点を振り、奥行き（トンネルの奥）を覗き込む感覚を強める。
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const { pointer } = state;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -DEPTH);
  });
  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 80 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <CameraRig />
      <WarpTunnel />
    </Canvas>
  );
}
