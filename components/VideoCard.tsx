import Link from 'next/link';
import { Play } from 'lucide-react';

const brand = { orange: '#FF6B00', black: '#0A0A0A' };

export type VideoItem = {
  id: string;
  title: string;
  href: string;
  thumbnail?: string;      // ถ้าไม่ใส่ จะใช้พื้นหลังไล่เฉดแทน
  duration?: string;       // เช่น "2:32"
  tag?: string;            // เช่น "REACTION"
  league?: string;         // เช่น "Premier League"
  published?: string;      // เช่น "23h", "2d"
};

export default function VideoCard({ v }: { v: VideoItem }) {
  return (
    <article className="group">
      <Link href={v.href} className="block">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          {v.thumbnail ? (
            <img
              src={v.thumbnail}
              alt={v.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(10,10,10,0.9), rgba(255,107,0,0.6))',
              }}
            />
          )}

          {/* Tag ด้านบนซ้าย */}
          {v.tag && (
            <span
              className="absolute left-3 top-3 rounded px-2 py-1 text-xs font-bold"
              style={{ background: brand.orange, color: 'white' }}
            >
              {v.tag}
            </span>
          )}

          {/* ปุ่ม Play + เวลา ด้านล่างซ้าย */}
          <div className="absolute left-3 bottom-3 flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: 'rgba(255,255,255,0.9)', color: brand.black }}
            >
              <Play size={16} />
            </span>
            {v.duration && (
              <span
                className="rounded-lg px-2 py-1 text-xs font-semibold"
                style={{ background: 'rgba(0,0,0,0.75)', color: 'white' }}
              >
                {v.duration}
              </span>
            )}
          </div>
        </div>

        {/* ชื่อเรื่อง */}
        <h3 className="mt-3 line-clamp-2 text-lg font-bold text-neutral-900">
          {v.title}
        </h3>

        {/* เมตา (ลีก/เวลา) */}
        <div className="mt-1 text-sm text-neutral-500">
          {v.league && <span>{v.league}</span>}
          {v.league && v.published && <span> · </span>}
          {v.published && <span>{v.published}</span>}
        </div>
      </Link>
    </article>
  );
}
