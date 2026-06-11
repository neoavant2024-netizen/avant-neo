"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** 分割単位。日本語は "char" を推奨 */
  per?: "char" | "word";
  /** "load"=マウント時に再生 / "view"=ビューポート進入で再生 */
  trigger?: "load" | "view";
  delay?: number;
  stagger?: number;
  unitClassName?: string;
};

const NBSP = " ";

// 文字／単語を分割し、奥から回転しながらピントが合う3D出現演出。
// framer-motion を使わず CSS アニメ + IntersectionObserver で実装。
export default function SplitText({
  text,
  className,
  per = "char",
  trigger = "view",
  delay = 0,
  stagger = 0.035,
  unitClassName,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(trigger === "load");

  useEffect(() => {
    if (trigger === "load") {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const units = per === "char" ? Array.from(text) : text.split(" ");

  return (
    <span ref={ref} className={`split ${on ? "in" : ""} ${className ?? ""}`} aria-label={text}>
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden
          className={`split-unit ${unitClassName ?? ""}`}
          style={{ ["--d" as string]: `${delay + i * stagger}s` }}
        >
          {u === " " ? NBSP : u}
          {per === "word" && i < units.length - 1 ? NBSP : ""}
        </span>
      ))}
    </span>
  );
}
