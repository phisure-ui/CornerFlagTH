// components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';

export default function ArticleCard({ article }: { article: Article }) {
  const timeText = new Date(article.publishedAt).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const imgSrc = article.heroImage ?? '/og-default.jpg'; // fallback รูป

  return (
    <Link
      href={`/news/${article.slug}`}
      className="block rounded-2xl border bg-white/70 dark:bg-white/5 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {article.league && (
            <span className="px-2 py-0.5 rounded-full border text-gray-600 dark:text-gray-300">
              {article.league}
            </span>
          )}
          <time dateTime={article.publishedAt}>{timeText}</time>
        </div>

        <h3 className="mt-2 font-bold text-lg line-clamp-2">{article.title}</h3>
        {article.excerpt ? (
          <p className="mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
