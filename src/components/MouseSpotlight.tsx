"use client";

import { useEffect, useRef } from "react";

// カーソルに追随して弾けるパーティクル演出（Google Antigravity 風）。
// マウスを動かすとカラフルな小片が花火/紙吹雪のように散り、
// 重力で落ちながらフェードアウトする。最前面に screen 合成で発光させる。
// タッチ端末・低モーション設定では無効。
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0 → 1 で消滅
  decay: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
};

// 発光が映える明るめのテーマカラー（cyan / violet / magenta / blue / white）
const COLORS = [
  "#22d3ee",
  "#38bdf8",
  "#8b5cf6",
  "#a855f7",
  "#e879f9",
  "#f472b6",
  "#60a5fa",
  "#ffffff",
];

export default function MouseSpotlight() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const particles: Particle[] = [];
    const MAX = 460; // 上限（負荷の安全弁）

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let primed = false; // 初回 move まではスポーンしない

    const spawn = (x: number, y: number, power: number) => {
      // 動きの速さに応じて粒子数を増やす（速く動かすほど派手に弾ける）
      const count = Math.min(14, 2 + Math.round(power * 0.22));
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (2.2 + power * 0.05) + 0.4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6, // 少し上向きに散らす
          life: 1,
          decay: Math.random() * 0.012 + 0.012,
          size: Math.random() * 3 + 1.6,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (primed) {
        const dx = x - lastX;
        const dy = y - lastY;
        const power = Math.min(60, Math.hypot(dx, dy));
        if (power > 0.6) spawn(x, y, power);
      }
      lastX = x;
      lastY = y;
      primed = true;
    };

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        // 物理: 空気抵抗 + 重力
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        const alpha = p.life * p.life; // 終わりに向けて急速にフェード
        const s = p.size * (0.4 + p.life * 0.6);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        // 小さな破片（紙吹雪片）
        ctx.fillRect(-s / 2, -s / 2, s, s * 1.8);
        ctx.restore();
      }

      ctx.restore();
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] mix-blend-screen"
    />
  );
}
