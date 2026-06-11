// テキストグリッチ（シアン／マゼンタの残像が周期的にずれる）。
// CSS の ::before/::after が data-text を複製するため、子は素のテキストのみ。
export default function GlitchText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`glitch ${className ?? ""}`} data-text={text}>
      {text}
    </span>
  );
}
