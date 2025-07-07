// lib/api.ts
import { notFound } from "next/navigation";

export const API_TAGS = {
  GAMES: "games",
} as const;

export interface IUpcomingResult {
  gameName: string;
  result: number;
}

export interface UpcomingResult {
  results: IUpcomingResult[];
}

export type HomePageResponse = {
  upcoming: UpcomingResult;
};

async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit & {
    next?: {
      tags?: string[];
      revalidate?: number;
    };
  }
): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (response.status === 404) notFound();
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

export async function fetchWithTag<T>(
  endpoint: string,
  tag: string
): Promise<T> {
  return fetchWithErrorHandling<T>(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}${endpoint}`,
    { next: { tags: [tag] } }
  );
}

export async function homePage(): Promise<HomePageResponse> {
  return fetchWithTag<HomePageResponse>("/home-page", API_TAGS.GAMES);
}
