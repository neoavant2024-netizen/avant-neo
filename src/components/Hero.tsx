"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import HeroHeadline from "@/components/HeroHeadline";
import { site } from "@/lib/site";

// WebGL は SSR 不可のためクライアントのみで遅延ロード
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  // テキスト・CSS背景を先に描画してから、重いWebGLをアイドル時に読み込む
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const t = w.requestIdleCallback
      ? w.requestIdleCallback(() => setShowCanvas(true))
      : window.setTimeout(() => setShowCanvas(true), 600);
    return () => clearTimeout(t as number);
  }, []);

  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden">
      {/* 即時表示の宇宙背景（CSSフォールバック） */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet)_12%,transparent),transparent_60%)]" />

      {/* 宇宙ワープ背景（WebGL：遅延ロード＋フェードイン） */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showCanvas ? "opacity-100" : "opacity-0"
        }`}
      >
        {showCanvas && <HeroCanvas />}
      </div>
      {/* 中央に視線を集めるビネット＋地へのなじませ */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-bg)_88%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] to-transparent" />
      {/* 文字裏の局所的な暗がり（明るいネビュラに溶けないように） */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-bg)_72%,transparent),transparent_72%)] blur-2xl" />

      {/* 中央配置コンテンツ */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="eyebrow mb-8"
        >
          TECHNOLOGY · INNOVATION
        </motion.p>

        <motion.h1
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="whitespace-nowrap text-[clamp(2rem,5.6vw,4.4rem)] font-bold leading-[1.32] tracking-tight"
        >
          <HeroHeadline />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease }}
          className="mx-auto mt-9 max-w-2xl text-[15px] leading-8 text-[var(--color-fg-muted)] sm:text-base"
        >
          {site.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.55, ease }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="rounded-full bg-[var(--color-fg)] px-7 py-3.5 text-sm font-semibold text-[#04060f] transition-shadow hover:shadow-[0_0_40px_-8px_var(--color-cyan)]"
          >
            サービスを見る
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-border)] px-7 py-3.5 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
          >
            お問合せ
          </Link>
        </motion.div>
      </div>

      {/* スクロールインジケータ（ボタンと重ならないよう右下へ） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-2 sm:flex lg:right-10"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)]">
          SCROLL
        </span>
        <span className="h-10 w-px overflow-hidden bg-[var(--color-border)]">
          <motion.span
            animate={{ y: [-40, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-4 w-px bg-[var(--color-cyan)]"
          />
        </span>
      </motion.div>
    </section>
  );
}
