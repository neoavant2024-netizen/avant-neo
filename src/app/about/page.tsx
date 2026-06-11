import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import VantaBackground from "@/components/VantaBackground";
import { site, banks, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "会社案内",
  description: `${site.name}の会社概要・企業理念。${site.established}設立。`,
};

const businesses = [
  "生成AI活用 研修・講習サービス",
  "SNS・WEBマーケティング運用支援",
  "インフルエンサーマーケティング運用支援",
  "ライブ配信プロダクション運営",
  "EC事業",
  "海外インバウンド・アウトバウンドマーケティング",
];

const profile: { label: string; value: string }[] = [
  { label: "社名", value: site.name },
  { label: "代表者", value: `代表取締役　${site.ceo}` },
  { label: "設立", value: site.established },
  { label: "資本金", value: site.capital },
  {
    label: "本社所在地",
    value: `〒${offices[0].zip}　${offices[0].address}`,
  },
  {
    label: "宇都宮拠点",
    value: `〒${offices[1].zip}　${offices[1].address}`,
  },
  { label: "取引金融機関", value: banks.join("／") },
  { label: "メール", value: site.email },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="知性を実装する会社。"
        lead="私たちは、AIという新たな知性を業務プロセスに実装し、マーケティング戦略を最適化するテクノロジー・イノベーション・カンパニーです。"
        largeLead
      />

      {/* Vision (Vanta FOG 背景) */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <VantaBackground
          effect="fog"
          className="pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-bg)_62%,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
          <Reveal>
            <span className="eyebrow">VISION</span>
          </Reveal>
          <Reveal delay={0.08} y={20}>
            <h2 className="mt-10 text-[clamp(1.55rem,3.3vw,2.5rem)] font-bold leading-[1.5] tracking-tight">
              <span className="sm:whitespace-nowrap">
                <span className="text-gradient-sweep glow-gradient">
                  テクノロジー
                </span>
                で経営OSをアップデートし、
              </span>
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap">
                <span className="text-gradient-sweep glow-gradient">
                  データとクリエイティブ
                </span>
                で顧客との絆をデザインする。
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16} y={20}>
            <p className="mt-10 max-w-3xl text-xl leading-[1.9] text-[var(--color-fg-muted)] sm:text-2xl">
              自らプレイヤーとして市場で得た
              <span className="font-semibold text-[var(--color-fg)]">実践知</span>
              を還元することで、机上の空論ではない、
              <span className="font-semibold text-[var(--color-fg)]">
                実効性のある戦略
              </span>
              を届けます。
            </p>
          </Reveal>
        </div>
      </section>

      {/* Profile table */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">
            会社概要
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="mt-12 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {profile.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8"
              >
                <dt className="font-mono text-sm text-[var(--color-fg-muted)]">
                  {row.label}
                </dt>
                <dd className="text-sm leading-7">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Business */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-cyan)]">
              BUSINESS
            </p>
            <h2 className="mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-tight">
              事業内容
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
            {businesses.map((b, i) => (
              <Reveal
                key={b}
                delay={(i % 2) * 0.08}
                className="flex items-center gap-4 bg-[var(--color-bg)] p-6 sm:p-8"
              >
                <span className="font-mono text-sm text-[var(--color-cyan)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{b}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
