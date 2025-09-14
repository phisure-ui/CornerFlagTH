// components/ScoreTile.tsx
import type { Match } from '@/lib/types';

export default function ScoreTile({ match }: { match: Match }) {
  const kickoff =
    match.status === 'NS'
      ? new Date(match.date).toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit' })
      : match.status;

  return (
    <div
      className="rounded-xl border p-3 transition
                 border-gray-200 dark:border-gray-800
                 bg-white dark:bg-gray-900"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{match.league}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{kickoff}</span>
      </div>

      <div className="space-y-2">
        <Row team={match.home} score={match.score?.home} bold={true} finished={match.status === 'FT'} />
        <Row team={match.away} score={match.score?.away} bold={false} finished={match.status === 'FT'} />
      </div>
    </div>
  );
}

function Row({
  team,
  score,
  bold,
  finished,
}: {
  team: string;
  score?: number;
  bold?: boolean;
  finished?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className={`truncate ${bold ? 'font-semibold' : ''}`}>{team}</div>
      <div className={`w-6 text-right ${finished ? 'font-bold' : ''}`}>
        {typeof score === 'number' ? score : '-'}
      </div>
    </div>
  );
}
