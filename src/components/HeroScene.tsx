"use client";

import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import HeroHeadline from "@/components/HeroHeadline";
import NeuralGraphic from "@/components/NeuralGraphic";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

// ヒーロー〜ビジョンの 3 セクション。
// スクロール量に同期させる方式（scrub）はやめ、各セクションが画面に入ったら
// 時間ベースで要素が順番にゆっくり自動表示される方式に。
// 一度表示された要素は残る（戻っても・進んでも消えない）。

// AI コア（中央の発光体＋3D オービット）
function AICore() {
  return (
    <div className="ai-stage">
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
    <>
      {/* ① Hero（読み込みで自動表示） */}
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden">
        {/* 宇宙ワープ背景 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet)_12%,transparent),transparent_60%)]" />
          <div className="absolute inset-0">
            <HeroCanvas />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-bg)_88%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-bg)_72%,transparent),transparent_72%)] blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
          <h1 className="hero-float text-[clamp(1.7rem,8vw,6.6rem)] font-bold leading-[1.22] tracking-tight">
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

        {/* スクロールインジケータ */}
        <div className="absolute bottom-8 right-6 hidden sm:block lg:right-10">
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
      </section>

      {/* ② PHILOSOPHY（画面に入ったら順番にゆっくり自動表示・残る） */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal delay={0} y={30}>
            <div className="mb-10">
              <AICore />
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <span className="eyebrow">PHILOSOPHY</span>
          </Reveal>
          <Reveal delay={0.75} y={28}>
            <h2 className="mt-8 text-[clamp(1.7rem,5.6vw,4rem)] font-bold leading-[1.4] tracking-tight">
              AIという新たな知性を
              <br />
              <span className="text-gradient-sweep glow-gradient">
                業務プロセス
              </span>
              に実装する。
            </h2>
          </Reveal>
          <Reveal delay={1.15} y={24}>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-[2.1] text-[var(--color-fg-muted)] sm:text-lg">
              机上の空論ではなく、市場で得た実践知から戦略を描きます。
              <br />
              生成AI活用・SNSマーケ・WEB制作／DX化まで一気通貫で支援。
              <br />
              経営課題に応じ、技術を「使える形」で現場に実装します。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ③ VISION（画面に入ったら順番にゆっくり自動表示・残る） */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal delay={0} y={30}>
            <div className="mb-10">
              <NeuralGraphic />
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <span className="eyebrow">VISION</span>
          </Reveal>
          <Reveal delay={0.75} y={28}>
            <h2 className="mt-8 text-[clamp(1.7rem,5.6vw,4rem)] font-bold leading-[1.4] tracking-tight">
              人と事業を、
              <br />
              <span className="text-gradient-sweep glow-gradient">
                テクノロジーで前へ。
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1.15} y={24}>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-[2.1] text-[var(--color-fg-muted)] sm:text-lg">
              AIは目的ではなく、人の可能性を引き出す手段です。
              <br />
              技術と実践知を掛け合わせ、次の一手を共に描きます。
              <br />
              変化の速い時代に、確かな成果への道筋をつくります。
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
