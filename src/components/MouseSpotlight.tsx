"use client";

import { useEffect, useRef } from "react";

// カーソルに追随して弾けるパーティクル演出（Google Antigravity 風）。
// マウスを動かすとカラフルな小片が花火/紙吹雪のように散り、
// 重力で落ちながらフェードアウトする。
// 軽量化方針: mix-blend / shadowBlur は使わず、canvas 内の加算合成(lighter)と
// 2枚重ねで発光感を出す。タッチ端末・低モーション設定では無効。
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
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // 解像度は最大1.5倍までに抑える（塗り面積=負荷を削減）
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const particles: Particle[] = [];
    const MAX = 220; // 上限（負荷の安全弁）

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let primed = false; // 初回 move まではスポーンしない

    const spawn = (x: number, y: number, power: number) => {
      // 動きの速さに応じて粒子数を増やす（速く動かすほど派手に弾ける）
      const count = Math.min(8, 2 + Math.round(power * 0.14));
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
          decay: Math.random() * 0.014 + 0.014,
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
    let running = true;

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length) {
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

          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          // 外側の淡いグロー（shadowBlur の代替・安価）
          ctx.globalAlpha = alpha * 0.35;
          ctx.fillStyle = p.color;
          ctx.fillRect(-s, -s, s * 2, s * 2.4);
          // 内側の明るいコア
          ctx.globalAlpha = alpha;
          ctx.fillRect(-s / 2, -s / 2, s, s * 1.8);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        ctx.restore();
      }
    };

    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };

    // バックグラウンドタブでは停止（無駄な描画を止める）
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40]"
    />
  );
}
