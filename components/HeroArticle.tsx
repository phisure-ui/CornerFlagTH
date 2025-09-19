// components/HeroArticle.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';

export default function HeroArticle({ article }: { article: Article }) {
  const publishedText = new Date(article.publishedAt).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const imgSrc = article.heroImage ?? '/og-default.jpg'; // fallback

  return (
    <Link href={`/news/${article.slug}`} className="group block relative rounded-2xl overflow-hidden">
      <div className="relative h-[360px] sm:h-[420px] lg:h-[520px]">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        <div className="flex items-center gap-2 text-xs text-white/85">
          {article.league && (
            <span className="px-2 py-0.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
              {article.league}
            </span>
          )}
          <time dateTime={article.publishedAt}>{publishedText}</time>
        </div>
        <h2 className="mt-2 text-white text-2xl sm:text-3xl font-extrabold leading-tight line-clamp-2">
          {article.title}
        </h2>
        {article.excerpt ? <p className="mt-1.5 text-white/90 line-clamp-2">{article.excerpt}</p> : null}
      </div>
    </Link>
  );
}
