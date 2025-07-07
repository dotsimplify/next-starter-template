import type {
  MetaData,
  Game,
  GroupedResults,
  Ad,
  MonthlyChartData,
  Notification,
  Faq,
  Blog,
  LegalDocument,
  DayResult,
  YearlyChartData,
  UpcomingResult,
  PrimaryResult,
  ApiResponse,
  IResult,
  RecievedMonthlyChartData,
  IBlogPagination,
} from "@/types";
import { API_TAGS } from "@/constants";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_LIVE_API_URL;

// First, define types for your API responses
type HomePageResponse = {
  ads: Ad[];
  results: IResult;
  games: Game[];
  chart: RecievedMonthlyChartData;
  content: MetaData;
  blogs: any[];
  dlResult: any;
  upcoming: UpcomingResult;
};

// First, define types for your API responses
type ChartPageResponse = {
  ads: Ad[];
  results: IResult;
  games: Game[];
  chart: YearlyChartData;
  content: MetaData;
  dlResult: any;
  upcoming: UpcomingResult;
};

// Helper function to handle fetch errors
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
    const fetchOptions: RequestInit = {
      ...options,
      ...(options?.next ? { next: options.next } : {}),
    };

    const response = await fetch(url, fetchOptions);

    if (response.status === 404) {
      notFound();
    }
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

// Generic function to fetch data with a tag
export async function fetchWithTag<T>(
  endpoint: string,
  tag: string
): Promise<T> {
  return fetchWithErrorHandling<T>(`${API_URL}${endpoint}`, {
    next: { tags: [tag] },
  });
}

// Generic function to fetch data with multiple tags
export async function fetchWithTags<T>(
  endpoint: string,
  tags: string[]
): Promise<T> {
  return fetchWithErrorHandling<T>(`${API_URL}${endpoint}`, {
    next: { tags },
  });
}

// Generic function to fetch data by slug
export async function fetchBySlug<T>(
  endpoint: string,
  slug: string,
  tag: string
): Promise<T> {
  return fetchWithErrorHandling<T>(
    `${API_URL}${endpoint}/${encodeURIComponent(slug)}`,
    {
      next: { tags: [tag, slug] },
    }
  );
}

// Generic function to fetch data by slug with optional revalidation
export async function fetchYearChart<T>(
  endpoint: string,
  slug: string,
  year: string,
  options?: {
    next?: {
      tags?: string[];
      revalidate?: number;
    };
  }
): Promise<T> {
  const fetchOptions = options?.next ? { next: options.next } : undefined;

  return fetchWithErrorHandling<T>(
    `${API_URL}${endpoint}/${slug}/${year}`,
    fetchOptions
  );
}

// Meta data and SEO
export async function getMetaByPage(slug: string): Promise<MetaData> {
  return fetchBySlug<MetaData>("/get-meta-by-page", slug, API_TAGS.HEADER_TEXT);
}

export async function getExcludedMetaByPage(slug: string): Promise<MetaData> {
  return fetchBySlug<MetaData>("/excluded-page", slug, API_TAGS.HEADER_TEXT);
}

export async function getAllMetaExceptAuto(): Promise<{ pages: MetaData[] }> {
  return fetchWithTag<{ pages: MetaData[] }>(
    "/get-all-meta-except-auto",
    API_TAGS.STATIC_PAGES
  );
}

// Games
export async function getGames(): Promise<Game[]> {
  return fetchWithTag<Game[]>("/get-games", API_TAGS.GAMES);
}

export async function homePage(): Promise<HomePageResponse> {
  return fetchWithTag<HomePageResponse>("/home-page", API_TAGS.GAMES);
}

// Meta data and SEO
export async function chartPageData(
  slug: string,
  year: string
): Promise<ChartPageResponse> {
  return fetchYearChart<ChartPageResponse>(`/chart-page`, slug, year, {
    next: {
      tags: [API_TAGS.CHARTS],
    },
  });
}

// Results
export async function getResults(): Promise<GroupedResults> {
  return fetchWithTag<GroupedResults>("/results", API_TAGS.RESULTS);
}

export async function getPrimaryResults(): Promise<{
  results: PrimaryResult[];
}> {
  return fetchWithTag<{ results: PrimaryResult[] }>(
    "/primary-games-result",
    API_TAGS.PRIMARY_RESULTS
  );
}

export async function getUpcomingResults(): Promise<UpcomingResult> {
  return fetchWithTag<UpcomingResult>(
    "/upcoming-results",
    API_TAGS.UPCOMING_RESULTS
  );
}

export async function getTodayGameResult(gameName: string): Promise<DayResult> {
  return fetchBySlug<DayResult>(
    "/today-game-result",
    gameName,
    API_TAGS.DB_RESULT
  );
}

// Charts
export async function getMonthlyChart(): Promise<MonthlyChartData> {
  return fetchWithTag<MonthlyChartData>(
    "/monthly-chart",
    API_TAGS.MONTHLY_CHART
  );
}

export async function getYearlyChart(
  game: string,
  year: number
): Promise<YearlyChartData> {
  return fetchWithErrorHandling<YearlyChartData>(
    `${API_URL}/yearly-chart?game=${game}&&year=${year}`,
    {
      next: { tags: [API_TAGS.YEARLY_CHART, game, `year-${year}`] },
    }
  );
}

// Ads
export async function getAds(): Promise<Ad[]> {
  return fetchWithTag<Ad[]>("/home-page-ads", API_TAGS.ADS);
}

// Notifications
export async function getNotifications(): Promise<Notification[]> {
  return fetchWithTag<Notification[]>(
    "/get-notifications/home",
    API_TAGS.NOTIFICATIONS
  );
}

// Blogs
export async function getBlogs(): Promise<Blog[]> {
  return fetchWithTag<Blog[]>("/top-blogs", API_TAGS.BLOGS);
}

export async function getBlogsAllForMainPage(
  limit = 6,
  skip = 0
): Promise<IBlogPagination> {
  return fetchWithTag<IBlogPagination>(
    `/all-blogs-main?limit=${limit}&skip=${skip}`,
    API_TAGS.BLOGS
  );
}

export async function getAllBlogs(): Promise<Blog[]> {
  return fetchWithTag<Blog[]>("/all-blogs", "allBlogs");
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  return fetchBySlug<Blog>("/blogs", slug, API_TAGS.BLOGS);
}

// Legal Documents
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  return fetchWithTag<LegalDocument[]>("/legal-documents", API_TAGS.LEGAL);
}

export async function getLegalDocumentBySlug(
  slug: string
): Promise<LegalDocument> {
  return fetchBySlug<LegalDocument>(
    "/single-legal-document",
    slug,
    API_TAGS.LEGAL
  );
}

// Revalidation
export async function revalidateTag(
  tag: string,
  token: string
): Promise<ApiResponse> {
  return fetchWithErrorHandling<ApiResponse>(
    `${
      process.env.NEXT_PUBLIC_CLIENT_URL
    }/api/revalidate?tag=${encodeURIComponent(tag)}&token=${encodeURIComponent(
      token
    )}`
  );
}

export async function revalidateAll(token: string): Promise<ApiResponse> {
  return fetchWithErrorHandling<ApiResponse>(
    `${
      process.env.NEXT_PUBLIC_CLIENT_URL
    }/api/all-revalidate?token=${encodeURIComponent(token)}`
  );
}
