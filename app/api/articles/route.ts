// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/adapters/articles';
import type { LeagueSlug } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset') ?? '0');
  const limit = Number(searchParams.get('limit') ?? '9');
  const league = (searchParams.get('league') || '') as LeagueSlug;
  const tag = searchParams.get('tag') || undefined;

  // ดึงชุดใหญ่แล้วมาหั่นเอง เพื่อให้เรียงตามเวลาเหมือนเดิม
  const all = await getArticles({
    league: league || undefined,
    tag,
    limit: 1000,
  });

  const items = all.slice(offset, offset + limit);
  const hasMore = offset + limit < all.length;

  return NextResponse.json({ items, hasMore, total: all.length });
}
