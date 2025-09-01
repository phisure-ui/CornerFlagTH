'use client';

import { useState } from 'react';

type Props = { slug: string; name: string; size?: number; className?: string };

export default function ClubLogo({ slug, name, size = 20, className }: Props) {
  const [error, setError] = useState(false);

  // Fallback เป็นวงกลม + อักษรย่อ ถ้ารูปหาย
  if (error) {
    const initials =
      (name || slug)
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((s) => s[0]!.toUpperCase())
        .slice(0, 2)
        .join('') || 'FC';

    return (
      <span
        aria-label={name}
        title={name}
        className={`inline-flex items-center justify-center rounded-full border text-[10px] font-bold ${className || ''}`}
        style={{ width: size, height: size, borderColor: '#E5E7EB', background: '#fff', color: '#111' }}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={`/clubs/${slug}.png`}
      alt={name}
      width={size}
      height={size}
      className={`rounded-full border object-contain ${className || ''}`}
      style={{ width: size, height: size, borderColor: '#E5E7EB' }}
      onError={() => setError(true)}
    />
  );
}
