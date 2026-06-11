"use client";

import { motion } from "motion/react";

// App Router の template はルート遷移ごとに再マウントされる。
// これを利用してページ遷移時の入場アニメーション（blur + fade-up）を付与する。
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
