"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Effect = "net" | "fog";

// Vanta.js によるセクション背景。ヒーロー以外で使用し R3F と棲み分ける。
export default function VantaBackground({
  effect = "net",
  className,
}: {
  effect?: Effect;
  className?: string;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const instRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let active = true;

    const init = async () => {
      const mod =
        effect === "fog"
          ? await import("vanta/dist/vanta.fog.min")
          : await import("vanta/dist/vanta.net.min");
      if (!active || !elRef.current || instRef.current) return;

      const common = {
        el: elRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
      };

      const options =
        effect === "fog"
          ? {
              ...common,
              highlightColor: 0x8b5cf6,
              midtoneColor: 0x22d3ee,
              lowlightColor: 0x0b0e1d,
              baseColor: 0x060814,
              blurFactor: 0.6,
              speed: 1.4,
              zoom: 0.8,
            }
          : {
              ...common,
              color: 0x22d3ee,
              backgroundColor: 0x060814,
              points: 9,
              maxDistance: 22,
              spacing: 17,
              showDots: true,
            };

      instRef.current = mod.default(options);
    };

    init();

    return () => {
      active = false;
      instRef.current?.destroy();
      instRef.current = null;
    };
  }, [effect]);

  return <div ref={elRef} className={className} aria-hidden />;
}
