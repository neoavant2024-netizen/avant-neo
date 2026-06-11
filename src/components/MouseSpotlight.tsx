"use client";

import { useEffect, useRef } from "react";

// カーソルに追従する光のスポットライト。最前面に screen 合成で重ね、
// 触れている場所がふわっと明るくなる演出。タッチ端末では無効。
export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] opacity-0 transition-opacity duration-500 mix-blend-screen"
      style={{
        background:
          "radial-gradient(260px circle at var(--mx, -200px) var(--my, -200px), color-mix(in srgb, var(--color-cyan) 16%, transparent), color-mix(in srgb, var(--color-violet) 8%, transparent) 40%, transparent 72%)",
      }}
    />
  );
}
