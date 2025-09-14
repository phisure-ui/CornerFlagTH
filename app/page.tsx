// app/page.tsx
import { getArticles } from '@/lib/adapters/articles';
import { getMatches } from '@/lib/adapters/matches';
import HeroArticle from '@/components/HeroArticle';
import PaginatedArticles from '@/components/PaginatedArticles';
import ScoreTile from '@/components/ScoreTile';

export const revalidate = 300;

export default async function HomePage() {
  const [allArticles, scores] = await Promise.all([
    getArticles({ limit: 12 }),
    getMatches({ limit: 6 }),
  ]);

  const [hero, ...rest] = allArticles;
  const initial = rest.slice(0, 9); // หน้าแรกแสดง 9 ชิ้น

  return (
    <div className="space-y-10">
      {hero && (
        <section>
          <HeroArticle article={hero} />
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold">Latest</h2>
        <PaginatedArticles initial={initial} pageSize={2} initialOffset={initial.length + 1} />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Scores</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scores.map((m) => (
            <ScoreTile key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
