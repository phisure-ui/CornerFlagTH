// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      // ใส่เพิ่มได้ถ้าคุณจะใช้เว็บรูปอื่นในอนาคต
      // { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
