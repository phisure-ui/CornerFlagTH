import JsonLd from '@/components/JsonLd';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3003';

export default function VideoDetailPage({
  params,
}: { params: { id: string } }) {
  const video = {
    id: params.id,
    name: 'Guehi on playing to 40 and his love of wrestling',
    description: 'สัมภาษณ์สั้น ๆ หลังเกม',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600&auto=format&fit=crop',
    uploadDate: '2025-08-29T09:30:00Z',
    contentUrl: `${BASE_URL}/videos/${params.id}`, // ถ้ามีไฟล์วิดีโอจริง ให้ชี้ไฟล์
    embedUrl: `${BASE_URL}/videos/${params.id}`,
    duration: 'PT2M32S',
  };

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    duration: video.duration,
    publisher: {
      '@type': 'Organization',
      name: 'CornerFlagTH',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/brand/cornerflag-logo.svg`,
      },
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd id="video-jsonld" data={jsonld} />
      <h1 className="text-2xl font-extrabold">{video.name}</h1>
      <p className="mt-2 text-neutral-600">{video.description}</p>
      <div className="mt-4 overflow-hidden rounded-2xl">
        <img src={video.thumbnailUrl} alt={video.name} />
      </div>
      {/* วาง player/iframe ของคุณตรงนี้ */}
    </main>
  );
}
