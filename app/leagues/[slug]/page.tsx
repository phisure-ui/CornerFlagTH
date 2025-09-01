import ClubLogo from '@/components/ClubLogo';

const nameMap: Record<string, string> = {
  'premier-league': 'พรีเมียร์ลีก',
  'la-liga': 'ลาลีก้า',
  'bundesliga': 'บุนเดสลีก้า',
  'serie-a': 'กัลโซ่ซีรีอา',
  'ucl': 'ยูฟ่าแชมเปี้ยนส์ลีก',
};

type MatchLite = {
  id: string;
  time: string;
  status: 'LIVE' | 'FT' | 'NS';
  home: { name: string; slug: string; score?: number };
  away: { name: string; slug: string; score?: number };
};

const fixturesBySlug: Record<string, MatchLite[]> = {
  'premier-league': [
    { id: 'pl1', time: "80'", status: 'LIVE', home: { name: 'Man City', slug: 'man-city', score: 2 }, away: { name: 'Spurs', slug: 'tottenham', score: 1 } },
    { id: 'pl2', time: '23:30', status: 'NS', home: { name: 'Aston Villa', slug: 'aston-villa' }, away: { name: 'Newcastle', slug: 'newcastle' } },
  ],
  'la-liga': [
    { id: 'll1', time: 'FT', status: 'FT', home: { name: 'Real Madrid', slug: 'real-madrid', score: 3 }, away: { name: 'Real Betis', slug: 'real-betis', score: 0 } },
    { id: 'll2', time: '22:30', status: 'NS', home: { name: 'Barcelona', slug: 'barcelona' }, away: { name: 'Sevilla', slug: 'sevilla' } },
  ],
  'bundesliga': [
    { id: 'bl1', time: '21:30', status: 'NS', home: { name: 'Leipzig', slug: 'leipzig' }, away: { name: 'Bayern', slug: 'bayern-munich' } },
  ],
  'serie-a': [
    { id: 'sa1', time: 'FT', status: 'FT', home: { name: 'Inter', slug: 'inter', score: 2 }, away: { name: 'Atalanta', slug: 'atalanta', score: 0 } },
  ],
  'ucl': [
    { id: 'ucl1', time: '02:00', status: 'NS', home: { name: 'Man City', slug: 'man-city' }, away: { name: 'Leipzig', slug: 'leipzig' } },
  ],
};

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props) {
  const title = nameMap[params.slug] ? `${nameMap[params.slug]} — CornerFlagTH` : 'Leagues — CornerFlagTH';
  return { title };
}

export default function LeaguePage({ params }: Props) {
  const display = nameMap[params.slug] ?? 'ลีก';
  const fixtures = fixturesBySlug[params.slug] ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-2">{display}</h1>
      <p className="text-neutral-600 mb-6">ข่าว, ไฮไลต์, โปรแกรม และตารางคะแนนของ {display}</p>

      <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: '#E5E7EB' }}>
        <div className="px-4 py-3 text-sm font-semibold" style={{ background: '#0A0A0A', color: '#FFFFFF' }}>
          โปรแกรม / ผลการแข่งขัน
        </div>
        <div className="p-3 grid gap-2">
          {fixtures.length === 0 && <div className="text-sm text-neutral-500">ยังไม่มีข้อมูลตัวอย่างสำหรับลีกนี้</div>}
          {fixtures.map((m) => {
            const isFT = m.status === 'FT';
            return (
              <div key={m.id} className="flex items-center justify-between gap-3 px-3 py-2 bg-white rounded-xl border" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1 min-w-0">
                    <ClubLogo slug={m.home.slug} name={m.home.name} />
                    <span className="truncate font-medium text-neutral-900">{m.home.name}</span>
                  </div>
                  <span className="text-neutral-400">vs</span>
                  <div className="flex items-center gap-1 min-w-0">
                    <ClubLogo slug={m.away.slug} name={m.away.name} />
                    <span className="truncate font-medium text-neutral-900">{m.away.name}</span>
                  </div>
                </div>
                <div className="w-20 text-right font-semibold">
                  {isFT ? `${m.home.score}\u00A0–\u00A0${m.away.score}` : m.time}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
