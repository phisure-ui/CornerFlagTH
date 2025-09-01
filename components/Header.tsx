'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

const brand = { orange: '#FF6B00', black: '#0A0A0A' };

const NAV = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/scores', label: 'สกอร์' },
  { href: '/news', label: 'ข่าว' },
  { href: '/videos', label: 'วิดีโอ' },
  { href: '/leagues/premier-league', label: 'ลีกส์' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <>
      {/* Skip to content (ต้องมี .skip-link ใน globals.css) */}
      <a href="#main" className="skip-link">ข้ามไปเนื้อหา</a>

      <header
        className={`sticky top-0 z-50 border-b border-neutral-200/70 bg-white/90 backdrop-blur transition-shadow
        ${scrolled ? 'shadow-[0_1px_16px_rgba(0,0,0,0.12)]' : ''}`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/brand/cornerflagth-logo.svg"
              alt="CornerFlagTH"
              className="h-6 w-auto"
            />
            <span className="sr-only">CornerFlagTH</span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="เมนูหลัก">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="rounded-md px-3 py-2 text-sm font-medium"
                  style={{
                    color: active ? brand.orange : '#111827',
                    background: active ? '#FFF6F0' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto" />

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md border px-2 py-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="เปิดเมนู"
            aria-expanded={open}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="border-t bg-white md:hidden">
            <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-2" aria-label="เมนูหลัก (มือถือ)">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium"
                    style={{
                      color: active ? brand.orange : '#111827',
                      background: active ? '#FFF6F0' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
