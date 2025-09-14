// app/loading.tsx
import ArticleCardSkeleton from '@/components/skeletons/ArticleCardSkeleton';
import ScoreTileSkeleton from '@/components/skeletons/ScoreTileSkeleton';

export default function Loading() {
  return (
    <div className="space-y-10">
      <section>
        <div className="relative aspect-[16/9] w-full animate-pulse rounded-2xl bg-gray-200" />
      </section>

      <section>
        <div className="mb-4 h-6 w-24 animate-pulse rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
        </div>
      </section>

      <section>
        <div className="mb-4 h-6 w-24 animate-pulse rounded bg-gray-200" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <ScoreTileSkeleton key={i} />)}
        </div>
      </section>
    </div>
  );
}
