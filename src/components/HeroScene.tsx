"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import HeroHeadline from "@/components/HeroHeadline";
import NeuralGraphic from "@/components/NeuralGraphic";
import { site } from "@/lib/site";

// ヒーローを画面に固定（pin）し、スクロールに合わせて
// その場で 3 段が次々に切り替わるシーン。
//   ① Hero（キャッチ＋説明＋ボタン／テキストはダイナミックに登場）
//   ② PHILOSOPHY（理念＋AI 立体オービット）
//   ③ VISION（ビジョン＋ニューラルネット）
// CSS scroll-driven animations 主体（非対応/モバイル/reduced は通常表示）。

// AI コア（中央の発光体＋3D オービット）
function AICore() {
  return (
    <div className="ai-stage mb-9">
      <div className="ai-core">
        <div className="ai-core-orbit o1">
          <span className="ai-node" />
        </div>
        <div className="ai-core-orbit o2">
          <span className="ai-node" />
        </div>
        <div className="ai-core-orbit o3">
          <span className="ai-node" />
        </div>
        <div className="ai-core-core" />
      </div>
    </div>
  );
}

export default function HeroScene() {
  return (
    <section
      className="scene scene--hero"
      style={{ viewTimelineName: "--hero" } as CSSProperties}
    >
      <div className="scene-pin">
        {/* 背景（共通・常時表示） */}
        <div className="scene-bg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet)_12%,transparent),transparent_60%)]" />
          <div className="absolute inset-0">
            <HeroCanvas />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-bg)_88%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-bg)_72%,transparent),transparent_72%)] blur-2xl" />
        </div>

        {/* 重ねる 3 ステップ（その場でクロス切替） */}
        <div className="scene-stack relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          {/* ① Hero（テキストはダイナミックに登場 / スクロールでフェードアウト） */}
          <div
            className="scene-cel scrub scrub-out flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 2% cover 15%",
              } as CSSProperties
            }
          >
            <h1 className="hero-float whitespace-nowrap text-[clamp(2.4rem,6.6vw,5.6rem)] font-bold leading-[1.28] tracking-tight">
              <HeroHeadline />
            </h1>
            <p
              className="hero-fade mx-auto mt-10 max-w-2xl text-base leading-8 text-[var(--color-fg-muted)] sm:text-lg"
              style={{ animationDelay: "0.7s" }}
            >
              {site.description}
            </p>
            <div
              className="hero-fade mt-12 flex flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "0.9s" }}
            >
              <Link
                href="/services"
                className="rounded-full bg-[var(--color-fg)] px-8 py-4 text-sm font-semibold text-[#04060f] transition-shadow hover:shadow-[0_0_40px_-8px_var(--color-cyan)]"
              >
                サービスを見る
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[var(--color-border)] px-8 py-4 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              >
                お問合せ
              </Link>
            </div>
          </div>

          {/* ② PHILOSOPHY（AI 立体オービット＋理念） */}
          <div
            className="scene-cel scrub scrub-step flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 19% cover 50%",
              } as CSSProperties
            }
          >
            <AICore />
            <span className="eyebrow">PHILOSOPHY</span>
            <p className="mt-8 text-[clamp(2rem,4.8vw,3.4rem)] font-bold leading-[1.45] tracking-tight">
              AIという新たな知性を
              <br />
              <span className="text-gradient-sweep glow-gradient">
                業務プロセス
              </span>
              に実装する。
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.95] text-[var(--color-fg-muted)] sm:text-lg">
              私たちは机上の空論ではなく、自ら市場で得た
              <span className="font-semibold text-[var(--color-fg)]">実践知</span>
              から、実効性のある戦略をデザインします。
            </p>
          </div>

          {/* ③ VISION（ニューラルネット＋ビジョン） */}
          <div
            className="scene-cel scrub scrub-in flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 57% cover 73%",
              } as CSSProperties
            }
          >
            <div className="mb-8">
              <NeuralGraphic />
            </div>
            <span className="eyebrow">VISION</span>
            <p className="mt-8 text-[clamp(2rem,4.8vw,3.4rem)] font-bold leading-[1.45] tracking-tight">
              人と事業を、
              <br />
              <span className="text-gradient-sweep glow-gradient">
                テクノロジーで前へ。
              </span>
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.95] text-[var(--color-fg-muted)] sm:text-lg">
              AIは目的ではなく、人の可能性を引き出す手段。
              技術と実践知を掛け合わせ、企業の「次の一手」を共に描きます。
            </p>
          </div>
        </div>

        {/* スクロールインジケータ（外側=スクロールで消す / 内側=登場フェード） */}
        <div className="hero-pin-scroll absolute bottom-8 right-6 hidden sm:block lg:right-10">
          <div
            className="hero-fade flex flex-col items-center gap-2"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)]">
              SCROLL
            </span>
            <span className="block h-10 w-px overflow-hidden bg-[var(--color-border)]">
              <span className="scroll-dot block h-4 w-px bg-[var(--color-cyan)]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
