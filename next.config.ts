import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // エックスサーバー（静的ホスティング）向け：純HTMLを out/ に書き出す
  output: "export",
  // 各ルートを /path/index.html として生成し、Apache でそのまま配信できるようにする
  trailingSlash: true,
  // 静的書き出しでは next/image の最適化サーバーが無いため無効化
  images: { unoptimized: true },
};

export default nextConfig;
