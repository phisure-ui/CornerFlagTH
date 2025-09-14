import { matches } from '../data/mock';
import type { Match, LeagueSlug } from '../types';

export async function getMatches(opts?: { league?: LeagueSlug; limit?: number }) {
  let list: Match[] = [...matches];
  if (opts?.league) list = list.filter((m) => m.league === opts.league);
  list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getMatch(id: string): Promise<Match | null> {
  return matches.find((m) => m.id === id) ?? null;
}
