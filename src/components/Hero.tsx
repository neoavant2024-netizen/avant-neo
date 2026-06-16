"use client";

import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import HeroHeadline from "@/components/HeroHeadline";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero-pin relative grid min-h-[100svh] place-items-center overflow-hidden">
      {/* 即時表示の宇宙背景（CSSフォールバック） */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet)_12%,transparent),transparent_60%)]" />

      {/* 宇宙ワープ背景（軽量 Canvas 2D・即描画） */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* 中央に視線を集めるビネット＋地へのなじませ */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-bg)_88%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] to-transparent" />
      {/* 文字裏の局所的な暗がり（明るいネビュラに溶けないように） */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-bg)_72%,transparent),transparent_72%)] blur-2xl" />

      {/* 中央配置コンテンツ（JS非依存・CSSで即時表示＋フェード） */}
      <div className="hero-pin-content relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
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

      {/* スクロールインジケータ */}
      <div
        className="hero-fade hero-pin-scroll absolute bottom-8 right-6 hidden flex-col items-center gap-2 sm:flex lg:right-10"
        style={{ animationDelay: "1.1s" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-muted)]">
          SCROLL
        </span>
        <span className="h-10 w-px overflow-hidden bg-[var(--color-border)]">
          <span className="scroll-dot block h-4 w-px bg-[var(--color-cyan)]" />
        </span>
      </div>
    </section>
  );
}
