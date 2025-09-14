// components/skeletons/ArticleCardSkeleton.tsx
export default function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="relative aspect-[16/9] animate-pulse bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
