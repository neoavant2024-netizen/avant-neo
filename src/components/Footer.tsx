import Link from "next/link";
import { nav, offices, site } from "@/lib/site";
import LogoMark from "@/components/LogoMark";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-[15px] font-semibold tracking-[0.22em]">
                AVANT
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--color-fg-muted)]">
              {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block font-mono text-sm text-[var(--color-cyan)] hover:underline"
            >
              {site.email}
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
              Sitemap
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
              Offices
            </h3>
            <ul className="mt-5 space-y-5 text-sm leading-6 text-[var(--color-fg-muted)]">
              {offices.map((o) => (
                <li key={o.name}>
                  <span className="text-[var(--color-fg)]">{o.name}</span>
                  <br />〒{o.zip} {o.address}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-fg-muted)] sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-widest">{site.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
