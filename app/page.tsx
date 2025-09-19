// app/page.tsx
import HeroArticle from '@/components/HeroArticle';
import ArticleList from '@/components/ArticleList';
import ScoreTile from '@/components/ScoreTile';
import { getArticles } from '@/lib/adapters/articles';
import { getMatches } from '@/lib/adapters/matches';

export default async function Page() {
  const articles = await getArticles({ limit: 7 });
  const [hero, ...rest] = articles;

  const matches = await getMatches();
  const leagues = ['premier-league', 'laliga', 'bundesliga', 'serie-a', 'ucl'] as const;

  return (
    <>
      {/* === HERO: ปล่อยเต็มความกว้างของหน้า === */}
      {hero ? (
        <section>
          <HeroArticle article={hero} />
        </section>
      ) : null}

      {/* === ส่วนเนื้อหาหลัก: คุมความกว้างด้วยคอนเทนเนอร์ === */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Latest */}
        <section className="mt-8">
          <h2 className="text-2xl font-extrabold mb-4">Latest</h2>
          <ArticleList articles={rest} />
        </section>

        {/* Scores */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold mb-4">Scores</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leagues.map((lg) => (
              <ScoreTile
                key={lg}
                league={lg}
                matches={matches.filter((m) => m.league === lg)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
