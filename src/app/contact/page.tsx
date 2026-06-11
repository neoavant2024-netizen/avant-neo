import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ParticlesBackground from "@/components/ParticlesBackground";
import { site, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問合せ",
  description: `${site.name}へのお問合せ。生成AI・マーケティング・WEB戦略のご相談を承ります。`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="お問合せ"
        lead="サービスに関するご相談・お見積り・取材依頼など、お気軽にお問合せください。"
      />

      <div className="relative overflow-hidden">
        <ParticlesBackground className="pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-10">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
                  Email
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-lg hover:text-[var(--color-cyan)]"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
                  Offices
                </h2>
                <ul className="mt-3 space-y-5 text-sm leading-7 text-[var(--color-fg-muted)]">
                  {offices.map((o) => (
                    <li key={o.name}>
                      <span className="text-[var(--color-fg)]">{o.name}</span>
                      <br />〒{o.zip} {o.address}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
