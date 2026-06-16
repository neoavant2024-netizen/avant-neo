// ニューラルネットワーク風グラフィック（VISION セクション用）。
// 3 層のノードを全結合し、エッジにパルスを流し、ノードを明滅させる。
const X = [36, 110, 184];
const COLS = [
  [40, 75, 110],
  [25, 60, 95, 130],
  [45, 75, 105],
];
const NODE_COLOR = ["var(--color-cyan)", "var(--color-violet)", "var(--color-magenta)"];

export default function NeuralGraphic() {
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] =
    [];
  for (let l = 0; l < COLS.length - 1; l++) {
    COLS[l].forEach((y1, a) => {
      COLS[l + 1].forEach((y2, b) => {
        edges.push({ x1: X[l], y1, x2: X[l + 1], y2, key: `${l}-${a}-${b}` });
      });
    });
  }

  return (
    <svg
      viewBox="0 0 220 150"
      className="neural"
      fill="none"
      aria-hidden="true"
    >
      {edges.map((e, i) => (
        <line
          key={e.key}
          className="neural-edge"
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          style={{ animationDelay: `${(i % 8) * 0.18}s` }}
        />
      ))}
      {COLS.map((col, l) =>
        col.map((y, n) => (
          <circle
            key={`${l}-${n}`}
            className="neural-node"
            cx={X[l]}
            cy={y}
            r={l === 1 ? 3.4 : 4.2}
            fill={NODE_COLOR[l]}
            style={{ ["--d" as string]: `${(l * 4 + n) * 0.16}s` }}
          />
        ))
      )}
    </svg>
  );
}
