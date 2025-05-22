import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;
