// ヒーロー見出し。JS 非依存で初期 HTML に全文を出力し、CSS で行ごとにフェードイン。
// 強調語はグラデ＋発光脈動（光沢スイープ）。
export default function HeroHeadline({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span
        className="hero-line block whitespace-normal sm:whitespace-nowrap"
        style={{ animationDelay: "0.05s" }}
      >
        <span className="text-gradient-sweep glow-pulse">テクノロジー</span>
        <span className="text-emboss">の力で、</span>
      </span>
      <span
        className="hero-line block whitespace-normal sm:whitespace-nowrap"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="text-emboss">ビジネスの可能性を</span>
      </span>
      <span
        className="hero-line mt-2 block whitespace-normal sm:whitespace-nowrap"
        style={{ animationDelay: "0.38s" }}
      >
        <span className="text-gradient-sweep glow-pulse">再定義する。</span>
      </span>
    </span>
  );
}
