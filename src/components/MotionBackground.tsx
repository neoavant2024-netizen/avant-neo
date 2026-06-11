import DeferredStars from "@/components/DeferredStars";

// 全ページ共通の動くモーション背景。
// ネビュラ＋浮遊グローオーブ＋tsParticles の星＋流れ星＋流れるグリッド。
// fixed で最背面に固定し、各セクションを半透明にすることで「1枚の連続背景」に見せる。

// ハイドレーション不一致を避けるため位置は固定配列で定義（乱数を使わない）
const orbs = [
  { top: "8%", left: "12%", c: "var(--color-violet)", s: "26vw", o: 0.22, d: "24s" },
  { top: "40%", left: "78%", c: "var(--color-cyan)", s: "22vw", o: 0.2, d: "30s" },
  { top: "68%", left: "20%", c: "var(--color-cyan)", s: "20vw", o: 0.18, d: "27s" },
  { top: "84%", left: "66%", c: "var(--color-magenta)", s: "24vw", o: 0.16, d: "33s" },
  { top: "92%", left: "38%", c: "var(--color-violet)", s: "22vw", o: 0.16, d: "29s" },
];

const dots = [
  { top: "12%", left: "8%", c: "var(--color-cyan)", d: "13s", s: 3 },
  { top: "22%", left: "82%", c: "var(--color-violet)", d: "17s", s: 2 },
  { top: "38%", left: "26%", c: "var(--color-cyan)", d: "15s", s: 2 },
  { top: "44%", left: "64%", c: "var(--color-magenta)", d: "19s", s: 3 },
  { top: "58%", left: "14%", c: "var(--color-violet)", d: "12s", s: 2 },
  { top: "63%", left: "90%", c: "var(--color-cyan)", d: "16s", s: 3 },
  { top: "72%", left: "44%", c: "var(--color-cyan)", d: "14s", s: 2 },
  { top: "80%", left: "72%", c: "var(--color-violet)", d: "18s", s: 3 },
];

// 流れ星（位置・角度・周期・遅延）
const shooters = [
  { top: "10%", left: "70%", rot: 18, dur: "8s", delay: "0s" },
  { top: "26%", left: "40%", rot: 22, dur: "11s", delay: "3.5s" },
  { top: "55%", left: "88%", rot: 16, dur: "9s", delay: "6s" },
  { top: "72%", left: "55%", rot: 24, dur: "13s", delay: "9s" },
];

export default function MotionBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      {/* 浮遊グローオーブ */}
      {orbs.map((o, i) => (
        <span
          key={i}
          className="glow-orb"
          style={{
            top: o.top,
            left: o.left,
            width: o.s,
            height: o.s,
            opacity: o.o,
            background: `radial-gradient(circle, ${o.c}, transparent 70%)`,
            // @ts-expect-error CSS変数
            "--d": o.d,
          }}
        />
      ))}

      {/* tsParticles の漂う星（アイドル時に遅延ロード） */}
      <DeferredStars className="absolute inset-0 opacity-70" />

      {/* 流れるグリッド */}
      <div className="bg-grid bg-grid-anim absolute inset-0 opacity-[0.12]" />

      {/* 微細な光点 */}
      {dots.map((p, i) => (
        <span
          key={i}
          className="float-dot"
          style={{
            top: p.top,
            left: p.left,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 10px ${p.c}`,
            // @ts-expect-error CSS変数
            "--d": p.d,
          }}
        />
      ))}

      {/* 流れ星 */}
      {shooters.map((s, i) => (
        <span
          key={i}
          className="shooting-wrap"
          style={{ top: s.top, left: s.left, transform: `rotate(${s.rot}deg)` }}
        >
          <span
            className="shooting-star"
            // @ts-expect-error CSS変数
            style={{ "--dur": s.dur, "--delay": s.delay }}
          />
        </span>
      ))}

      {/* 端をほんのり締めるだけの緩いビネット（ブロック感を出さない） */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_72%,color-mix(in_srgb,var(--color-bg)_78%,transparent)_100%)]" />
    </div>
  );
}
