// components/PaginatedArticles.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ArticleList from '@/components/ArticleList';
import type { Article, LeagueSlug } from '@/lib/types';
import ArticleCardSkeleton from '@/components/skeletons/ArticleCardSkeleton';

type Props = {
  initial: Article[];
  pageSize?: number;
  league?: LeagueSlug;
  tag?: string;
  autoLoad?: boolean;
  /** ใช้กำหนด offset เริ่มต้นของการโหลดครั้งถัดไป (เช่น หน้า Home ตัด hero ออกไป 1) */
  initialOffset?: number;
};

export default function PaginatedArticles({
  initial,
  pageSize = 9,
  league,
  tag,
  autoLoad = true,
  initialOffset,
}: Props) {
  // offset เริ่มต้น: ถ้าไม่ได้ส่งมาก็ใช้จำนวน initial
  const [offset, setOffset] = useState<number>(initialOffset ?? initial.length);
  const [items, setItems] = useState<Article[]>(initial);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set('offset', String(offset));
      qs.set('limit', String(pageSize));
      if (league) qs.set('league', league);
      if (tag) qs.set('tag', tag);

      const res = await fetch(`/api/articles?${qs.toString()}`, { cache: 'no-store' });
      const data: { items: Article[]; hasMore: boolean } = await res.json();

      // รวม + กันซ้ำตาม id
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        const merged = [...prev];
        for (const it of data.items) {
          if (!seen.has(it.id)) {
            merged.push(it);
            seen.add(it.id);
          }
        }
        return merged;
      });

      setOffset((prev) => prev + data.items.length);
      setHasMore(data.hasMore);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, pageSize, league, tag]);

  useEffect(() => {
    if (!autoLoad) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '600px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoLoad, loadMore]);

  return (
    <div className="space-y-4">
      <ArticleList articles={items} />

      {hasMore && (
        <div className="flex justify-center">
          <button onClick={loadMore} disabled={loading} className="btn btn-outline">
            {loading ? 'กำลังโหลด…' : 'โหลดเพิ่ม'}
          </button>
        </div>
      )}

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} />
    </div>
  );
}
