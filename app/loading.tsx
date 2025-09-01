// app/loading.tsx
import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import { ArticleGridSkeleton } from '@/components/skeletons/ArticleCardSkeleton';
import VideoRowSkeleton from '@/components/skeletons/VideoRowSkeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <HeroSkeleton />

      <div className="mt-8">
        <div className="mb-3 h-6 w-40 rounded bg-neutral-200 animate-pulse" />
        <ArticleGridSkeleton count={8} />
      </div>

      <div className="mt-10">
        <div className="mb-3 h-6 w-44 rounded bg-neutral-200 animate-pulse" />
        <VideoRowSkeleton />
      </div>
    </div>
  );
}
