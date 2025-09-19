// app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',                          // ป้องกันกรณีมีหลาย origin/เส้นทางแล้วซ้ำกัน
    name: 'CornerFlagTH',
    short_name: 'CornerFlag',
    description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทความวิเคราะห์',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0b0b',
    theme_color: '#ff6b00',
    categories: ['sports', 'news'],
    lang: 'th',
    dir: 'ltr',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

