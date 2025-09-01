import Link from 'next/link';

const brand = { orange: '#FF6B00', black: '#0A0A0A' };

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <img src="/brand/cornerflagth-logo.svg" alt="CornerFlagTH" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-neutral-600">
              ข่าวฟุตบอลยุโรป พรีเมียร์ลีก ลาลีก้า บุนเดสลีก้า และอีกมากมาย
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">หมวดหมู่</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:underline">ข่าว</Link></li>
              <li><Link href="/scores" className="hover:underline">สกอร์</Link></li>
              <li><Link href="/videos" className="hover:underline">วิดีโอ</Link></li>
              <li><Link href="/leagues/premier-league" className="hover:underline">ลีกส์</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">ข้อมูล</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">เกี่ยวกับเรา</Link></li>
              <li><Link href="/contact" className="hover:underline">ติดต่อเรา</Link></li>
              <li><Link href="/terms" className="hover:underline">ข้อกำหนดการใช้งาน</Link></li>
              <li><Link href="/privacy" className="hover:underline">นโยบายความเป็นส่วนตัว</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">ติดตาม</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">X (Twitter)</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-xs text-neutral-500">
          © {new Date().getFullYear()} CornerFlagTH • สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  );
}
