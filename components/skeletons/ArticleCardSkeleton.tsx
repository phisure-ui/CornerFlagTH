import Skeleton from '../ui/Skeleton';   // ต้องสะกดตรงตัวพิมพ์ใหญ่เล็ก

export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-6 w-11/12" />
        <Skeleton className="h-6 w-8/12" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
