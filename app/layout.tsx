// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import LeagueNav from '@/components/LeagueNav';

export const metadata: Metadata = {
  title: 'CornerFlagTH',
  description: 'ข่าว+สกอร์ฟุตบอลยุโรปแบบกระชับ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gray-50 text-[#111] antialiased">
        {/* แถบเมนูลีกแบบ sticky */}
        <LeagueNav />

        {/* พื้นที่คอนเทนต์หลัก */}
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
