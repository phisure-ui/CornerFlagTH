import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/adapters/articles';
import { getMatches } from '@/lib/adapters/matches';
import type { LeagueSlug } from '@/lib/types';
import ArticleList from '@/components/ArticleList';
import ScoreTile from '@/components/ScoreTile';


export const revalidate = 300;


const VALID: LeagueSlug[] = ['premier-league', 'laliga', 'bundesliga', 'serie-a', 'ucl'];


export default async function LeaguePage({ params }: { params: { slug: string } }) {
const slug = params.slug as LeagueSlug;
if (!VALID.includes(slug)) notFound();


const [articles, matches] = await Promise.all([
getArticles({ league: slug, limit: 12 }),
getMatches({ league: slug, limit: 12 }),
]);


const titleMap: Record<LeagueSlug, string> = {
'premier-league': 'Premier League',
laliga: 'LaLiga',
bundesliga: 'Bundesliga',
'serie-a': 'Serie A',
ucl: 'UEFA Champions League',
};


return (
<div className="space-y-8">
<header className="flex items-end justify-between">
<h1 className="text-3xl font-extrabold">{titleMap[slug]}</h1>
</header>


<section>
<h2 className="text-xl font-bold mb-3">Articles</h2>
<ArticleList articles={articles} />
</section>


<section>
<h2 className="text-xl font-bold mb-3">Scores</h2>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
{matches.map((m) => (
<ScoreTile key={m.id} match={m} />
))}
</div>
</section>
</div>
);
}