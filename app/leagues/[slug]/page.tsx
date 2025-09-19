// app/leagues/[slug]/page.tsx
import { notFound } from 'next/navigation';
import ArticleList from '@/components/ArticleList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getArticles } from '@/lib/adapters/articles';
import type { LeagueSlug } from '@/lib/types';

const TITLE_MAP: Record<LeagueSlug, string> = {
  'premier-league': 'Premier League',
  laliga: 'LaLiga',
  bundesliga: 'Bundesliga',
  'serie-a': 'Serie A',
  ucl: 'UEFA Champions League',
};

export default async function LeaguePage({
  params,
}: {
  params: { slug: LeagueSlug };
}) {
  const slug = params.slug;
  if (!(slug in TITLE_MAP)) notFound();

  const items = await getArticles({ league: slug });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Leagues', href: '/leagues' },
          { label: TITLE_MAP[slug] },
        ]}
      />

      <h1 className="mt-2 text-3xl font-extrabold">{TITLE_MAP[slug]}</h1>

      <section className="mt-6">
        <ArticleList articles={items} />
      </section>

      {/* ถ้ามีปุ่มโหลดเพิ่มของคุณเอง ใส่ไว้ด้านล่างนี้ได้ */}
      {/* <div className="flex justify-center mt-8">
        <button className="btn btn-outline">โหลดเพิ่ม</button>
      </div> */}
    </div>
  );
}
