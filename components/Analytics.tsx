'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

function pageview(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
    page_location: window.location.href,
    page_title: document?.title,
  });
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ยิง page_view เมื่อเส้นทางเปลี่ยน
  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams?.size ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  if (!GA_ID) return null;

  return (
    <>
      {/* ตั้งค่า consent เริ่มต้นเป็น denied (GDPR-friendly) */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
        `}
      </Script>

      {/* โหลด gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* init GA และปิด send_page_view (เรายิงเอง) */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
        `}
      </Script>
    </>
  );
}
