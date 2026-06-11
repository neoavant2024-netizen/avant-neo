import type { Metadata } from "next";
import { Outfit, Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import MotionBackground from "@/components/MotionBackground";
import MouseSpotlight from "@/components/MouseSpotlight";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Outfit は可変フォント（weight 軸）。weight 未指定で可変版を読み込み、
// font-variation-settings によるキネティックなウェイト変化を可能にする。
const sansLatin = Outfit({
  variable: "--font-sans-latin",
  subsets: ["latin"],
  display: "swap",
});

const jp = Zen_Kaku_Gothic_New({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-latin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${sansLatin.variable} ${jp.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg)]">
        <MotionBackground />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <MouseSpotlight />
      </body>
    </html>
  );
}
