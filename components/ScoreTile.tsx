import type { Match } from '@/lib/types';

export default function ScoreTile({ match }: { match: Match }) {
  const kickoff =
    match.status === 'NS'
      ? new Date(match.date).toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit' })
      : match.status;

  return (
    <div className="card p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{match.league}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{kickoff}</span>
      </div>

      <div className="space-y-2">
        <Row team={match.home} score={match.score?.home} bold finished={match.status === 'FT'} />
        <Row team={match.away} score={match.score?.away} finished={match.status === 'FT'} />
      </div>
    </div>
  );
}

function Row({
  team, score, bold, finished,
}: { team: string; score?: number; bold?: boolean; finished?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className={`truncate ${bold ? 'font-semibold' : ''}`}>{team}</div>
      <div className={`w-6 text-right ${finished ? 'font-bold' : ''}`}>
        {typeof score === 'number' ? score : '-'}
      </div>
    </div>
  );
}
