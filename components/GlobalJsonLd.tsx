// components/GlobalJsonLd.tsx
import { headers } from "next/headers";
import JsonLd from "./JsonLd";

function getOrigin() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto =
    h.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "https://cornerflagth.com";
}

export default function GlobalJsonLd() {
  const origin = getOrigin();

  // 1) องค์กร (Publisher)
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CornerFlagTH",
    url: origin,
    logo: `${origin}/logo-512.png`, // ใส่ไฟล์นี้ใน /public ถ้ายังไม่มี
    sameAs: [] as string[],         // จะเติม social link ภายหลังได้
  };

  // 2) เว็บไซต์ + กล่องค้นหา (Sitelinks Search)
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CornerFlagTH",
    url: origin,
    inLanguage: "th-TH",
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <>
      <JsonLd data={org} />
      <JsonLd data={website} />
    </>
  );
}
