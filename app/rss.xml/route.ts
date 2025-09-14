// app/rss.xml/route.ts
import { getArticles } from '@/lib/adapters/articles';

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://cornerflagth.com';

  const list = await getArticles({ limit: 50 });

  const esc = (s: string | undefined) =>
    (s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const items = list
    .map((a) => {
      const link = `${siteUrl}/news/${a.slug}`;
      const pub = new Date(a.publishedAt).toUTCString();
      const desc = esc(a.excerpt) || '—';
      return `
  <item>
    <title>${esc(a.title)}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <pubDate>${pub}</pubDate>
    <description><![CDATA[${desc}]]></description>
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>CornerFlagTH</title>
  <link>${siteUrl}</link>
  <language>th-TH</language>
  <description>ข่าวและสกอร์ฟุตบอลยุโรป</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}
