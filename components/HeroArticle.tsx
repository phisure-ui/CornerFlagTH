// components/HeroArticle.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export default function HeroArticle({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl border transition
                 border-gray-200 dark:border-gray-800
                 bg-white dark:bg-gray-900"
    >
      {article.heroImage ? (
        <div className="relative aspect-[16/9]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t
                          from-black/70 via-black/25 to-transparent" />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800" />
      )}

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="inline-flex items-center gap-2 text-xs opacity-90">
          {article.league && (
            <span className="rounded-full border border-white/30 px-2 py-0.5">
              {article.league}
            </span>
          )}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleString('th-TH', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </time>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold leading-snug">{article.title}</h2>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm opacity-90">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
