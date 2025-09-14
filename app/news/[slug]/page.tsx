// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getArticle, getArticles, getRelatedArticles } from '@/lib/adapters/articles';
import type { LeagueSlug, Article } from '@/lib/types';
import ShareBar from '@/components/ShareBar';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 300;

// แปลง slug ลีก -> ชื่อที่อ่านง่าย
const LEAGUE_NAME: Record<LeagueSlug, string> = {
  'premier-league': 'Premier League',
  laliga: 'LaLiga',
  bundesliga: 'Bundesliga',
  'serie-a': 'Serie A',
  ucl: 'UEFA Champions League',
};

// สร้างเส้นทางล่วงหน้าจาก mock ป้องกันพลาด 404
export async function generateStaticParams() {
  const list = await getArticles({ limit: 100 });
  return list.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'ไม่พบข่าว | CornerFlagTH' };

  // ปรับโดเมนเมื่อขึ้นโปรดักชันจริง
  const url = `https://cornerflagth.com/news/${article.slug}`;
  const og = article.heroImage ?? '/og-default.jpg'; // Fallback OG

  return {
    title: `${article.title} | CornerFlagTH`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt,
      images: [og],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [og],
    },
  };
}

export default async function NewsArticlePage(
  { params }: { params: { slug: string } }
) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article, 3);

  const publishedText = new Date(article.publishedAt).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // JSON-LD (Article)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.publishedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : undefined,
    image: article.heroImage ? [article.heroImage] : undefined,
  };

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-3">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            ...(article.league
              ? [
                  { label: 'Leagues', href: '/leagues' },
                  { label: LEAGUE_NAME[article.league], href: `/leagues/${article.league}` },
                ]
              : []),
            { label: article.title },
          ]}
        />

        <h1 className="text-3xl font-extrabold leading-tight">{article.title}</h1>

        <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
          {article.author && <span>{article.author}</span>}
          <time dateTime={article.publishedAt}>{publishedText}</time>
          {article.tags?.length ? (
            <span className="inline-flex gap-2">
              • {article.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full border text-xs">{t}</span>
              ))}
            </span>
          ) : null}
        </div>
      </header>

      {article.heroImage && (
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* เนื้อหา: ตอนนี้ใช้ excerpt/placeholder; ภายหลังสลับเป็น MDX/CMS ได้ */}
      <div className="leading-relaxed text-[15px] text-gray-800 space-y-4">
        {article.excerpt ? <p>{article.excerpt}</p> : <p>— ตัวอย่างเนื้อหาบทความ (รอเชื่อมต่อ CMS/MDX) —</p>}
        <p>
          หน้า “ข่าวเดี่ยว” นี้ใช้ adapter จาก <code>/lib/adapters/articles.ts</code>.
          เมื่อเชื่อมต่อ CMS/API แล้ว เปลี่ยนเฉพาะ adapter ก็เพียงพอ UI ไม่ต้องแก้ไข
        </p>
      </div>

      {/* ปุ่มแชร์/คัดลอกลิงก์ */}
      <ShareBar title={article.title} />

      {/* Related — ใช้ตัวเลือกที่ถ่วงน้ำหนักด้วยแท็ก > ลีก > เวลา */}
      {related.length > 0 && (
        <section className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((a: Article) => (
              <Link key={a.id} href={`/news/${a.slug}`} className="rounded-xl border overflow-hidden hover:shadow-sm">
                {a.heroImage && (
                  <div className="relative aspect-[16/9]">
                    <Image src={a.heroImage} alt={a.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-3 text-sm font-semibold line-clamp-2">{a.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
