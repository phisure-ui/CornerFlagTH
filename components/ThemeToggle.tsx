// components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';
const KEY = 'theme';

function applyTheme(next: Mode) {
  const root = document.documentElement;
  const body = document.body;
  const isDark = next === 'dark';
  root.classList.toggle('dark', isDark);
  body.classList.toggle('dark', isDark);      // << เพิ่มบรรทัดนี้กันพลาด
  root.style.colorScheme = next;
  try { localStorage.setItem(KEY, next); } catch {}
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Mode | null) ?? null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Mode = saved ?? (prefersDark ? 'dark' : 'light');
    applyTheme(initial);
    setMode(initial);
  }, []);

  return (
    <button
      type="button"
      onClick={() => { const next = mode === 'dark' ? 'light' : 'dark'; applyTheme(next); setMode(next); }}
      className="rounded-full border px-3 py-1 text-sm hover:shadow-sm transition dark:border-gray-700"
      aria-label="Toggle dark mode"
      title={mode === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
    >
      {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
