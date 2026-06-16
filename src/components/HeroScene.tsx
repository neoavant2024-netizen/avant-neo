"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import HeroHeadline from "@/components/HeroHeadline";
import { site } from "@/lib/site";

// ヒーロー → フィロソフィのクロス pin シーン。
// スクロールに合わせて Hero がフェードアウトし、入れ替わりに
// 「AIという新たな知性を業務プロセスに実装する」理念が画面内に現れる。
// CSS scroll-driven animations 主体（非対応/モバイル/reduced は通常表示）。
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

        {/* 重ねるテキストレイヤー */}
        <div className="scene-stack relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          {/* レイヤーA：Hero（スクロールでフェードアウト） */}
          <div
            className="scene-cel scrub scrub-out flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 2% cover 24%",
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

          {/* レイヤーB：Philosophy（スクロールで出現） */}
          <div
            className="scene-cel scrub scrub-in flex flex-col items-center text-center"
            style={
              {
                animationTimeline: "--hero",
                animationRange: "cover 30% cover 52%",
              } as CSSProperties
            }
          >
            <span className="eyebrow">PHILOSOPHY</span>
            <p className="mt-10 text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-[1.5] tracking-tight">
              AIという新たな知性を
              <br />
              <span className="text-gradient-sweep glow-gradient">
                業務プロセス
              </span>
              に実装する。
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.95] text-[var(--color-fg-muted)] sm:text-xl">
              私たちは机上の空論ではなく、自ら市場で得た
              <span className="font-semibold text-[var(--color-fg)]">実践知</span>
              から、実効性のある戦略をデザインします。
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
