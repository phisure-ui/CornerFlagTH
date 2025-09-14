import type { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';


export default function ArticleList({ articles }: { articles: Article[] }) {
return (
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{articles.map((a) => (
<ArticleCard key={a.id} article={a} />
))}
</div>
);
}