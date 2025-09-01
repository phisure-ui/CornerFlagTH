import VideoRail from '@/components/VideoRail';
import { VideoItem } from '@/components/VideoCard';

export const metadata = { title: 'Football Video — CornerFlagTH' };

const sampleVideos: VideoItem[] = [
  {
    id: 'v1',
    title: "Man City 'missed the simple things' in loss to Spurs - Guardiola",
    href: '/videos/v1',
    thumbnail: '/thumbs/v1.jpg', // วางรูปไว้ที่ public/thumbs/ ได้ หรือใช้ CDN/URL ภายนอกก็ได้
    duration: '1:24',
    tag: 'REACTION',
    league: 'Premier League',
    published: '23h',
  },
  {
    id: 'v2',
    title: 'Guehi on playing to 40 and his love of wrestling',
    href: '/videos/v2',
    thumbnail: '/thumbs/v2.jpg',
    duration: '2:32',
    league: 'Swansea',
    published: '1d',
  },
  {
    id: 'v3',
    title: "Our relationship has changed' - Nuno on Forest owner",
    href: '/videos/v3',
    thumbnail: '/thumbs/v3.jpg',
    duration: '0:43',
    league: 'Premier League',
    published: '1d',
  },
  {
    id: 'v4',
    title: 'No doubt the players would welcome Isak back - Howe',
    href: '/videos/v4',
    thumbnail: '/thumbs/v4.jpg',
    duration: '1:27',
    league: 'Football',
    published: '2d',
  },
  {
    id: 'v5',
    title: "The hunger makes me want more' - Salah wins third PFA award",
    href: '/videos/v5',
    thumbnail: '/thumbs/v5.jpg',
    duration: '2:59',
    league: 'Premier League',
    published: '4d',
  },
];

export default function VideosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-extrabold">Football video</h1>

      {/* เรลแรกด้านบน */}
      <VideoRail videos={sampleVideos.slice(0, 5)} />

      {/* กริดต่อเนื่อง (ตัวอย่างใช้ซ้ำ) */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <VideoRail
            key={i}
            videos={sampleVideos.map((v) => ({ ...v, id: `${v.id}-${i}` }))}
          />
        ))}
      </div>
    </main>
  );
}
