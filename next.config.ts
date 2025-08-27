import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // This disables all Next.js image optimization
  },
};

export default nextConfig;