'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Consent = 'granted' | 'denied';
const STORAGE_KEY = 'cf_consent';

function updateConsent(status: Consent) {
  window.gtag?.('consent', 'update', {
    ad_storage: status,
    analytics_storage: status,
  });
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // อ่านสถานะที่เคยเลือกไว้
    const saved = typeof window !== 'undefined'
      ? (localStorage.getItem(STORAGE_KEY) as Consent | null)
      : null;

    if (saved === 'granted' || saved === 'denied') {
      updateConsent(saved);
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    updateConsent('granted');
    setShow(false);
  };

  const rejectAll = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    updateConsent('denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          เราใช้คุกกี้เพื่อการวิเคราะห์การใช้งาน (Analytics) เพื่อปรับปรุงประสบการณ์ของคุณ
          คุณสามารถยอมรับหรือปฏิเสธได้
        </p>

        <div className="flex gap-2">
          <button
            onClick={rejectAll}
            className="rounded-full border border-neutral-600 px-4 py-2 text-sm"
          >
            ปฏิเสธ
          </button>
          <button
            onClick={acceptAll}
            className="rounded-full bg-orange-500 px-4 py-2 text-sm text-white"
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}
