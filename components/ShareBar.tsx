// components/ShareBar.tsx
'use client';

import { useEffect, useState } from 'react';

type Props = { title: string };

export default function ShareBar({ title }: Props) {
  const [url, setUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setUrl(window.location.href);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('คัดลอกไม่สำเร็จ');
    }
  }

  function openWin(href: string) {
    window.open(href, '_blank', 'noopener,noreferrer,width=740,height=560');
  }

  function shareX() {
    if (!url) return;
    const href =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(title) +
      '&url=' +
      encodeURIComponent(url);
    openWin(href);
  }

  function shareLINE() {
    if (!url) return;
    // รูปแบบแชร์ทางการของ LINE
    const href =
      'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url);
    openWin(href);
  }

  const disabled = !url;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyLink}
        disabled={disabled}
        aria-label="คัดลอกลิงก์บทความ"
        className="px-3 py-1 rounded-full border hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copied ? 'คัดลอกแล้ว ✓' : 'คัดลอกลิงก์'}
      </button>

      <button
        type="button"
        onClick={shareX}
        disabled={disabled}
        aria-label="แชร์ไปที่ X"
        className="px-3 py-1 rounded-full border hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        แชร์ไปที่ X
      </button>

      <button
        type="button"
        onClick={shareLINE}
        disabled={disabled}
        aria-label="แชร์ไปที่ LINE"
        className="px-3 py-1 rounded-full border hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        แชร์ไปที่ LINE
      </button>
    </div>
  );
}
