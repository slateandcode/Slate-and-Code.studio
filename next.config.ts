import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    /* the work tiles render at 360 to 920px wide; nothing on the site needs
       the default 3840 ceiling */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  /* the builder trades live under /industries, but there is no index page
     for them: custom-builders is the hub, so the bare address goes there */
  async redirects() {
    return [
      {
        source: "/industries",
        destination: "/industries/custom-builders",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
