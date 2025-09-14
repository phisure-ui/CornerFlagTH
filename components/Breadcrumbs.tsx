// components/Breadcrumbs.tsx
import Link from 'next/link';

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {it.href && !isLast ? (
                <Link className="hover:underline" href={it.href}>
                  {it.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-gray-700 dark:text-gray-200' : ''}>
                  {it.label}
                </span>
              )}
              {!isLast && <span className="text-gray-400 dark:text-gray-600">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
