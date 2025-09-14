import { Article, Match } from '../types';

export const articles: Article[] = [
{
id: 'a5',
slug: 'ucl-group-stage-preview',
title: 'พรีวิวรอบแบ่งกลุ่ม UCL — กลุ่มแห่งความตายอีกแล้ว?',
excerpt: 'จับตาทีมม้ามืดและคีย์แมนในแต่ละกลุ่ม',
league: 'ucl',
tags: ['preview'],
heroImage: 'https://picsum.photos/seed/ucl/800/450',
publishedAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
author: 'CFTH Europe',
},
];


export const matches: Match[] = [
{
id: 'm1',
league: 'premier-league',
home: 'Man City',
away: 'Chelsea',
date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
status: 'FT',
score: { home: 2, away: 1 },
},
{
id: 'm2',
league: 'laliga',
home: 'Barcelona',
away: 'Sevilla',
date: new Date(Date.now() + 2 * 3600_000).toISOString(),
status: 'NS',
},
{
id: 'm3',
league: 'bundesliga',
home: 'Bayern',
away: 'Dortmund',
date: new Date(Date.now() - 3 * 3600_000).toISOString(),
status: 'FT',
score: { home: 3, away: 3 },
},
{
id: 'm4',
league: 'serie-a',
home: 'Inter',
away: 'Lazio',
date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
status: 'FT',
score: { home: 1, away: 0 },
},
{
id: 'm5',
league: 'ucl',
home: 'PSG',
away: 'Arsenal',
date: new Date(Date.now() + 24 * 3600_000).toISOString(),
status: 'NS',
},
];