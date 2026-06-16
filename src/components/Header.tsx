"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { nav, site } from "@/lib/site";
import LogoMark from "@/components/LogoMark";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ルート遷移でモバイルメニューを閉じる
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_82%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[180deg]" />
          <span className="text-[15px] font-semibold tracking-[0.22em]">
            AVANT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`vfont relative px-4 py-2 text-sm transition-colors ${
                  active
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                <span className="nav-kinetic">
                  {item.label.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{ "--i": ci } as CSSProperties}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--color-fg)] px-5 py-2 text-sm font-semibold text-[#04060f] transition-all hover:shadow-[0_0_30px_-8px_var(--color-cyan)] sm:inline-block"
          >
            お問合せ
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="メニュー"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center md:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu（grid-rows でCSSのみで開閉アニメ） */}
      <nav
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`min-h-0 overflow-hidden transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
            {[
              ...nav,
              { label: "Contact", labelJa: "お問合せ", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline justify-between border-b border-[var(--color-border)] py-3.5"
              >
                <span className="text-base">{item.label}</span>
                <span className="text-xs text-[var(--color-fg-muted)]">
                  {item.labelJa}
                </span>
              </Link>
            ))}
            <p className="mt-4 font-mono text-xs text-[var(--color-fg-muted)]">
              {site.email}
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
