import Skeleton from '../ui/Skeleton';

export default function HeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="relative">
        <Skeleton className="aspect-[16/9] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mb-2 flex gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Skeleton className="mb-2 h-9 w-4/5" />
          <Skeleton className="mb-2 h-9 w-3/5" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
