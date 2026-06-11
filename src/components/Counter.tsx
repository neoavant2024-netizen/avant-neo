"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// ビューポート進入時に 0 → value までカウントアップする数値表示。
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  group = true,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  group?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {group ? n.toLocaleString() : n}
      {suffix}
    </span>
  );
}
