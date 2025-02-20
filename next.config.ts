import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
      bodySizeLimit: "100mb"
    }
  }
};

export default nextConfig;