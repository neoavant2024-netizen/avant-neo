// 無限ループで流れるマーキー帯（CSSアニメーション、依存なし）。
export default function Marquee({
  items,
  duration = 32,
  reverse = false,
  className,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  // -50% 移動でシームレスにループするため同一セットを2回描画
  const Row = () => (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 text-[clamp(1.4rem,3.4vw,2.6rem)] font-bold tracking-tight text-[var(--color-fg-muted)]">
            {t}
          </span>
          <span className="text-[var(--color-cyan)]">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-mask overflow-hidden ${className ?? ""}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className={`marquee-track ${reverse ? "is-reverse" : ""}`}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
