import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス",
  description: `${site.name}の本社・宇都宮拠点へのアクセス情報。`,
};

export default function AccessPage() {
  return (
    <>
      <PageHeader
        eyebrow="ACCESS"
        title="アクセス"
        lead="栃木県宇都宮市に本社・拠点を構えています。お越しの際は事前にお問合せください。"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="space-y-20">
          {offices.map((o, i) => {
            const query = encodeURIComponent(`〒${o.zip} ${o.address}`);
            return (
              <Reveal key={o.name} delay={i * 0.05}>
                <section className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
                      Office {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight">
                      {o.name}
                    </h2>
                    <dl className="mt-8 space-y-5 text-sm">
                      <div className="grid grid-cols-[80px_1fr] gap-4">
                        <dt className="text-[var(--color-fg-muted)]">住所</dt>
                        <dd className="leading-7">
                          〒{o.zip}
                          <br />
                          {o.address}
                        </dd>
                      </div>
                      {o.note && (
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                          <dt className="text-[var(--color-fg-muted)]">目印</dt>
                          <dd className="leading-7">{o.note}</dd>
                        </div>
                      )}
                      <div className="grid grid-cols-[80px_1fr] gap-4">
                        <dt className="text-[var(--color-fg-muted)]">駐車場</dt>
                        <dd className="leading-7">{o.parking}</dd>
                      </div>
                    </dl>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-cyan)]"
                    >
                      Googleマップで開く
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>

                  <div
                    className={`overflow-hidden rounded-2xl border border-[var(--color-border)] ${
                      i % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <iframe
                      title={`${o.name}の地図`}
                      src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
                      loading="lazy"
                      className="aspect-[4/3] w-full grayscale-[0.3] invert-[0.92] hue-rotate-180"
                    />
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
