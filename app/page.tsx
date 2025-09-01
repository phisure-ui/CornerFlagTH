import Link from "next/link";
import { Flame, Calendar, ChevronRight, Trophy } from "lucide-react";
import VideoRow, { VideoRowItem } from "@/components/VideoRow";

const brand = { orange: "#FF6B00", black: "#0A0A0A", white: "#FFFFFF" };

/* ----------------------------- Mock Data ----------------------------- */
const hero = {
  league: "Premier League",
  label: "Match Report",
  title:
    "แมนฯ ซิตี้ 2–1 สเปอร์ส: ประเด็นหลังเกม—โฟเด้นเฉียบ, เป๊ปหมุนไลน์อัพได้ผล",
  byline: "ทีมข่าว CornerFlagTH",
  time: "12 นาทีที่แล้ว",
  image:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop",
};

const trending = [
  { href: "/news/t1", text: "บาร์ซ่าคืนฟอร์ม ไล่จี้โซนหัวตาราง" },
  { href: "/news/t2", text: "อินเตอร์นำโด่ง 5 แต้มก่อนเบรกทีมชาติ" },
  { href: "/news/t3", text: "ดอร์ทมุนด์ปลดล็อคเกมรุก เกมล่าสุด" },
];

const fixturesToday = [
  { league: "PL", home: "MCI", away: "TOT", status: "Live 78’" },
  { league: "LL", home: "RMA", away: "BET", status: "FT 3–0" },
  { league: "SA", home: "INT", away: "ATA", status: "21:45" },
];

const latestNews = [
  {
    id: "n1",
    league: "Premier League",
    time: "20 นาทีที่แล้ว",
    title: "โฟเด้นย้ำชัด: เทนฮากปรับเกมรับผิดขึ้นมากแม้แพ้",
    image:
      "https://images.unsplash.com/photo-1593349481066-5b7b0c55d07e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n2",
    league: "La Liga",
    time: "35 นาทีที่แล้ว",
    title: "เรอัลมาดริด หมุนเวียนก่อนนัดชปล. อันเช่เผยสภาพทีม",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n3",
    league: "Bundesliga",
    time: "1 ชม.ที่แล้ว",
    title: "ไลป์ซิกทดสอบระบบ 3-4-2-1 ก่อนดวลบาเยิร์น",
    image:
      "https://images.unsplash.com/photo-1542422434-1fc2c5a2b6a1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n4",
    league: "Serie A",
    time: "2 ชม.ที่แล้ว",
    title: "นาโปลีปล่อยยืมดาวรุ่ง เปิดโอกาสชุดใหญ่",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
  },
  // แถวสอง
  {
    id: "n5",
    league: "Premier League",
    time: "3 ชม.ที่แล้ว",
    title: "สเปอร์สเช็คฟิต อีริค ไดเออร์ ก่อนเยือนบ๊อกซิ่งเดย์",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n6",
    league: "La Liga",
    time: "4 ชม.ที่แล้ว",
    title: "อันซู ฟาติ เริ่มซ้อมเดี่ยว ลุ้นคืนทีม",
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n7",
    league: "Bundesliga",
    time: "5 ชม.ที่แล้ว",
    title: "ดาร์บี้แห่งไรน์: สถิติ-ไฮไลต์-คีย์แมนที่ต้องจับตา",
    image:
      "https://images.unsplash.com/photo-1544911426-1c2f0dd3ed37?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "n8",
    league: "Serie A",
    time: "6 ชม.ที่แล้ว",
    title: "มิลานอัพเดตอาการเจ็บกองหลังตัวหลัก",
    image:
      "https://images.unsplash.com/photo-1518081461904-9ac3d7c5a623?q=80&w=1200&auto=format&fit=crop",
  },
];

const leagueChips = [
  "พรีเมียร์ลีก",
  "ลาลีก้า",
  "บุนเดสลีก้า",
  "กัลโซ่ซีรีอา",
  "ยูฟ่าแชมเปี้ยนส์ลีก",
  "อื่นๆ",
];

const videoRowItems: VideoRowItem[] = [
  {
    id: "v1",
    title:
      "Man City 'missed the simple things' in loss to Spurs - Guardiola",
    href: "/videos/v1",
    thumbnail:
      "https://images.unsplash.com/photo-1587385789090-0399d95323d9?q=80&w=1600&auto=format&fit=crop",
    duration: "1:24",
    metaLeft: "Premier League",
    metaRight: "23h",
  },
  {
    id: "v2",
    title: "Guehi on playing to 40 and his love of wrestling",
    href: "/videos/v2",
    thumbnail:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600&auto=format&fit=crop",
    duration: "2:32",
    metaLeft: "Swansea",
    metaRight: "1d",
  },
  {
    id: "v3",
    title: "‘Our relationship has changed’ – Nuno on Forest owner",
    href: "/videos/v3",
    thumbnail:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
    duration: "0:43",
    metaLeft: "Premier League",
    metaRight: "1d",
  },
  {
    id: "v4",
    title: "No doubt the players would welcome Isak back – Howe",
    href: "/videos/v4",
    thumbnail:
      "https://images.unsplash.com/photo-1542422434-1fc2c5a2b6a1?q=80&w=1600&auto=format&fit=crop",
    duration: "1:27",
    metaLeft: "Football",
    metaRight: "2d",
  },
  {
    id: "v5",
    title: "‘The hunger makes me want more’ – Salah wins third PFA award",
    href: "/videos/v5",
    thumbnail:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1600&auto=format&fit=crop",
    duration: "2:59",
    metaLeft: "Premier League",
    metaRight: "4d",
  },
];

/* ----------------------------- Helpers ----------------------------- */
function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline justify-between">
      <h2 className="text-2xl font-extrabold">{children}</h2>
      {action}
    </div>
  );
}

function NewsCard({ title, league, time, image, href = "#" }: { title: string; league: string; time: string; image: string; href?: string }) {
  return (
    <Link href={href} className="rounded-2xl overflow-hidden border bg-white hover:bg-neutral-50 transition" style={{ borderColor: "#E5E7EB" }}>
      <div className="h-40 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="rounded-full px-3 py-1 font-bold" style={{ background: "#FFE7D7", color: brand.orange }}>
            {league}
          </span>
          <span className="text-neutral-500">{time}</span>
        </div>
        <h3 className="line-clamp-2 text-neutral-900 font-bold">{title}</h3>
      </div>
    </Link>
  );
}

/* ------------------------------ Page ------------------------------- */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* HERO + Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* HERO */}
        <section className="lg:col-span-2 rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
          <div className="relative h-72 w-full md:h-96">
            <img src={hero.image} alt="hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
            <div className="absolute bottom-0 p-6 md:p-8">
              <div className="mb-2 flex gap-2">
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: brand.orange, color: brand.white }}>
                  {hero.league}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium">{hero.label}</span>
              </div>
              <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-white md:text-4xl">{hero.title}</h1>
              <div className="mt-2 text-sm text-white/90">
                <span>โดย {hero.byline}</span> · <span>{hero.time}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="grid gap-4">
          {/* Trending */}
          <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
              <Flame size={16} color={brand.orange} />
              <span className="text-sm font-semibold">Trending</span>
            </div>
            <ul className="p-4 space-y-3 text-sm">
              {trending.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="hover:underline">
                    {t.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Fixtures Today */}
          <section className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
              <Calendar size={16} color={brand.orange} />
              <span className="text-sm font-semibold">Fixtures Today</span>
            </div>
            <ul className="p-4 space-y-2 text-sm">
              {fixturesToday.map((f, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: "#F3F4F6", color: "#111" }}>
                      {f.league}
                    </span>
                    <span className="font-medium">
                      {f.home} <span className="opacity-60">vs</span> {f.away}
                    </span>
                  </div>
                  <span className="text-neutral-500">{f.status}</span>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4">
              <Link href="/scores" className="inline-flex items-center gap-1 text-sm" style={{ color: brand.orange }}>
                ดูทั้งหมด <ChevronRight size={16} />
              </Link>
            </div>
          </section>
        </aside>
      </div>

      {/* ข่าวล่าสุด */}
      <SectionTitle action={<Link href="/news" className="text-sm font-medium" style={{ color: brand.orange }}>ดูข่าวทั้งหมด</Link>}>
        ข่าวล่าสุด
      </SectionTitle>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {latestNews.slice(0, 8).map((n) => (
          <NewsCard key={n.id} title={n.title} league={n.league} time={n.time} image={n.image} href={`/news/${n.id}`} />
        ))}
      </div>

      {/* เลือกลีก */}
      <h3 className="mt-10 mb-3 text-xl font-extrabold">เลือกลีก</h3>
      <div className="flex flex-wrap gap-3">
        {leagueChips.map((name) => (
          <button key={name} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: "#F3F4F6", background: "#FFF6F0", color: brand.orange }}>
            {name}
          </button>
        ))}
      </div>

      {/* Football video: Horizontal row (ไม่มีป้าย Tag) */}
      <VideoRow title="Football video" items={videoRowItems} viewMoreHref="/videos" />

      {/* บล็อกตัวอย่างปิดท้าย */}
      <section className="mt-10 rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
        <div className="px-4 py-3 flex items-center gap-2" style={{ background: brand.black, color: brand.white }}>
          <Trophy size={16} color={brand.orange} />
          <span className="text-sm font-semibold">บล็อก/สปอนเซอร์ (ตัวอย่าง)</span>
        </div>
        <div className="p-4 text-sm text-neutral-600">วางสปอนเซอร์/โปรโมชัน/ลิงก์สำคัญในอนาคต…</div>
      </section>
    </main>
  );
}
