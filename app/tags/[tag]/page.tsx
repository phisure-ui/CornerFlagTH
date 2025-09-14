// app/tags/[tag]/page.tsx
import type { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { getArticles, getAllTags } from '@/lib/adapters/articles';

export const revalidate = 300;

function toTitle(s: string): string {
  return s
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: t.tag }));
}

export async function generateMetadata(
  { params }: { params: { tag: string } }
): Promise<Metadata> {
  const label = toTitle(params.tag);
  return {
    title: `แท็ก: ${label} | CornerFlagTH`,
    description: `ข่าวทั้งหมดภายใต้แท็ก ${label}`,
    alternates: { canonical: `https://cornerflagth.com/tags/${params.tag}` },
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const list = await getArticles({ tag: params.tag, limit: 50 });
  const label = toTitle(params.tag);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">แท็ก: {label}</h1>
        <p className="text-sm text-gray-600 mt-1">{list.length} บทความ</p>
      </header>

      {list.length ? (
        <ArticleList articles={list} />
      ) : (
        <p className="text-gray-600">ยังไม่มีบทความในแท็กนี้</p>
      )}
    </div>
  );
}
