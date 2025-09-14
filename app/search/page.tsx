// app/search/page.tsx
import { searchArticles } from '@/lib/adapters/articles';
import ArticleList from '@/components/ArticleList';

export const revalidate = 0; // ให้ค้นหาแบบสด

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q ?? '').toString();
  const hasQ = q.trim().length >= 2;

  const results = hasQ ? await searchArticles(q, 50) : [];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold">ค้นหา</h1>
        <p className="text-sm text-gray-600">พิมพ์อย่างน้อย 2 ตัวอักษร แล้วกด Enter</p>
      </header>

      <form action="/search" method="GET" className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="ค้นหาจากหัวข้อ/คำโปรย/แท็ก เช่น chelsea, var, preview"
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button className="rounded-xl border px-4 py-2 hover:shadow-sm">ค้นหา</button>
      </form>

      {hasQ ? (
        results.length ? (
          <>
            <p className="text-sm text-gray-600">พบ {results.length} รายการสำหรับ “{q}”</p>
            <ArticleList articles={results} />
          </>
        ) : (
          <p className="text-gray-600">ไม่พบบทความที่ตรงกับ “{q}”</p>
        )
      ) : (
        <p className="text-gray-600">กรอกคำค้นหาเพื่อเริ่มต้น</p>
      )}
    </div>
  );
}
