import Reveal from "./Reveal";
import SplitText from "./SplitText";

// 下層ページ共通のヒーロー帯。
export default function PageHeader({
  eyebrow,
  title,
  lead,
  largeLead = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  largeLead?: boolean;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_28%,transparent),transparent_70%)] blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-[var(--color-cyan)]">
            <span className="inline-block h-px w-8 bg-[var(--color-cyan)]" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-tight">
          <SplitText text={title} per="char" delay={0.1} stagger={0.03} />
        </h1>
        {lead && (
          <Reveal delay={0.12}>
            <p
              className={
                largeLead
                  ? "mt-7 max-w-3xl text-lg leading-9 text-[var(--color-fg-muted)] sm:text-xl"
                  : "mt-6 max-w-2xl text-base leading-8 text-[var(--color-fg-muted)]"
              }
            >
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
