import type { Match } from '@/lib/types';


export default function ScoreTile({ match }: { match: Match }) {
const kickoff = new Date(match.date);
const timeText =
match.status === 'NS'
? kickoff.toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })
: match.status === 'LIVE'
? 'LIVE'
: 'FT';


return (
<div className="rounded-xl border p-3 bg-white">
<div className="text-xs text-gray-500 mb-1">{match.league}</div>
<div className="flex items-center justify-between gap-3">
<div className="flex-1">
<div className="flex items-center justify-between">
<span>{match.home}</span>
<span className="font-semibold">
{match.score ? match.score.home : '-'}
</span>
</div>
<div className="flex items-center justify-between">
<span>{match.away}</span>
<span className="font-semibold">
{match.score ? match.score.away : '-'}
</span>
</div>
</div>
<div className="text-xs text-gray-600 w-10 text-right">{timeText}</div>
</div>
</div>
);
}