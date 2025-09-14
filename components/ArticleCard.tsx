import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';


export default function ArticleCard({ article }: { article: Article }) {
return (
<article className="rounded-2xl overflow-hidden border bg-white hover:shadow-md transition">
{article.heroImage && (
<Link href={`/news/${article.slug}`} className="block">
<div className="relative aspect-[16/9]">
<Image
src={article.heroImage}
alt={article.title}
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
className="object-cover"
priority={false}
/>
</div>
</Link>
)}
<div className="p-4">
<Link href={`/news/${article.slug}`} className="block">
<h3 className="text-lg font-semibold leading-snug line-clamp-2">{article.title}</h3>
</Link>
{article.excerpt && (
<p className="mt-2 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
)}
<div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
{article.league && (
<span className="px-2 py-0.5 rounded-full border">{article.league}</span>
)}
<time dateTime={article.publishedAt}>
{new Date(article.publishedAt).toLocaleString('th-TH', {
dateStyle: 'medium',
timeStyle: 'short',
})}
</time>
</div>
</div>
</article>
);
}