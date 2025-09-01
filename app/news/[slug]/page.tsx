// app/news/[slug]/page.tsx
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

export const revalidate = 60; // cache หน้า 60 วินาที (แก้ตามจริง)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3003';

// --- mock data loader ---
type Article = {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string; // ISO
  modifiedAt?: string; // ISO
  author?: string;
  category?: string;
};

async function getArticle(slug: string): Promise<Article | null> {
  // TODO: ต่อ API/DB จริง
  const mock: Article[] = [
    {
      slug: 'man-city-2-1-spurs-post-match',
      title:
        'แมนฯ ซิตี้ 2–1 สเปอร์ส: ประเด็นหลังเกม—โฟเด้นเฉียบ, เป๊ปหมุนไลน์อัพได้ผล',
      description:
        'สรุปแท็กติกและจังหวะชี้ขาด นาที 82 ที่เปลี่ยนโมเมนตัม พร้อมคะแนนความสามารถนักเตะ',
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop',
      publishedAt: '2025-08-29T08:21:00Z',
      modifiedAt: '2025-08-29T10:10:00Z',
      author: 'ทีมข่าว CornerFlagTH',
      category: 'Premier League',
    },
  ];
  return mock.find((a) => a.slug === slug) ?? null;
}

// --- Metadata (per-article) ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) {
    return { title: 'ข่าวไม่พบ — CornerFlagTH', robots: { index: false, follow: false } };
  }

  const url = `${BASE_URL}/news/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      images: [article.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

// --- Page ---
export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-extrabold">ไม่พบบทความนี้</h1>
        <p className="mt-3 text-neutral-600">
          กลับไปดู <Link href="/news" className="text-orange-600">ข่าวทั้งหมด</Link>
        </p>
      </main>
    );
  }

  const url = `${BASE_URL}/news/${article.slug}`;

  // JSON-LD: NewsArticle
  const newsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author ?? 'CornerFlagTH',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CornerFlagTH',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/brand/cornerflag-logo.svg`,
      },
    },
    image: [article.image],
    articleSection: article.category ?? 'Football',
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd id="news-jsonld" data={newsJsonLd} />

      <p className="text-sm text-neutral-500">{article.category}</p>
      <h1 className="mt-2 text-3xl font-extrabold">{article.title}</h1>
      <p className="mt-3 text-neutral-700">{article.description}</p>

      <div className="mt-6 overflow-hidden rounded-2xl">
        {/* แนะนำให้ใช้ next/image ในโปรเจกต์จริง */}
        <img src={article.image} alt={article.title} />
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        โดย {article.author ?? 'CornerFlagTH'} · เผยแพร่{' '}
        {new Date(article.publishedAt).toLocaleString('th-TH')}
      </p>

      {/* เนื้อหาจริงวางตรงนี้ */}
      <article className="prose mt-6 max-w-none">
        <p>
          (ตัวอย่าง) เนื้อหาบทความ … คุณสามารถต่อ API และแปลง Markdown หรือ Rich
          text ได้ตามจริง
        </p>
      </article>
    </main>
  );
}
