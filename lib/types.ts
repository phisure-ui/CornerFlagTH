export type LeagueSlug = 'premier-league' | 'laliga' | 'bundesliga' | 'serie-a' | 'ucl';


export interface Article {
id: string;
slug: string;
title: string;
excerpt?: string;
league?: LeagueSlug;
tags?: string[];
heroImage?: string;
publishedAt: string; // ISO
author?: string;
}


export interface Match {
id: string;
league: LeagueSlug;
home: string;
away: string;
date: string; // ISO
status: 'FT' | 'LIVE' | 'NS';
score?: { home: number; away: number };
}