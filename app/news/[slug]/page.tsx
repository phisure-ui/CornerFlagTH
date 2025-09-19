// app/news/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ShareBar from "@/components/ShareBar";
// ปรับ path ให้ตรงกับโปรเจกต์คุณ
import { getArticleBySlug } from "@/lib/articles";

// ---- ช่วยทำให้ URL เป็น absolute เสมอ ----
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

type PageProps = { params: { slug: string } };

// ใช้ revalidate ได้ตามต้องการ (เอาออกได้)
export const revalidate = 60;

// ----- สร้าง Metadata ของหน้านี้ -----
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/news/${article.slug}`;
  const hero = article.heroImage ?? "/og-default.jpg";
  const title = article.title;
  const description = article.excerpt ?? "";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: abs(hero) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [abs(hero)],
    },
  };
}

// ----- หน้า Article -----
export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return notFound();

  const canonical = `${SITE_URL}/news/${article.slug}`;
  const hero = article.heroImage ?? "/og-default.jpg";

  const publishedISO = new Date(article.publishedAt).toISOString();
  const modifiedISO = new Date(article.updatedAt ?? article.publishedAt).toISOString();

  // ---------- JSON-LD: NewsArticle ----------
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: publishedISO,
    dateModified: modifiedISO,
    inLanguage: "th-TH",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    image: [abs(hero)],
    author: [
      { "@type": "Person", name: article.author ?? "CornerFlagTH Desk" },
    ],
    publisher: {
      "@type": "Organization",
      name: "CornerFlagTH",
      logo: { "@type": "ImageObject", url: abs("/icons/icon.png") }, // 512x512
    },
    articleSection: article.league ?? "football",
    url: canonical,
  };

  // ---------- JSON-LD: Breadcrumb ----------
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ข่าว", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  // แปลงเวลาโชว์
  const timeText = new Date(article.publishedAt).toLocaleString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="container mx-auto px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto pt-6">
        <nav className="text-sm text-gray-600 dark:text-gray-300">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-2">/</span>
          <a href="/news" className="hover:underline">News</a>
          <span className="mx-2">/</span>
          <span aria-current="page" className="font-medium">{article.title}</span>
        </nav>

        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          {article.title}
        </h1>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {article.league && (
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
              {article.league}
            </span>
          )}
          <time dateTime={article.publishedAt}>{timeText}</time>
        </div>
      </header>

      {/* Hero image */}
      <figure className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl max-w-4xl mx-auto">
        <Image
          src={hero}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </figure>

      {/* เนื้อหา / excerpt (ใส่ content จริงของคุณแทนได้) */}
      <article className="prose lg:prose-lg dark:prose-invert mt-8 max-w-3xl mx-auto">
        {article.excerpt && <p>{article.excerpt}</p>}
        {/* TODO: แสดงเนื้อหาเต็มถ้าคุณมี field content (HTML/MDX) */}
      </article>

      {/* แถบแชร์ */}
      <div className="max-w-3xl mx-auto mt-8">
        <ShareBar url={canonical} title={article.title} />
      </div>

      {/* ---------- ฝัง JSON-LD (สั่งให้ไม่เตือน hydration) ---------- */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  );
}
