import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "nikansha-yoga-arogya.vercel.app" }],
        destination: "https://www.yogaarogya.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "yogaarogya.in" }],
        destination: "https://www.yogaarogya.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
