"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import HeroHeadline from "@/components/HeroHeadline";
import { site } from "@/lib/site";

// ヒーローを画面に固定（pin）し、スクロールに合わせて
// その場で 3 段が次々に切り替わるシーン。
//   ① Hero（キャッチ＋説明＋ボタン）
//   ② PHILOSOPHY（理念＋AI 立体グラフィック）
//   ③ 理念 / 利他利己
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
        <div className="scene-stack relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          {/* ① Hero（スクロールでフェードアウト） */}
          <div
            className="scene-cel scrub scrub-out flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 2% cover 15%",
              } as CSSProperties
            }
          >
            <h1 className="hero-float whitespace-nowrap text-[clamp(2rem,5.6vw,4.4rem)] font-bold leading-[1.32] tracking-tight">
              <HeroHeadline />
            </h1>
            <p
              className="hero-fade mx-auto mt-9 max-w-2xl text-[15px] leading-8 text-[var(--color-fg-muted)] sm:text-base"
              style={{ animationDelay: "0.6s" }}
            >
              {site.description}
            </p>
            <div
              className="hero-fade mt-11 flex flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "0.78s" }}
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
            </div>
          </div>

          {/* ② PHILOSOPHY（出現→保持→退場・AI 立体グラフィック付き） */}
          <div
            className="scene-cel scrub scrub-step flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 19% cover 52%",
              } as CSSProperties
            }
          >
            <AICore />
            <span className="eyebrow">PHILOSOPHY</span>
            <p className="mt-8 text-[clamp(1.8rem,4.2vw,3rem)] font-bold leading-[1.5] tracking-tight">
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

          {/* ③ 理念 / 利他利己（出現して保持） */}
          <div
            className="scene-cel scrub scrub-in flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 57% cover 73%",
              } as CSSProperties
            }
          >
            <span className="eyebrow">PHILOSOPHY</span>
            <p className="mt-8 font-mono text-xs tracking-[0.25em] text-[var(--color-cyan)]">
              理念 / 利他利己
            </p>
            <p className="mt-5 text-[clamp(1.5rem,3.4vw,2.4rem)] font-bold leading-[1.55] tracking-tight">
              顧客や相手に利益を与えることで、
              <br />
              <span className="text-gradient-sweep glow-gradient">
                自らも利益を得ていく
              </span>
              。
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.95] text-[var(--color-fg-muted)] sm:text-base">
              「利他」と「利己」は対立しない。相手の成功を第一に考え抜くことが、めぐりめぐって自社の成長につながる——その信念を、私たちは事業の根幹に置いています。
            </p>
          </div>
        </div>

        {/* スクロールインジケータ（外側=スクロールで消す / 内側=登場フェード） */}
        <div className="hero-pin-scroll absolute bottom-8 right-6 hidden sm:block lg:right-10">
          <div
            className="hero-fade flex flex-col items-center gap-2"
            style={{ animationDelay: "1.1s" }}
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
