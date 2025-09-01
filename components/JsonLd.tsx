// components/JsonLd.tsx
// Server Component (ไม่มี 'use client') — ใส่ script ลง body ได้เลย
export default function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, any>;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
