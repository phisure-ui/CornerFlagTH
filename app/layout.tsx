// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import LeagueNav from '@/components/LeagueNav';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeStatus from '@/components/ThemeStatus';

export const metadata: Metadata = {
  metadataBase: new URL('https://cornerflagth.com'),
  title: { default: 'CornerFlagTH', template: '%s | CornerFlagTH' },
  description: 'ข่าว สกอร์ และเรื่องราวฟุตบอลยุโรปแบบกระชับ',
  openGraph: { type: 'website', title: 'CornerFlagTH', description: 'ข่าว สกอร์ และเรื่องราวฟุตบอลยุโรปแบบกระชับ', images: ['/og-default.jpg'] },
  twitter: { card: 'summary_large_image', title: 'CornerFlagTH', description: 'ข่าว สกอร์ และเรื่องราวฟุตบอลยุโรปแบบกระชับ', images: ['/og-default.jpg'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeScript = `
    (function() {
      try {
        var saved = localStorage.getItem('theme'); // 'dark' | 'light'
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var initial = saved ? saved : (prefersDark ? 'dark' : 'light');
        if (initial === 'dark') document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = initial;
      } catch (e) {}
    })();
  `;

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try{
                var saved = localStorage.getItem('theme');       // 'dark' | 'light'
                var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var initial = saved ? saved : (prefers ? 'dark' : 'light');
                var isDark = initial === 'dark';
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  if (document.body) document.body.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  if (document.body) document.body.classList.remove('dark');
                }
                document.documentElement.style.colorScheme = initial;
              }catch(e){}
            })();
          `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-[#111] antialiased
                       dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <LeagueNav />
        <div className="container mx-auto px-4 pt-4 flex justify-end">
          <ThemeToggle />
        </div>

        <ThemeStatus />   {/* DEBUG: เอาออกได้หลังทดสอบ */}
        
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
