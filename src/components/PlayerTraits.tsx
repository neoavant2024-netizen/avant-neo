import Reveal from "@/components/Reveal";

// 「自ら市場に立つプレイヤー」であることを、テック／AI を想起させる
// 図形＋言葉で表現するトリオ。3 ノードをネオン線で結ぶ。
const traits = [
  {
    en: "FIELD-PROVEN",
    ja: "現場で実証する",
    desc: "自社事業の最前線で掴んだ一次情報。",
  },
  {
    en: "DATA-DRIVEN",
    ja: "データで検証する",
    desc: "勘ではなく数値で意思決定を磨く。",
  },
  {
    en: "AI-IMPLEMENTED",
    ja: "AIで仕組み化する",
    desc: "得た知見を再現性のある型に変える。",
  },
];

function TraitIcon({ id, className }: { id: number; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === 0) {
    // ターゲット（現場で的を射る）
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3" />
      </svg>
    );
  }
  if (id === 1) {
    // 折れ線グラフ（データで検証）
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M3.5 20h17" />
        <path d="M4.5 16l4-4.5 3.2 2.6 4-5.4 3.8 3.6" />
        <circle cx="8.5" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="15.7" cy="8.7" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  // チップ（AIで実装）
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10.5h4v3h-4z" />
      <path d="M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
    </svg>
  );
}

export default function PlayerTraits() {
  return (
    <div className="relative mt-16">
      {/* 3ノードを結ぶネオンの接続線（PC のみ・スクロールで伸びる） */}
      <div className="scroll-line pointer-events-none absolute left-[17%] right-[17%] top-10 hidden h-px bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-violet)] to-[var(--color-magenta)] opacity-70 md:block" />

      <div className="grid gap-10 sm:grid-cols-3">
        {traits.map((t, i) => (
          <Reveal key={t.en} delay={i * 0.15} y={46} className="pop">
            <div className="relative flex flex-col items-center text-center">
              <span className="relative grid h-20 w-20 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_8%,transparent)] text-[var(--color-cyan)] shadow-[0_0_30px_-10px_var(--color-cyan)]">
                <TraitIcon id={i} className="h-9 w-9" />
              </span>
              <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-[var(--color-fg-muted)]">
                {t.en}
              </p>
              <h3 className="mt-1.5 text-lg font-bold">{t.ja}</h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-7 text-[var(--color-fg-muted)]">
                {t.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
