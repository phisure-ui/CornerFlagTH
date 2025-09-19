// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  // ใช้สำหรับประกอบ URL ให้เป็น absolute (เปลี่ยนโดเมนตามจริงได้)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),

  title: {
    default: 'CornerFlagTH',
    template: '%s | CornerFlagTH',
  },
  description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทความ',
  applicationName: 'CornerFlagTH',

  // ไอคอน (รวม Apple icon)
  icons: {
    icon: [
      // favicon/png ทั่วไป (มี .ico ก็ได้ถ้ามี)
      { url: '/icons/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icons/icon.png',
    apple: [
      // สำหรับ iOS (180x180)
      { url: '/icons/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // ตัวอย่าง OG/Twitter (ถ้ามี og-default.jpg)
  openGraph: {
    type: 'website',
    url: '/',
    title: 'CornerFlagTH',
    siteName: 'CornerFlagTH',
    description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทความ',
    images: [
      { url: '/og-default.jpg', width: 1200, height: 630, alt: 'CornerFlagTH' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CornerFlagTH',
    description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทความ',
    images: ['/og-default.jpg'],
  },
};

// ย้าย themeColor มาไว้ที่ viewport (ตามคำเตือนของ Next 15)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50 text-[#111] antialiased dark:bg-[#0b0b0b] dark:text-gray-50">
        {children}
      </body>
    </html>
  );
}
