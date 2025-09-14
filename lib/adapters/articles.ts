import { articles } from '../data/mock';
import type { LeagueSlug } from '../types';

export async function getArticles(opts?: { league?: LeagueSlug; limit?: number }) {
let list = [...articles];
if (opts?.league) list = list.filter((a) => a.league === opts.league);
list.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
if (opts?.limit) list = list.slice(0, opts.limit);
return list;
}


export async function getArticle(slug: string) {
return articles.find((a) => a.slug === slug) ?? null;
}