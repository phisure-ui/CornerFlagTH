import Skeleton from '../ui/Skeleton';

function VideoItemSkeleton() {
  return (
    <div className="w-[320px] shrink-0">
      <div className="relative">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          <div className="h-3 w-10 animate-pulse rounded bg-white/40" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export default function VideoRowSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <VideoItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
