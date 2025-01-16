import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'], // Specify supported formats
  },
};

export default nextConfig;
