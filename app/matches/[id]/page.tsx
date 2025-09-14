import { notFound } from 'next/navigation';
import { getMatch } from '@/lib/adapters/matches';


export const revalidate = 300;


export default async function MatchPage({ params }: { params: { id: string } }) {
const match = await getMatch(params.id);
if (!match) notFound();


return (
<article className="space-y-4">
<h1 className="text-2xl font-bold">{match.home} vs {match.away}</h1>
<div className="text-sm text-gray-600">{match.league} • {new Date(match.date).toLocaleString('th-TH')}</div>


<div className="rounded-xl border bg-white p-4">
<div className="text-center text-3xl font-extrabold">
{match.score ? `${match.score.home} : ${match.score.away}` : 'ยังไม่เริ่ม'}
</div>
</div>


<section className="grid gap-4 md:grid-cols-3">
<div className="rounded-xl border bg-white p-4">
<h2 className="font-semibold mb-2">ไลน์อัพ (ตัวอย่าง)</h2>
<ul className="text-sm text-gray-700 list-disc pl-5">
<li>Home XI — 4-3-3</li>
<li>Away XI — 4-2-3-1</li>
</ul>
</div>
<div className="rounded-xl border bg-white p-4">
<h2 className="font-semibold mb-2">สถิติหลัก</h2>
<ul className="text-sm text-gray-700 list-disc pl-5">
<li>ยิงทั้งหมด: 12 — 9</li>
<li>ครองบอล: 58% — 42%</li>
<li>เตะมุม: 7 — 3</li>
</ul>
</div>
<div className="rounded-xl border bg-white p-4">
<h2 className="font-semibold mb-2">วิดีโอ/ไฮไลท์</h2>
<p className="text-sm text-gray-600">(ฝังลิงก์ภายหลัง)</p>
</div>
</section>
</article>
);
}