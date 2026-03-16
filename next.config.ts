import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve.conditionNames = ["import", "require", "browser", "default"];
    return config;
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
