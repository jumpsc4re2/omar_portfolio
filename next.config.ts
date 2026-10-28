import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 is reserved for the hero portrait; everything else uses the default 75.
    qualities: [75, 90],
  },
  turbopack: {
    // Pin the root to this folder (a stray lockfile higher up would otherwise be picked).
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
