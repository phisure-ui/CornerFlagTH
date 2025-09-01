// app/sitemap.ts และ app/robots.ts
export const revalidate = 3600; // รีเฟรชทุก 1 ชม.

import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003'; // เปลี่ยนให้ตรง port ที่คุณรัน

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // ตัวอย่าง rule เพิ่มเติม (ไม่จำเป็นต้องมี)
      // { userAgent: 'Googlebot-Image', allow: '/' },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: BASE_URL,
  };
}
