// components/ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export default function ArticleCard({ article }: { article: Article }) {
  const published = new Date(article.publishedAt).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group overflow-hidden rounded-2xl border bg-white transition
                 hover:shadow-sm
                 border-gray-200 dark:border-gray-800
                 dark:bg-gray-900"
    >
      {article.heroImage && (
        <div className="relative aspect-[16/9]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {article.league && (
            <span className="rounded-full border px-2 py-0.5
                             border-gray-300 dark:border-gray-700">
              {article.league}
            </span>
          )}
          <time dateTime={article.publishedAt}>{published}</time>
        </div>

        <h3 className="font-semibold leading-snug group-hover:text-primary">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
