'use client';
import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';
const KEY = 'theme';

function setDark(isDark: boolean) {
  const root = document.documentElement;
  const body = document.body;
  if (isDark) {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
  }
  root.style.colorScheme = isDark ? 'dark' : 'light';
  try { localStorage.setItem(KEY, isDark ? 'dark' : 'light'); } catch {}
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Mode | null) ?? null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Mode = saved ?? (prefersDark ? 'dark' : 'light');
    setDark(initial === 'dark');
    setMode(initial);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next: Mode = mode === 'dark' ? 'light' : 'dark';
        setDark(next === 'dark');
        setMode(next);
      }}
      aria-label="Toggle dark mode"
      className="rounded-full border px-3 py-1 text-sm hover:shadow-sm transition dark:border-gray-700"
      title={mode === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
    >
      {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
