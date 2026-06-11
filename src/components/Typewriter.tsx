"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// ビューポート進入時に1文字ずつ打鍵するタイプライター演出。
export default function Typewriter({
  text,
  speed = 55,
  className,
  startDelay = 200,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      setDone(true);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [inView, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {shown}
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}
