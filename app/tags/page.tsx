// app/tags/page.tsx
import Link from 'next/link';
import { getAllTags } from '@/lib/adapters/articles';

export const revalidate = 300;

export default async function TagsIndexPage() {
  const tags = await getAllTags();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">แท็กทั้งหมด</h1>
        <p className="text-sm text-gray-600 mt-1">{tags.length} แท็ก</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.tag}
            href={`/tags/${t.tag}`}
            className="px-3 py-1 rounded-full border hover:shadow-sm transition"
          >
            {t.tag} <span className="text-xs text-gray-500">({t.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
