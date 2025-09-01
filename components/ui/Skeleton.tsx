// components/ui/Skeleton.tsx
export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-200 ${className}`} />;
}
