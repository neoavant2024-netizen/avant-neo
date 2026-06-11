"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
};

// スクロールでビューポートに入った要素をフェード＋スライドインさせる共通ラッパー。
// framer-motion を使わず IntersectionObserver + CSS で実装（軽量）。
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVis(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVis(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error 動的タグの ref 型
      ref={ref}
      className={`reveal ${vis ? "in" : ""} ${className ?? ""}`}
      style={{
        transitionDelay: `${delay}s`,
        ["--reveal-y" as string]: `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}
