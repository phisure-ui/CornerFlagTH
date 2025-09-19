// app/tags/page.tsx
import { getArticles } from '@/lib/adapters/articles';

export default async function TagsPage() {
  const items = await getArticles({}); // ดึงทั้งหมดเพื่อรวบแท็ก
  const counts = new Map<string, number>();
  items.forEach((a) => a.tags?.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));

  const tags = [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-extrabold">แท็กทั้งหมด</h1>
      <p className="text-sm text-gray-500 mt-1">{tags.length} แท็ก</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {tags.map(([t, n]) => (
          <span key={t} className="chip">
            {t} <span className="ml-1 text-gray-400">({n})</span>
          </span>
        ))}
      </div>
    </div>
  );
}
