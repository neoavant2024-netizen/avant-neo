"use client";

import { useEffect, useRef } from "react";

// 宇宙ワープのスターフィールドを「Canvas 2D」で実装（ライブラリ不要・即描画）。
// 中心から放射状に星が手前へ流れ、近づくほど速く・長い光跡になる＝ワープ感。
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#22d3ee", "#8b5cf6", "#eaf2ff"];
    const COUNT = 620;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let dpr = 1;
    let depth = 1000;

    type Star = { x: number; y: number; z: number; pz: number; c: string };
    const stars: Star[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const place = (s: Star, init: boolean) => {
      s.x = rnd(-w, w);
      s.y = rnd(-h, h);
      s.z = init ? rnd(1, depth) : depth;
      s.pz = s.z;
      s.c = colors[(Math.random() * colors.length) | 0];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      depth = Math.max(w, h);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
    };

    resize();
    for (let i = 0; i < COUNT; i++) {
      const s: Star = { x: 0, y: 0, z: 0, pz: 0, c: "" };
      place(s, true);
      stars.push(s);
    }

    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const K = 140; // 投影スケール
    const speed = 9;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const ox = mx * 50;
      const oy = my * 35;
      ctx.lineCap = "round";

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 1) {
          place(s, false);
          continue;
        }
        const sx = cx + ox + (s.x / s.z) * K;
        const sy = cy + oy + (s.y / s.z) * K;
        const px = cx + ox + (s.x / s.pz) * K;
        const py = cy + oy + (s.y / s.pz) * K;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;

        const t = 1 - s.z / depth; // 0(遠)〜1(近)
        ctx.globalAlpha = Math.min(1, t * 1.3);
        ctx.strokeStyle = s.c;
        ctx.lineWidth = Math.max(0.5, t * 2.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      // モーション抑制時は1フレームだけ静止描画
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
