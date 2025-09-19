// components/ShareBar.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Share2, Link2 } from "lucide-react";

type UTMKeys =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "utm_term";

type Props = {
  /** จะส่งมาก็ได้ ไม่ส่งมาก็จะใช้ URL ปัจจุบัน */
  url?: string;
  /** ใช้เป็น title ตอน share */
  title: string;
  className?: string;
  /** override ค่า UTM ได้ */
  utm?: Partial<Record<UTMKeys, string>>;
};

export default function ShareBar({ url, title, className = "", utm }: Props) {
  // ป้องกัน hydration mismatch: เช็กได้หลัง mount เท่านั้น
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  // หา base URL ที่ปลอดภัยตอน SSR
  const baseUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return ""; // SSR-safe placeholder
  }, [url]);

  // สร้าง URL + ใส่ UTM
  const buildUrl = useCallback(
    (medium: "share_native" | "share_copy") => {
      try {
        const u = new URL(
          baseUrl || "/",
          typeof window !== "undefined"
            ? window.location.origin
            : "https://cornerflagth.com"
        );

        // ค่า default + override ได้ผ่าน props.utm
        const params = new URLSearchParams({
          utm_source: "cornerflagth",
          utm_medium: medium,
          utm_campaign: "article",
          ...(utm || {}),
        });

        for (const [k, v] of params) {
          if (!v) continue;
          u.searchParams.set(k, v);
        }
        return u.toString();
      } catch {
        return baseUrl || "";
      }
    },
    [baseUrl, utm]
  );

  // toast แบบเบา ๆ
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(id);
  }, [toast]);

  const onShare = useCallback(async () => {
    if (!canShare) return;
    try {
      const shareUrl = buildUrl("share_native");
      await (navigator as any).share({ title, url: shareUrl });
      setToast("แชร์แล้ว");
      // TODO: ส่ง analytics event ได้ที่นี่
    } catch {
      // user ยกเลิกหรือ platform ไม่ยอมแชร์ — ไม่ต้องทำอะไร
    }
  }, [canShare, title, buildUrl]);

  const onCopy = useCallback(async () => {
    const copyUrl = buildUrl("share_copy");
    try {
      await navigator.clipboard.writeText(copyUrl);
      setToast("คัดลอกลิงก์แล้ว");
      // TODO: ส่ง analytics event ได้ที่นี่
    } catch {
      setToast("คัดลอกไม่สำเร็จ");
    }
  }, [buildUrl]);

  const baseBtn =
    "inline-flex items-center justify-center rounded-full px-4 py-2 border transition hover:shadow-sm active:scale-[.98] select-none";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {canShare && (
        <button
          type="button"
          onClick={onShare}
          className={`${baseBtn} bg-[var(--brand-orange)] text-white border-transparent`}
          aria-label="แชร์บทความนี้"
        >
          <Share2 className="mr-2 h-4 w-4" />
          แชร์
        </button>
      )}

      <button
        type="button"
        onClick={onCopy}
        className={`${baseBtn} bg-white text-gray-700 border-gray-300 dark:bg-transparent dark:text-gray-200`}
        aria-label="คัดลอกลิงก์"
      >
        <Link2 className="mr-2 h-4 w-4" />
        คัดลอกลิงก์
      </button>

      {toast && (
        <span className="ml-1 text-sm rounded-full px-3 py-1 bg-emerald-600 text-white/95">
          {toast}
        </span>
      )}
    </div>
  );
}
