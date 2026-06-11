import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { news, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "お知らせ",
  description: `${site.name}からのお知らせ・ニュース一覧。`,
};

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="NEWS" title="お知らせ" />

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <ul className="space-y-px">
          {news.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 0.06}>
              <Link
                href={`/news/${item.slug}`}
                className="group flex flex-col gap-2 border-t border-[var(--color-border)] py-7 transition-colors last:border-b hover:bg-[var(--color-bg-soft)] sm:flex-row sm:items-center sm:gap-8 sm:px-4"
              >
                <time className="font-mono text-sm text-[var(--color-fg-muted)] sm:w-32">
                  {item.date}
                </time>
                <span className="w-fit rounded-full border border-[var(--color-border)] px-3 py-0.5 text-xs text-[var(--color-fg-muted)]">
                  {item.category}
                </span>
                <span className="flex-1 text-[15px] transition-colors group-hover:text-[var(--color-cyan)]">
                  {item.title}
                </span>
                <span className="hidden text-[var(--color-fg-muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-cyan)] sm:block">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
