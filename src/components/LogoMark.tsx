// AVANT のロゴマーク。軌道リング＋ラインで描いた「A」＋頂点ノードのネオン表現。
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={{
        filter:
          "drop-shadow(0 0 5px color-mix(in srgb, var(--color-cyan) 55%, transparent))",
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="avantGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* 軌道リング */}
      <circle
        cx="16"
        cy="16"
        r="14.5"
        fill="none"
        stroke="color-mix(in srgb, var(--color-cyan) 28%, transparent)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* ラインで描いた A */}
      <g
        fill="none"
        stroke="url(#avantGrad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 25 L16 7 L25 25" />
        <path d="M11 18.5 H21" />
      </g>

      {/* 頂点ノード */}
      <circle cx="16" cy="7" r="1.8" fill="#22d3ee" />
    </svg>
  );
}
