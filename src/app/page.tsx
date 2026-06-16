import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import Parallax from "@/components/Parallax";
import SplitText from "@/components/SplitText";
import PlayerTraits from "@/components/PlayerTraits";
import InfographicPillars from "@/components/InfographicPillars";
import ServiceCards from "@/components/ServiceCards";
import { news, site } from "@/lib/site";

const stats = [
  { value: 1999, label: "創業", suffix: "年", group: false },
  { value: 3, label: "事業領域", suffix: " Fields", group: true },
  { value: 100, label: "実践への還元", suffix: "%", group: true },
];

const keywords = [
  "Generative AI",
  "DX",
  "SNS Marketing",
  "Influencer",
  "Web Production",
  "Live Commerce",
  "EC",
  "Branding",
  "Data Driven",
];

export default function Home() {
  return (
    <>
      {/* ===== Hero → Philosophy → 理念（pin で 3 段クロス） ===== */}
      <HeroScene />

      {/* ===== Keyword Marquee（Hero を抜けて横に流れる） ===== */}
      <div className="relative py-10">
        <Marquee items={keywords} duration={36} />
      </div>

      {/* ===== 理念：利他利己 ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal className="pop" y={44}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-surface)_45%,transparent)] px-8 py-9 backdrop-blur-md">
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-cyan)]">
                理念 / 利他利己
              </p>
              <p className="mt-5 text-[clamp(1.3rem,2.6vw,1.8rem)] font-bold leading-[1.6]">
                顧客や相手に利益を与えることで、
                <br />
                <span className="text-gradient-sweep glow-gradient">
                  自らも利益を得ていく
                </span>
                。
              </p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.95] text-[var(--color-fg-muted)] sm:text-base">
                「利他」と「利己」は対立しない。相手の成功を第一に考え抜くことが、めぐりめぐって自社の成長につながる——その信念を、私たちは事業の根幹に置いています。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Approach（3つの軸）順次出現・戻っても維持 ===== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="eyebrow">APPROACH</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-7 max-w-2xl text-[clamp(2rem,4.4vw,3.2rem)] font-bold tracking-tight">
              3つの軸で、<span className="text-gradient-sweep">経営</span>を前へ。
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-[1.9] text-[var(--color-fg-muted)] sm:text-xl">
              テクノロジー・マーケティング・実践知見。
              3つの領域を掛け合わせ、貴社の経営課題に最適なアプローチを設計します。
            </p>
          </Reveal>
          <InfographicPillars />
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <Parallax
          speed={0.4}
          className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_18%,transparent),transparent_70%)] blur-2xl"
        >
          <span />
        </Parallax>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12} y={44} className="text-center pop">
                <div className="text-gradient-sweep glow-gradient text-[clamp(3rem,6.5vw,4.8rem)] font-bold leading-none tracking-tight">
                  <Counter value={s.value} suffix={s.suffix} group={s.group} />
                </div>
                <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who We Are（プレイヤー：文言＋テック図形） ===== */}
      <section className="relative overflow-hidden py-32 sm:py-44">
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="eyebrow">WHO WE ARE</span>
          </Reveal>
          <h2 className="mt-9 text-[clamp(1.7rem,4.4vw,3rem)] font-bold leading-[1.4] tracking-tight">
            <span className="block whitespace-nowrap">
              <SplitText text="私たちは、自ら市場に立つ" stagger={0.025} />
            </span>
            <span className="block whitespace-nowrap">
              <SplitText
                text="プレイヤーである。"
                delay={0.25}
                stagger={0.04}
                className="glow-pulse"
                unitClassName="text-gradient-sweep"
              />
            </span>
          </h2>
          <Reveal delay={0.18} y={20}>
            <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold leading-[1.9] text-[var(--color-fg)] sm:text-xl">
              机上の理論ではなく、現場で確かめた事実だけを、戦略に変える。
            </p>
          </Reveal>
          <Reveal delay={0.26} y={20}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.95] text-[var(--color-fg-muted)]">
              評論家ではない。自らリスクを取り、事業を張る当事者だからこそ届けられる「生きた知見」があります。成功も失敗も、すべては市場で得た一次情報です。
            </p>
          </Reveal>
          <PlayerTraits />
        </div>
      </section>

      {/* ===== Services（提供するサービス）順次出現・戻っても維持 ===== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">SERVICES</span>
              <h2 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-tight">
                提供するサービス
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-cyan)]"
              >
                すべて見る
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <ServiceCards />
        </div>
      </section>

      {/* ===== News preview ===== */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">NEWS</span>
              <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold tracking-tight">
                お知らせ
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-cyan)]"
              >
                一覧へ
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <ul className="mt-12">
            {news.slice(0, 3).map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group flex flex-col gap-2 border-t border-[var(--color-border)] py-6 transition-colors last:border-b hover:bg-[color-mix(in_srgb,var(--color-surface)_45%,transparent)] sm:flex-row sm:items-center sm:gap-8 sm:px-4"
                >
                  <time className="font-mono text-sm text-[var(--color-fg-muted)] sm:w-32">
                    {item.date}
                  </time>
                  <span className="w-fit rounded-full border border-[var(--color-border)] px-3 py-0.5 text-xs text-[var(--color-fg-muted)]">
                    {item.category}
                  </span>
                  <span className="flex-1 transition-colors group-hover:text-[var(--color-cyan)]">
                    {item.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-36 sm:py-44">
        <Parallax
          speed={0.3}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_22%,transparent),transparent_70%)] blur-2xl"
        >
          <span />
        </Parallax>
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal className="pop" y={44}>
            <h2 className="text-[clamp(2.1rem,5.4vw,3.8rem)] font-bold leading-tight tracking-tight">
              次の一手を、
              <span className="text-gradient-sweep glow-gradient">共に。</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-lg text-[var(--color-fg-muted)]">
              生成AI・マーケティング・WEB戦略のご相談はお気軽に。
              貴社の課題に合わせた最適なアプローチをご提案します。
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--color-fg)] px-8 py-4 text-sm font-semibold text-[#04060f] transition-shadow hover:shadow-[0_0_40px_-8px_var(--color-cyan)]"
              >
                お問合せはこちら
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-[var(--color-border)] px-8 py-4 font-mono text-sm transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
