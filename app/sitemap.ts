// app/sitemap.ts และ app/robots.ts
export const revalidate = 3600; // รีเฟรชทุก 1 ชม.

import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/scores`,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    // ใส่เพจลีกหลัก ๆ ไว้ก่อน (แก้ slug ให้ตรงโปรเจ็กต์จริง)
    { url: `${BASE_URL}/leagues/premier-league`, priority: 0.8 },
    { url: `${BASE_URL}/leagues/la-liga`, priority: 0.8 },
    { url: `${BASE_URL}/leagues/bundesliga`, priority: 0.8 },
    { url: `${BASE_URL}/leagues/serie-a`, priority: 0.8 },
    { url: `${BASE_URL}/leagues/uefa-champions-league`, priority: 0.8 },
  ];
}
