// lib/adapters/articles.ts
import { articles } from '../data/mock';
import type { Article, LeagueSlug } from '../types';

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export async function getArticles(opts?: {
  league?: LeagueSlug;
  tag?: string;
  limit?: number;
}): Promise<Article[]> {
  let list: Article[] = [...articles];

  if (opts?.league) {
    list = list.filter((a) => a.league === opts.league);
  }

  if (opts?.tag) {
    const key = normalize(opts.tag);
    list = list.filter((a) => a.tags?.some((t) => normalize(t) === key));
  }

  list.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const key = normalize(slug);
  return articles.find((a) => normalize(a.slug) === key) ?? null;
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const map = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags ?? []) {
      const k = normalize(t);
      map.set(k, (map.get(k) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** ค้นหาบทความแบบเบา ๆ: title/excerpt/tags (ไม่สนคำเรียง) + จัดคะแนนง่าย ๆ */
export async function searchArticles(q: string, limit = 50): Promise<Article[]> {
  const key = normalize(q);
  if (!key) return [];

  const now = Date.now();

  const scored = articles
    .map((a) => {
      const title = normalize(a.title);
      const excerpt = normalize(a.excerpt ?? '');
      const tags = (a.tags ?? []).map(normalize);

      const inTitle = title.includes(key) ? 1 : 0;
      const inExcerpt = excerpt.includes(key) ? 1 : 0;
      const tagExact = tags.some((t) => t === key) ? 1 : 0;
      const tagContain = tags.some((t) => t.includes(key)) ? 1 : 0;

      // ความสดใหม่ (0..1) ภายใน 30 วัน
      const ageDays = Math.max(0, (now - +new Date(a.publishedAt)) / (1000 * 60 * 60 * 24));
      const recency = Math.max(0, 1 - ageDays / 30);

      // น้ำหนัก: tagExact(6) > inTitle(4) > tagContain(2) > inExcerpt(1) + recency
      const score = tagExact * 6 + inTitle * 4 + tagContain * 2 + inExcerpt * 1 + recency;

      return { a, score };
    })
    .filter((s) => s.score > 0);

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    return +new Date(y.a.publishedAt) - +new Date(x.a.publishedAt);
  });

  return scored.slice(0, limit).map((s) => s.a);
}

/** Related: แท็ก > ลีก > เวลา */
export async function getRelatedArticles(base: Article, limit = 3): Promise<Article[]> {
  const baseTags = new Set((base.tags ?? []).map(normalize));
  const now = Date.now();

  const scored = articles
    .filter((a) => a.slug !== base.slug)
    .map((a) => {
      const shared = (a.tags ?? []).map(normalize).filter((t) => baseTags.has(t)).length;
      const sameLeague = a.league && base.league && a.league === base.league ? 1 : 0;
      const ageDays = Math.max(0, (now - +new Date(a.publishedAt)) / (1000 * 60 * 60 * 24));
      const recency = Math.max(0, 1 - ageDays / 30);
      const score = shared * 10 + sameLeague * 3 + recency;
      return { a, score, shared };
    });

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    if (y.shared !== x.shared) return y.shared - x.shared;
    return +new Date(y.a.publishedAt) - +new Date(x.a.publishedAt);
  });

  return scored.slice(0, limit).map((s) => s.a);
}
