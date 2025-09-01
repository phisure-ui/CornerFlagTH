'use client';

import { useMemo, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Goal, Trophy, Clock, Flame, ChevronRight as ChevronR } from 'lucide-react';
import Link from 'next/link';
import ClubLogo from '@/components/ClubLogo';

const brand = { orange: '#FF6B00', black: '#0A0A0A', white: '#FFFFFF' };

const leagues = [
  { key: 'premier-league', name: 'พรีเมียร์ลีก', short: 'PL' },
  { key: 'la-liga', name: 'ลาลีก้า', short: 'LL' },
  { key: 'bundesliga', name: 'บุนเดสลีก้า', short: 'BL' },
  { key: 'serie-a', name: 'กัลโซ่ซีรีอา', short: 'SA' },
  { key: 'ucl', name: 'ยูฟ่าแชมเปี้ยนส์ลีก', short: 'UCL' },
  { key: 'others', name: 'อื่นๆ', short: 'OT' },
] as const;

type LeagueKey = typeof leagues[number]['key'];
type MatchStatus = 'LIVE' | 'FT' | 'NS';
type TeamLite = { name: string; slug: string; score?: number };

type Match = {
  id: string;
  league: LeagueKey;
  time: string;
  status: MatchStatus;
  minute?: number;
  home: TeamLite;
  away: TeamLite;
  round?: string;
};

const initialMatches: Match[] = [
  { id: '1', league: 'premier-league', status: 'LIVE', minute: 80, time: "80'", home: { name: 'Man City', slug: 'man-city', score: 2 }, away: { name: 'Spurs', slug: 'tottenham', score: 1 }, round: 'MD 12' },
  { id: '2', league: 'premier-league', status: 'NS', time: '23:30', home: { name: 'Aston Villa', slug: 'aston-villa' }, away: { name: 'Newcastle', slug: 'newcastle' }, round: 'MD 12' },
  { id: '3', league: 'la-liga', status: 'FT', time: 'FT', home: { name: 'Real Madrid', slug: 'real-madrid', score: 3 }, away: { name: 'Real Betis', slug: 'real-betis', score: 0 }, round: 'Jornada 14' },
  { id: '4', league: 'la-liga', status: 'NS', time: '22:30', home: { name: 'Barcelona', slug: 'barcelona' }, away: { name: 'Sevilla', slug: 'sevilla' }, round: 'Jornada 14' },
  { id: '5', league: 'bundesliga', status: 'NS', time: '21:30', home: { name: 'Leipzig', slug: 'leipzig' }, away: { name: 'Bayern', slug: 'bayern-munich' }, round: 'Spieltag 12' },
  { id: '6', league: 'serie-a', status: 'FT', time: 'FT', home: { name: 'Inter', slug: 'inter', score: 2 }, away: { name: 'Atalanta', slug: 'atalanta', score: 0 }, round: 'Giornata 12' },
  { id: '7', league: 'ucl', status: 'NS', time: '02:00', home: { name: 'Man City', slug: 'man-city' }, away: { name: 'Leipzig', slug: 'leipzig' }, round: 'Group G' },
];

function LiveDot() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: brand.orange, opacity: 0.6 }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: brand.orange }} />
    </span>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm whitespace-nowrap border transition-colors ${active ? 'text-white' : 'text-neutral-700'}`}
      style={{ background: active ? brand.orange : 'white', borderColor: active ? brand.orange : '#E5E7EB' }}
    >
      {children}
    </button>
  );
}

function MatchRow({ m }: { m: Match }) {
  const isLive = m.status === 'LIVE';
  const isFT = m.status === 'FT';
  const homeWin = isFT && (m.home.score ?? 0) > (m.away.score ?? 0);
  const awayWin = isFT && (m.away.score ?? 0) > (m.home.score ?? 0);

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 bg-white hover:bg-neutral-50 rounded-xl border" style={{ borderColor: '#E5E7EB' }}>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-semibold" style={{ color: brand.orange }}>{leagues.find(l => l.key === m.league)?.short}</span>
        <div className="flex items-center gap-1 min-w-0">
          <ClubLogo slug={m.home.slug} name={m.home.name} />
          <span className={`truncate font-medium ${homeWin ? 'text-neutral-900' : 'text-neutral-800'}`}>{m.home.name}</span>
        </div>
        <span className="text-neutral-400">vs</span>
        <div className="flex items-center gap-1 min-w-0">
          <ClubLogo slug={m.away.slug} name={m.away.name} />
          <span className={`truncate font-medium ${awayWin ? 'text-neutral-900' : 'text-neutral-800'}`}>{m.away.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLive && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: brand.orange }}>
            <LiveDot /> LIVE
          </span>
        )}
        <div className="w-16 text-right font-semibold" style={{ color: isLive ? brand.orange : '#111827' }}>
          {isFT ? `${m.home.score}\u00A0–\u00A0${m.away.score}` : m.time}
        </div>
      </div>
    </div>
  );
}

function LeagueSection({ leagueKey, matches }: { leagueKey: LeagueKey; matches: Match[] }) {
  const league = leagues.find(l => l.key === leagueKey)!;
  return (
    <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: '#E5E7EB' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: brand.black, color: brand.white }}>
        <div className="flex items-center gap-2">
          <Trophy size={16} color={brand.orange} />
          <span className="font-semibold text-sm">{league.name}</span>
        </div>
        <span className="text-xs opacity-80">{matches[0]?.round ?? ''}</span>
      </div>
      <div className="p-3 grid gap-2">
        {matches.map((m) => <MatchRow key={m.id} m={m} />)}
      </div>
    </section>
  );
}

export default function ScoresPage() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueKey | 'all'>('all');
  const [day, setDay] = useState(0);

  const dayLabel = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + day);
    return d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short' });
  }, [day]);

  const liveMatches = initialMatches.filter(m => m.status === 'LIVE' && (selectedLeague === 'all' || m.league === selectedLeague));

  const groups = useMemo(() => {
    const map = new Map<LeagueKey, Match[]>();
    for (const l of leagues) map.set(l.key, []);
    for (const m of initialMatches) {
      if (selectedLeague !== 'all' && m.league !== selectedLeague) continue;
      map.get(m.league)!.push(m);
    }
    return Array.from(map.entries()).filter(([_, arr]) => arr.length > 0) as [LeagueKey, Match[]][];
  }, [selectedLeague]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Header & controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Goal size={22} color={brand.orange} /> สกอร์วันนี้
        </h1>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setDay(d => d - 1)} className="p-2 rounded-lg border bg-white" aria-label="Previous day"><ChevronLeft size={16} /></button>
          <div className="px-3 py-2 rounded-lg border bg-white flex items-center gap-2 text-sm"><Calendar size={16} /><span>{dayLabel}</span></div>
          <button onClick={() => setDay(d => d + 1)} className="p-2 rounded-lg border bg-white" aria-label="Next day"><ChevronRight size={16} /></button>
          <button onClick={() => setDay(0)} className="px-3 py-2 rounded-lg text-sm font-medium" style={{ background: brand.orange, color: brand.white }}>วันนี้</button>
        </div>
      </div>

      {/* League chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 mb-4">
        <Chip active={selectedLeague === 'all'} onClick={() => setSelectedLeague('all')}>ทั้งหมด</Chip>
        {leagues.map((l) => (
          <Chip key={l.key} active={selectedLeague === l.key} onClick={() => setSelectedLeague(l.key)}>
            {l.name}
          </Chip>
        ))}
      </div>

      {/* Live ticker */}
      {liveMatches.length > 0 && (
        <div className="mb-4 rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
          <div className="px-4 py-2 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
            <Flame size={16} color={brand.orange} />
            <span className="text-sm font-semibold">กำลังแข่งขัน</span>
          </div>
          <div className="p-3 flex gap-2 overflow-x-auto">
            {liveMatches.map(m => (
              <div key={m.id} className="flex items-center gap-2 px-3 py-2 rounded-full text-sm border bg-white whitespace-nowrap" style={{ borderColor: '#E5E7EB' }}>
                <LiveDot />
                <ClubLogo slug={m.home.slug} name={m.home.name} />
                <span className="font-medium">{m.home.name}</span>
                <span className="opacity-60">{m.home.score}\u00A0–\u00A0{m.away.score}</span>
                <span className="font-medium">{m.away.name}</span>
                <ClubLogo slug={m.away.slug} name={m.away.name} />
                <span className="text-xs" style={{ color: brand.orange }}>{m.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* By league */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid gap-4">
          {groups.map(([key, arr]) => (
            <LeagueSection key={key} leagueKey={key} matches={arr} />
          ))}
        </div>

        {/* Sidebar mocks */}
        <aside className="grid gap-4">
          <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: '#E5E7EB' }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
              <Trophy size={16} color={brand.orange} />
              <span className="text-sm font-semibold">ตารางคะแนน (ตัวอย่าง)</span>
            </div>
            <div className="p-3 text-sm">
              <table className="w-full">
                <thead className="text-neutral-500">
                  <tr>
                    <th className="text-left font-medium">ทีม</th>
                    <th className="text-right font-medium">แข่ง</th>
                    <th className="text-right font-medium">แต้ม</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { team: 'Man City', p: 12, pts: 30 },
                    { team: 'Arsenal', p: 12, pts: 28 },
                    { team: 'Liverpool', p: 12, pts: 27 },
                    { team: 'Spurs', p: 12, pts: 25 },
                    { team: 'Aston Villa', p: 12, pts: 23 },
                  ].map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2">{i + 1}. {r.team}</td>
                      <td className="py-2 text-right">{r.p}</td>
                      <td className="py-2 text-right font-semibold">{r.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/leagues/premier-league" className="inline-flex items-center gap-1 text-sm mt-2" style={{ color: brand.orange }}>
                ดูตารางเต็ม <ChevronR size={16} />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: '#E5E7EB' }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
              <Clock size={16} color={brand.orange} />
              <span className="text-sm font-semibold">โปรแกรมเด่นพรุ่งนี้</span>
            </div>
            <ul className="p-3 text-sm space-y-2">
              <li className="flex items-center justify-between"><span>Barcelona vs Sevilla</span><span className="text-neutral-500">22:30</span></li>
              <li className="flex items-center justify-between"><span>Napoli vs Milan</span><span className="text-neutral-500">01:45</span></li>
              <li className="flex items-center justify-between"><span>Dortmund vs Leverkusen</span><span className="text-neutral-500">23:30</span></li>
            </ul>
          </section>
        </aside>
      </div>

      <p className="text-xs text-neutral-500 mt-6">
        Tip: วางโลโก้ทีมไว้ที่ <code>public/clubs/&lt;slug&gt;.png</code> เช่น <code>public/clubs/man-city.png</code>. ถ้าไม่มีไฟล์ ระบบจะแสดงอักษรย่อแทน.
      </p>
    </main>
  );
}
