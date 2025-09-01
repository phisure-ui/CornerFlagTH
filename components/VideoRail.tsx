import Link from 'next/link';
import VideoCard, { VideoItem } from '@/components/VideoCard';

const brand = { orange: '#FF6B00' };

export default function VideoRail({ videos }: { videos: VideoItem[] }) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-extrabold">Football video</h2>
        <Link
          href="/videos"
          className="text-sm font-medium"
          style={{ color: brand.orange }}
        >
          View more
        </Link>
      </div>

      {/* desktop: grid 5 คอลัมน์ / tablet: 3 / mobile: 1-2 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {videos.map((v) => (
          <VideoCard key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}
