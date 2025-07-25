import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ['localhost', 'api.pxlr.ru'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.pxlr.ru',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
