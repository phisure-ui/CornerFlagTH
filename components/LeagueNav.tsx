'use client';
import Link from 'next/link';


const leagues = [
{ name: 'Premier League', slug: 'premier-league' },
{ name: 'LaLiga', slug: 'laliga' },
{ name: 'Bundesliga', slug: 'bundesliga' },
{ name: 'Serie A', slug: 'serie-a' },
{ name: 'UCL', slug: 'ucl' },
];


export default function LeagueNav() {
return (
<nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
<ul className="container mx-auto flex gap-3 overflow-x-auto p-3">
{leagues.map((l) => (
<li key={l.slug}>
<Link
className="px-3 py-1 rounded-full border hover:shadow transition will-change-transform hover:-translate-y-0.5"
href={`/leagues/${l.slug}`}
>
{l.name}
</Link>
</li>
))}
</ul>
</nav>
);
}