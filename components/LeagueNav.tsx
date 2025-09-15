'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { slug: 'premier-league', label: 'Premier League' },
  { slug: 'laliga',          label: 'LaLiga' },
  { slug: 'bundesliga',      label: 'Bundesliga' },
  { slug: 'serie-a',         label: 'Serie A' },
  { slug: 'ucl',             label: 'UCL' },
];

export default function LeagueNav() {
  const pathname = usePathname();
  const isActive = (slug: string) =>
    pathname === `/leagues/${slug}` || pathname?.startsWith(`/leagues/${slug}`);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-wrap gap-2 p-4">
        {LINKS.map((l) => (
          <Link
            key={l.slug}
            href={`/leagues/${l.slug}`}
            className={`chip ${isActive(l.slug) ? 'chip-active' : ''}`}
            aria-current={isActive(l.slug) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
