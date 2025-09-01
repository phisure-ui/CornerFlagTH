'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const brand = { orange: "#FF6B00", black: "#0A0A0A", white: "#FFFFFF" };

const navItems = [
  { href: "/", label: "Home" },
  { href: "/scores", label: "Scores" },
  { href: "/news", label: "News" },
  { href: "/features", label: "Features" },
  { href: "/transfers", label: "Transfers" },
  { href: "/leagues", label: "Leagues" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40" style={{ background: brand.black }}>
      <div className="mx-auto max-w-6xl flex items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/brand/cornerflagth_icon_32.png" alt="CornerFlagTH" className="w-8 h-8 rounded-xl" />
          <span className="font-bold text-white tracking-wide">CornerFlagTH</span>
        </Link>

        {/* Main nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-200">
          {navItems.map(i => {
            const active = i.href === "/" ? pathname === "/" : pathname.startsWith(i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`px-2 py-1 rounded-xl ${active ? "bg-neutral-800 text-white" : "hover:text-white"}`}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        {/* Search + CTA */}
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <input
              className="bg-neutral-800 text-sm text-white placeholder-gray-400 rounded-xl pl-9 pr-3 py-2 w-56 focus:outline-none focus:ring-2"
              placeholder="ค้นหาทีม นักเตะ..."
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2" size={16} color="#9CA3AF" />
          </div>
          <Link
            href="#subscribe"
            className="px-3 py-2 rounded-xl text-sm font-medium"
            style={{ background: brand.orange, color: brand.white }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
