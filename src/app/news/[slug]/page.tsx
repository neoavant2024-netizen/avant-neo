import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { news } from "@/lib/site";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item ? item.title : "お知らせ" };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <Reveal>
        <div className="flex items-center gap-4">
          <time className="font-mono text-sm text-[var(--color-fg-muted)]">
            {item.date}
          </time>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-0.5 text-xs text-[var(--color-fg-muted)]">
            {item.category}
          </span>
        </div>
        <h1 className="mt-6 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">
          {item.title}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 border-t border-[var(--color-border)] pt-12">
          <p className="text-base leading-9 text-[var(--color-fg-muted)]">
            {item.body}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <Link
          href="/news"
          className="group mt-16 inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-cyan)]"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          お知らせ一覧へ
        </Link>
      </Reveal>
    </article>
  );
}
