// app/leagues/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
import PaginatedArticles from '@/components/PaginatedArticles';
import ScoreTile from '@/components/ScoreTile';

import { getArticles } from '@/lib/adapters/articles';
import { getMatches } from '@/lib/adapters/matches';
import type { LeagueSlug } from '@/lib/types';

export const revalidate = 300;

const TITLE_MAP: Record<LeagueSlug, string> = {
  'premier-league': 'Premier League',
  laliga: 'LaLiga',
  bundesliga: 'Bundesliga',
  'serie-a': 'Serie A',
  ucl: 'UEFA Champions League',
};
const SLUGS: LeagueSlug[] = ['premier-league', 'laliga', 'bundesliga', 'serie-a', 'ucl'];

export async function generateStaticParams() { return SLUGS.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug as LeagueSlug;
  if (!SLUGS.includes(slug)) return { title: 'ไม่พบลีก | CornerFlagTH' };
  const title = `${TITLE_MAP[slug]} | CornerFlagTH`;
  const canonical = `https://cornerflagth.com/leagues/${slug}`;
  return {
    title,
    alternates: { canonical },
    openGraph: { type: 'website', url: canonical, title: TITLE_MAP[slug], images: ['/og-default.jpg'] },
    twitter: { card: 'summary_large_image', title: TITLE_MAP[slug], images: ['/og-default.jpg'] },
  };
}

export default async function LeaguePage({ params }: { params: { slug: string } }) {
  const slug = params.slug as LeagueSlug;
  if (!SLUGS.includes(slug)) notFound();

  const [firstPage, matches] = await Promise.all([
    getArticles({ league: slug, limit: 9 }),   // หน้าแรก 9 ชิ้น
    getMatches({ league: slug, limit: 12 }),
  ]);

  const title = TITLE_MAP[slug];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Leagues', href: '/leagues' }, { label: title }]} />
        <h1 className="text-3xl font-extrabold">{title}</h1>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold">Articles</h2>
        <PaginatedArticles initial={firstPage} pageSize={9} league={slug} initialOffset={firstPage.length} />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Scores</h2>
        {matches.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((m) => <ScoreTile key={m.id} match={m} />)}
          </div>
        ) : (
          <p className="text-gray-600">ยังไม่มีสกอร์สำหรับลีกนี้</p>
        )}
      </section>
    </div>
  );
}
