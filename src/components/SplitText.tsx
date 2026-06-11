"use client";

import { motion } from "motion/react";

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

const ease = [0.16, 1, 0.3, 1] as const;
const NBSP = " ";

// 文字／単語を分割し、奥から回転しながらピントが合う（blur→鮮明）3D出現演出。
export default function SplitText({
  text,
  className,
  per = "char",
  trigger = "view",
  delay = 0,
  stagger = 0.035,
  unitClassName,
}: Props) {
  const units = per === "char" ? Array.from(text) : text.split(" ");

  const target = { opacity: 1, y: "0em", rotateX: 0, filter: "blur(0px)" };
  const animProps =
    trigger === "load"
      ? { animate: target }
      : { whileInView: target, viewport: { once: true, margin: "-60px" } };

  return (
    <span
      className={className}
      style={{ display: "inline-block", perspective: "800px" }}
      aria-label={text}
    >
      {units.map((u, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={unitClassName}
          style={{ display: "inline-block", transformOrigin: "50% 100%" }}
          initial={{ opacity: 0, y: "0.55em", rotateX: -78, filter: "blur(8px)" }}
          {...animProps}
          transition={{ delay: delay + i * stagger, duration: 0.85, ease }}
        >
          {u === " " ? NBSP : u}
          {per === "word" && i < units.length - 1 ? NBSP : ""}
        </motion.span>
      ))}
    </span>
  );
}
