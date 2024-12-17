import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),  // Adjust the alias to your folder structure
    };
    return config;
  },
  // Add other Next.js configuration options here
};

export default nextConfig;
