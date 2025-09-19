// components/ScoreTile.tsx
import Link from 'next/link';
import type { Match, LeagueSlug } from '@/lib/types';

const LEAGUE_NAME: Record<LeagueSlug, string> = {
  'premier-league': 'premier-league',
  laliga: 'laliga',
  bundesliga: 'bundesliga',
  'serie-a': 'serie-a',
  ucl: 'ucl',
};

export default function ScoreTile({
  league,
  matches,
}: {
  league: LeagueSlug;
  matches: Match[];
}) {
  // ใช้แมตช์แรกของลีกนั้น ๆ (ถ้าไม่มีจะเป็น undefined)
  const m = matches?.[0];

  const kickoff = m
    ? m.status === 'NS'
      ? new Date(m.date).toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit' })
      : m.status
    : '-';

  const scoreText =
    m && m.status !== 'NS'
      ? `${m.score?.home ?? 0} - ${m.score?.away ?? 0}`
      : '-';

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
        <span>{LEAGUE_NAME[league]}</span>
        <span>{kickoff}</span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-lg">
        <div className="truncate">{m?.home ?? '-'}</div>
        <div className="text-center font-semibold">{scoreText}</div>
        <div className="truncate text-right">{m?.away ?? '-'}</div>
      </div>

      {m?.status && m.status !== 'NS' && (
        <div className="mt-1 text-right text-xs text-gray-500">{m.status}</div>
      )}

      <div className="mt-3">
        <Link href={`/leagues/${league}`} className="btn btn-outline w-full">
          ดูทั้งหมด
        </Link>
      </div>
    </div>
  );
}
