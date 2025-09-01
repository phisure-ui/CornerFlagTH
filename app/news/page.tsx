import ClubLogo from '@/components/ClubLogo';

export const metadata = { title: 'News — CornerFlagTH' };

export default function NewsList() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">ข่าวทั้งหมด</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article className="rounded-2xl bg-white border overflow-hidden">
          <div className="h-36 bg-neutral-200" />
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <ClubLogo slug="man-city" name="Man City" size={16} />
              <span>Man City</span>
              <span className="opacity-60">vs</span>
              <ClubLogo slug="tottenham" name="Spurs" size={16} />
              <span>Spurs</span>
            </div>
            <h3 className="font-bold text-neutral-900">แมนฯ ซิตี้ 2–1 สเปอร์ส: ประเด็นหลังเกม</h3>
          </div>
        </article>

        <article className="rounded-2xl bg-white border overflow-hidden">
          <div className="h-36 bg-neutral-200" />
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <ClubLogo slug="real-madrid" name="Real Madrid" size={16} />
              <span>Real Madrid</span>
            </div>
            <h3 className="font-bold text-neutral-900">เรอัลมาดริด หมุนเวียนก่อนนัดชปล. อันเช่เผยสภาพทีม</h3>
          </div>
        </article>

        <article className="rounded-2xl bg-white border overflow-hidden">
          <div className="h-36 bg-neutral-200" />
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <ClubLogo slug="inter" name="Inter" size={16} />
              <span>Inter</span>
              <span className="opacity-60">/ เซเรีย อา</span>
            </div>
            <h3 className="font-bold text-neutral-900">อินเตอร์: วิเคราะห์ความยืดหยุ่นเกมรุกในซีซันล่าสุด</h3>
          </div>
        </article>
      </div>
    </main>
  );
}
