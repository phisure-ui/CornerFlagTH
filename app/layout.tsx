// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cornerflagth.com'), // ระหว่าง dev จะไม่กระทบ
  title: { default: 'CornerFlagTH', template: '%s | CornerFlagTH' },
  description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทวิเคราะห์',
  applicationName: 'CornerFlagTH',

  // ให้ Next แทรก <link rel="manifest" ...> อัตโนมัติด้วย
  manifest: '/manifest.webmanifest',

  icons: {
    icon: [
      { url: '/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/icons/apple-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/icons/icon-512.png',
  },

  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'CornerFlag',
    'format-detection': 'telephone=no',
  },

  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'CornerFlagTH',
    title: 'CornerFlagTH',
    description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทวิเคราะห์',
    url: 'https://cornerflagth.com',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'CornerFlagTH' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CornerFlagTH',
    description: 'ข่าวฟุตบอลอ่านสนุก • ไฮไลต์ • บทวิเคราะห์',
    images: ['/icons/icon-512.png'],
  },
};

// ⬇️ ย้าย themeColor มาไว้ที่นี่เพื่อลด warning
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ff6b00' },
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
