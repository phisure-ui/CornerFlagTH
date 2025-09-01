// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import ConsentBanner from '@/components/ConsentBanner';

const SITE_NAME = 'CornerFlagTH';
const DESCRIPTION =
  'ข่าวฟุตบอลยุโรป พรีเมียร์ลีก ลาลีก้า บุนเดสลีก้า ตารางแข่ง ไฮไลต์ บทวิเคราะห์ สรุปข่าวรายวัน';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3003';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === 'true';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF6B00' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: '%s — CornerFlagTH',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [`${BASE_URL}/og.png`],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [`${BASE_URL}/og.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const enableGA = !!GA_ID && (process.env.NODE_ENV === 'production' || GA_DEBUG);

  return (
    <html lang="th">
      <body className="bg-neutral-50 font-sans antialiased text-neutral-900">
        <Header />

        {/* JSON-LD ระดับเว็บไซต์ */}
        <JsonLd
          id="org-jsonld"
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: BASE_URL,
            logo: `${BASE_URL}/brand/cornerflagth-logo.svg`,
            sameAs: [
              'https://facebook.com/yourpage',
              'https://twitter.com/yourhandle',
              'https://www.youtube.com/@yourchannel',
            ],
          }}
        />
        <JsonLd
          id="website-jsonld"
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${BASE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />

        {/* GA4 + แบนเนอร์ยินยอม (โหลดเมื่อมี GA_ID และเปิดใช้ตามเงื่อนไข) */}
        {enableGA && (
          <>
            <Analytics />
            <ConsentBanner />
          </>
        )}

        <main id="main" tabIndex={-1} className="min-h-[calc(100vh-56px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
