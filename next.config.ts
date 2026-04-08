import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: { ignoreBuildErrors: true },
  /** Helps Turbopack/Webpack resolve ESM packages that use "exports" (e.g. Spline). */
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  webpack: (config) => {
    config.resolve.conditionNames = ["import", "require", "browser", "default"];
    return config;
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#credo", permanent: false },
      // Let /contact render the contact page (no #contact section on home).
    ];
  },
};

export default nextConfig;
