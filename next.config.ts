// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      // เพิ่มโดเมนอื่นภายหลังได้ เช่น:
      // { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
