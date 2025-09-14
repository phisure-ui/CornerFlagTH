// components/skeletons/ScoreTileSkeleton.tsx
export default function ScoreTileSkeleton() {
  return (
    <div className="rounded-xl border p-3">
      <div className="mb-2 flex justify-between">
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-10 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-6 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
