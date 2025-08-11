import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin({

});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'], // Specify supported formats
  },
};

export default withNextIntl(nextConfig);
