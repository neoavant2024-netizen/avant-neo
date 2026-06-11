"use client";

import { useEffect, useRef, useState } from "react";

// ビューポート進入時に 0 → value までカウントアップする数値表示。
// IntersectionObserver + requestAnimationFrame（framer-motion 不使用）。
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
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let raf = 0;
      let start = 0;
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / (duration * 1000), 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setN(Math.round(eased * value));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {group ? n.toLocaleString() : n}
      {suffix}
    </span>
  );
}
