// ページ遷移ごとの入場アニメーション。
// framer-motion の initial opacity:0 は JS ロードまで画面を透明にしてしまうため、
// JS 非依存の CSS アニメーション（.page-enter）で実装する。
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
