interface Game {
  slug: string;
  updatedAt: string;
  // Add other properties if they exist
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export async function getAll(): Promise<Game[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch games: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const allPages = await getAll();

  const currentYearEntries: SitemapEntry[] = allPages.map((one) => ({
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazaar/${one.slug}`,
    lastModified: one.updatedAt,
    changeFrequency: "daily",
    priority: 1,
  }));

  const year2023Entries: SitemapEntry[] = allPages.map((one) => ({
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazaar-2023/${one.slug}`,
    lastModified: one.updatedAt,
    changeFrequency: "weekly",
    priority: 1,
  }));

  // Add static pages if needed
  const staticPages: SitemapEntry[] = [
    // Add your static pages here if any
    // {
    //   url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/about`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // }
  ];

  return mergeArrays<SitemapEntry>(
    mergeArrays<SitemapEntry>(currentYearEntries, year2023Entries),
    staticPages
  );
}

export function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
  return [...(arr1 || []), ...(arr2 || [])];
}
