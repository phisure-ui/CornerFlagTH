import { getArticles } from '@/lib/adapters/articles';
import { getMatches } from '@/lib/adapters/matches';
import ArticleList from '@/components/ArticleList';
import ScoreTile from '@/components/ScoreTile';


export const revalidate = 300; // ISR 5 นาที


export default async function HomePage() {
const [top, latest, scores] = await Promise.all([
getArticles({ limit: 3 }),
getArticles({ limit: 9 }),
getMatches({ limit: 6 }),
]);


return (
<div className="space-y-8">
{/* Hero / Top Stories */}
<section>
<h2 className="text-2xl font-bold mb-4">Top Stories</h2>
<ArticleList articles={top} />
</section>


{/* Latest */}
<section>
<h2 className="text-2xl font-bold mb-4">Latest</h2>
<ArticleList articles={latest} />
</section>


{/* Scores */}
<section>
<h2 className="text-2xl font-bold mb-4">Scores</h2>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
{scores.map((m) => (
<ScoreTile key={m.id} match={m} />
))}
</div>
</section>
</div>
);
}