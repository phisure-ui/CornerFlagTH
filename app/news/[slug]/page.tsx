// app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import ShareBar from "@/components/ShareBar";
import JsonLd from "@/components/JsonLd";

/* ---------- Types ---------- */
type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  league?: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  heroImage?: string;
};

/* ---------- Helpers ---------- */
function getOrigin() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto =
    h.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "https://cornerflagth.com";
}

function prettyFromSlug(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

async function getArticle(slug: string): Promise<Article | null> {
  const origin = getOrigin();
  try {
    const res = await fetch(`${origin}/api/articles`, { next: { revalidate: 60 } });
    const data = await res.json();
    const list = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    const raw = list.find((a: any) => a.slug === slug);
    if (!raw) return null;

    return {
      slug: raw.slug,
      title: raw.title,
      excerpt: raw.excerpt ?? "",
      content: raw.content ?? "",
      league: raw.league,
      publishedAt: raw.publishedAt ?? raw.date ?? new Date().toISOString(),
      updatedAt: raw.updatedAt,
      heroImage: raw.heroImage ?? raw.image,
    };
  } catch {
    return null;
  }
}

/* ---------- Metadata ---------- */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const origin = getOrigin();
  const article = await getArticle(params.slug);

  const title = article
    ? `${article.title} | CornerFlagTH`
    : `${prettyFromSlug(params.slug)} | CornerFlagTH`;

  const description =
    article?.excerpt ?? "ข่าวบอล รายงานผล และบทความวิเคราะห์จาก CornerFlagTH";

  const pageUrl = `${origin}/news/${params.slug}`;
  const ogImg = article?.heroImage
    ? article.heroImage.startsWith("http")
      ? article.heroImage
      : `${origin}${article.heroImage}`
    : `${origin}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: "CornerFlagTH",
      locale: "th_TH",
      title,
      description,
      images: [
        { url: ogImg, width: 1200, height: 630, alt: article?.title ?? "CornerFlagTH" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
    },
  };
}

/* ---------- Page ---------- */
export default async function ArticlePage({
  params,
}: { params: { slug: string } }) {
  const origin = getOrigin();
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">ไม่พบบทความ</h1>
        <p className="mt-4">
          <Link href="/news" className="underline text-blue-600">ดูข่าวทั้งหมด</Link>
        </p>
      </main>
    );
  }

  const imgSrc = article.heroImage
    ? article.heroImage.startsWith("http")
      ? article.heroImage
      : `${origin}${article.heroImage}`
    : `${origin}/og-default.jpg`;

  const canonical = `${origin}/news/${article.slug}`;

  /* ----- JSON-LD objects ----- */
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: canonical,
    image: [imgSrc],
    author: [{ "@type": "Organization", name: "CornerFlagTH" }],
    publisher: {
      "@type": "Organization",
      name: "CornerFlagTH",
      logo: { "@type": "ImageObject", url: `${origin}/logo-512.png`, width: 512, height: 512 },
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "News", item: `${origin}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  return (
    <main className="pb-10">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 pt-6 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>/</li>
          <li><Link href="/news" className="hover:underline">News</Link></li>
          <li>/</li>
          <li className="font-medium text-gray-700 dark:text-gray-200">{article.title}</li>
        </ol>
      </nav>

      <article className="container mx-auto px-4 py-4">
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">{article.title}</h1>
          <div className="mt-2 text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleString("th-TH", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </header>

        <figure className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={imgSrc} alt={article.title} fill sizes="100vw" className="object-cover" priority />
        </figure>

        <div className="prose lg:prose-lg dark:prose-invert mt-8">
          <p>{article.excerpt}</p>
        </div>

        <div className="mt-6">
          <ShareBar url={canonical} title={article.title} />
        </div>
      </article>

      {/* JSON-LD scripts */}
      <JsonLd data={jsonLdArticle} />
      <JsonLd data={jsonLdBreadcrumb} />
    </main>
  );
}
