import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import { pillars } from "@/lib/site";

// 各軸を表すラインアイコン
function PillarIcon({ id, className }: { id: number; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === 0) {
    // 生成AI / チップ
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 10.5h4v3h-4z" />
        <path d="M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
      </svg>
    );
  }
  if (id === 1) {
    // SNS / シェアノード
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="6" cy="12" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8.1 11l7.8-3.8M8.1 13l7.8 3.8" />
      </svg>
    );
  }
  // Web / ウィンドウ＋コード
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M10 13l-1.6 1.6L10 16.2M14 13l1.6 1.6L14 16.2" />
    </svg>
  );
}

// scrub=true のとき、各カードは Reveal ではなく scrub クラスで
// 親シーン（timeline）のスクロール進行に同期して 1・2・3 と順に出現する。
export default function InfographicPillars({
  scrub = false,
  timeline,
}: {
  scrub?: boolean;
  timeline?: string;
}) {
  return (
    <div className="relative mt-16">
      {/* カードを結ぶネオンの接続線（PC のみ・スクロールで左→右に伸びる） */}
      <div className="scroll-line pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-cyan)_55%,transparent)] to-transparent md:block" />

      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {pillars.map((p, i) => {
          const card = (
            <div className="group relative flex h-full flex-col items-center rounded-[1.6rem] border border-[color-mix(in_srgb,var(--color-cyan)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-surface)_55%,transparent)] px-7 py-9 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--color-cyan)_55%,transparent)] hover:shadow-[0_0_50px_-12px_color-mix(in_srgb,var(--color-violet)_60%,transparent)]">
              {/* ネオンの番号リング */}
              <div className="relative grid h-24 w-24 place-items-center">
                <svg
                  viewBox="0 0 100 100"
                  className="spin-slow scroll-spin absolute inset-0 h-full w-full text-[var(--color-cyan)]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="5 11"
                    opacity="0.7"
                  />
                </svg>
                <svg
                  viewBox="0 0 100 100"
                  className="spin-slow-rev scroll-spin-rev absolute inset-0 h-full w-full text-[var(--color-violet)]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 16"
                  />
                </svg>
                <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-cyan)_22%,transparent),transparent_70%)]" />
                <span className="text-gradient-sweep glow-gradient relative font-mono text-3xl font-bold">
                  {p.no}
                </span>
              </div>

              {/* アイコン */}
              <PillarIcon
                id={i}
                className="mt-7 h-9 w-9 text-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-110"
              />

              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
                {p.titleEn}
              </p>
              <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-fg-muted)]">
                {p.desc}
              </p>

              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          );

          if (scrub) {
            const start = 16 + i * 14;
            return (
              <div
                key={p.no}
                className="scrub scrub-in"
                style={
                  {
                    animationTimeline: timeline,
                    animationRange: `cover ${start}% cover ${start + 16}%`,
                  } as CSSProperties
                }
              >
                {card}
              </div>
            );
          }

          return (
            <Reveal key={p.no} delay={i * 0.15} y={52} className="pop">
              {card}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
