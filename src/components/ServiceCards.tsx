import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";

function ServiceIcon({ id, className }: { id: number; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === 0) {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 10.5h4v3h-4z" />
        <path d="M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
      </svg>
    );
  }
  if (id === 1) {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="6" cy="12" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8.1 11l7.8-3.8M8.1 13l7.8 3.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M10 13l-1.6 1.6L10 16.2M14 13l1.6 1.6L14 16.2" />
    </svg>
  );
}

// scrub=true のとき、各カードは Reveal ではなく scrub クラスで
// 親シーン（timeline）のスクロール進行に同期して順に出現する。
export default function ServiceCards({
  scrub = false,
  timeline,
}: {
  scrub?: boolean;
  timeline?: string;
}) {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {services.map((s, i) => {
        const card = (
          <Link
            href={`/services#${s.id}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_16%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-surface)_55%,transparent)] p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--color-cyan)_55%,transparent)] hover:shadow-[0_0_50px_-12px_color-mix(in_srgb,var(--color-violet)_60%,transparent)]"
          >
            {/* 上辺のネオンライン（ホバーで伸びる） */}
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)] transition-transform duration-500 group-hover:scale-x-100" />

            {/* 背景の大きな番号（スクロールで上下ドリフト） */}
            <span className="scroll-num pointer-events-none absolute right-5 top-3 font-mono text-6xl font-bold text-[color-mix(in_srgb,var(--color-fg-muted)_10%,transparent)]">
              0{i + 1}
            </span>

            {/* ネオンアイコン */}
            <span className="relative grid h-14 w-14 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_8%,transparent)] text-[var(--color-cyan)] shadow-[0_0_24px_-8px_var(--color-cyan)] transition-transform duration-500 group-hover:scale-110">
              <ServiceIcon id={i} className="h-7 w-7" />
            </span>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              {s.subtitle}
            </p>
            <h3 className="mt-2 text-lg font-bold leading-snug">{s.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-fg-muted)]">
              {s.body}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {s.points.map((pt) => (
                <li
                  key={pt}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] text-[var(--color-fg-muted)]"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-cyan)]">
              詳しく見る
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        );

        if (scrub) {
          const start = 16 + i * 14;
          return (
            <div
              key={s.id}
              className="scrub scrub-in h-full"
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
          <Reveal key={s.id} delay={i * 0.15} y={52} className="pop">
            {card}
          </Reveal>
        );
      })}
    </div>
  );
}
