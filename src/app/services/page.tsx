import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "サービス",
  description:
    "生成AI活用支援、SNS／インフルエンサーマーケティング、WEB制作・DX化支援。" +
    site.name + "が提供する3つのサービス領域。",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICES"
        title="事業を前に進める、3つのサービス。"
        lead="生成AIの実装からマーケティング、WEB戦略まで。自社運営で培った実践知をもとに、成果から逆算したソリューションを提供します。"
      />

      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] py-5">
        <Marquee
          items={["AI Training", "DX", "SNS", "Influencer", "Web", "EC", "Live", "Branding"]}
          duration={30}
          reverse
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-24 border-b border-[var(--color-border)] py-20 sm:py-28"
          >
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <div>
                  <span className="font-mono text-sm text-[var(--color-fg-muted)]">
                    0{i + 1}
                  </span>
                  <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-tight tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
                    {s.subtitle}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="text-base leading-8 text-[var(--color-fg-muted)]">
                    {s.body}
                  </p>
                  <ul className="mt-8 space-y-px overflow-hidden rounded-xl border border-[var(--color-border)]">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-4 bg-[var(--color-bg-soft)] px-5 py-4 text-sm"
                      >
                        <span className="font-mono text-[var(--color-cyan)]">
                          —
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_24%,transparent),transparent_70%)] blur-2xl" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight">
              まずはお気軽に
              <span className="text-gradient-sweep glow-gradient">ご相談</span>
              ください。
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-[var(--color-fg)] px-8 py-4 text-sm font-semibold text-[#04060f] transition-shadow hover:shadow-[0_0_40px_-8px_var(--color-cyan)]"
            >
              お問合せはこちら
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
