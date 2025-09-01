'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export type VideoRowItem = {
  id: string;
  title: string;
  href: string;          // ลิงก์ไปหน้าวิดีโอ/ข่าว
  thumbnail: string;     // ใช้ URL ภายนอกได้
  duration?: string;     // เช่น "2:32"
  // tag?: string;        // << ไม่ใช้แล้ว
  metaLeft?: string;     // เช่น "Premier League"
  metaRight?: string;    // เช่น "23h", "2d"
};

const brand = { orange: '#FF6B00', black: '#0A0A0A' };

export default function VideoRow({
  title = 'Football video',
  items,
  viewMoreHref = '/videos',
}: {
  title?: string;
  items: VideoRowItem[];
  viewMoreHref?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => scrollerRef.current?.scrollBy({ left: dx, behavior: 'smooth' });

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-2xl font-extrabold flex-1">{title}</h2>
        <div className="flex items-center gap-2">
          <button aria-label="Scroll left" onClick={() => scrollBy(-360)} className="h-9 w-9 rounded-lg border bg-white flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <button aria-label="Scroll right" onClick={() => scrollBy(360)} className="h-9 w-9 rounded-lg border bg-white flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
          <Link href={viewMoreHref} className="text-sm font-medium ml-2" style={{ color: brand.orange }}>
            View more
          </Link>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div ref={scrollerRef} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'thin' }}>
        {items.map((v) => (
          <Link key={v.id} href={v.href} className="snap-start min-w-[280px] sm:min-w-[320px] max-w-[360px] group">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              {/* Play + duration */}
              <div className="absolute left-3 bottom-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.9)', color: brand.black }}>
                  <Play size={16} />
                </span>
                {v.duration && (
                  <span className="rounded-lg px-2 py-1 text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.75)', color: 'white' }}>
                    {v.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Title + Meta */}
            <h3 className="mt-3 line-clamp-2 text-lg font-bold text-neutral-900">{v.title}</h3>
            <div className="mt-1 text-sm text-neutral-500">
              {v.metaLeft && <span>{v.metaLeft}</span>}
              {v.metaLeft && v.metaRight && <span> · </span>}
              {v.metaRight && <span>{v.metaRight}</span>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
