"use client";

import { useEffect, useState } from "react";

type Seg = { t: string; em?: boolean; brAfter?: boolean };

// セグメント定義（em=強調語、brAfter=この後で改行）
const segs: Seg[] = [
  { t: "テクノロジー", em: true },
  { t: "の力で、", brAfter: true },
  { t: "ビジネスの可能性を", brAfter: true },
  { t: "再定義する。", em: true },
];

const full = segs.map((s) => s.t).join("");
const total = full.length;

// タイプライターで打鍵 → 完了後に強調語が光沢スイープ（グラデ＋発光脈動）する見出し。
export default function HeroHeadline({ className }: { className?: string }) {
  const [n, setN] = useState(0);
  const done = n >= total;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(total);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < total) timer = setTimeout(tick, 90);
    }, 350);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, []);

  let offset = 0;
  return (
    <span className={className} aria-label={full}>
      {segs.map((s, idx) => {
        const startIdx = offset;
        offset += s.t.length;
        const shown = Math.max(0, Math.min(n - startIdx, s.t.length));
        const text = s.t.slice(0, shown);
        // 打鍵中は白文字。全文打ち終えたら強調語を光沢スイープに切替。
        const cls = s.em && done ? "text-gradient-sweep glow-pulse" : "text-emboss";
        const lineDone = shown >= s.t.length;
        return (
          <span key={idx}>
            <span className={cls}>{text}</span>
            {s.brAfter && lineDone && <br />}
          </span>
        );
      })}
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}
