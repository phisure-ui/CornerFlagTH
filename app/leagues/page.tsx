import Link from "next/link";

const leagues = [
  { slug: "premier-league", th: "พรีเมียร์ลีก" },
  { slug: "la-liga", th: "ลาลีก้า" },
  { slug: "bundesliga", th: "บุนเดสลีก้า" },
  { slug: "serie-a", th: "กัลโซ่ซีรีอา" },
  { slug: "ucl", th: "ยูฟ่าแชมเปี้ยนส์ลีก" },
];

export default function LeaguesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">เลือกลีก</h1>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {leagues.map(l => (
          <li key={l.slug} className="rounded-2xl bg-white border p-4 hover:shadow">
            <Link href={`/leagues/${l.slug}`} className="font-semibold text-neutral-900">{l.th}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
