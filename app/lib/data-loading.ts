import { handleAsyncError } from "./error-handling";
import {
  getMetaByPage,
  getGames,
  getResults,
  getAds,
  getMonthlyChart,
  getYearlyChart,
  getBlogBySlug,
  getLegalDocumentBySlug,
  getPrimaryResults,
  getUpcomingResults,
  getTodayGameResult,
  getExcludedMetaByPage,
} from "./api";

// Load common page data
export async function loadCommonPageData(slug: string) {
  return handleAsyncError(async () => {
    const [meta, games, results, ads] = await Promise.all([
      getExcludedMetaByPage(slug),
      getGames(),
      getResults(),
      getAds(),
    ]);

    // Filter ads by position
    const topAds = ads.filter((ad) => ad.position === "top");
    const bottomAds = ads.filter((ad) => ad.position === "bottom");
    const inBetweenTableAds = ads.filter(
      (ad) => ad.position !== "top" && ad.position !== "bottom"
    );

    return {
      meta,
      games,
      results,
      ads: {
        top: topAds,
        bottom: bottomAds,
        inBetween: inBetweenTableAds,
      },
    };
  }, `Error loading common data for ${slug}`);
}

// Load home page data
export async function loadHomePageData() {
  return handleAsyncError(async () => {
    const [meta, games, results, ads, chart, blogs, dlResult] =
      await Promise.all([
        getMetaByPage("home"),
        getGames(),
        getResults(),
        getAds(),
        getMonthlyChart(),
        getBlogBySlug("top-blogs"),
        getTodayGameResult("delhi bazar"),
      ]);

    // Filter ads by position
    const topAds = ads.filter((ad) => ad.position === "top");
    const bottomAds = ads.filter((ad) => ad.position === "bottom");
    const inBetweenTableAds = ads.filter(
      (ad) => ad.position !== "top" && ad.position !== "bottom"
    );

    return {
      meta,
      games,
      results,
      chart,
      blogs,
      dlResult,
      ads: {
        top: topAds,
        bottom: bottomAds,
        inBetween: inBetweenTableAds,
      },
    };
  }, "Error loading home page data");
}

// Load chart page data
export async function loadChartPageData() {
  return handleAsyncError(async () => {
    const [meta, games, pages] = await Promise.all([
      getMetaByPage("chart"),
      getGames(),
      getMetaByPage("all-meta-except-auto"),
    ]);

    return {
      meta,
      games,
      pages,
    };
  }, "Error loading chart page data");
}

// Load yearly chart data
export async function loadYearlyChartData(slug: string, year: number) {
  return handleAsyncError(async () => {
    const [meta, yearlyData, games] = await Promise.all([
      getMetaByPage(slug),
      getYearlyChart(slug, year),
      getGames(),
    ]);

    return {
      meta,
      yearlyData,
      games,
    };
  }, `Error loading yearly chart data for ${slug}`);
}

// Load blog post data
export async function loadBlogPostData(slug: string) {
  return handleAsyncError(async () => {
    const [blog, meta, games] = await Promise.all([
      getBlogBySlug(slug),
      getMetaByPage("default"),
      getGames(),
    ]);

    return {
      blog,
      meta,
      games,
    };
  }, `Error loading blog post data for ${slug}`);
}

// Load legal document data
export async function loadLegalDocumentData(slug: string) {
  return handleAsyncError(async () => {
    const [document, meta] = await Promise.all([
      getLegalDocumentBySlug(slug),
      getMetaByPage(slug),
    ]);

    return {
      document,
      meta,
    };
  }, `Error loading legal document data for ${slug}`);
}

// Load results data
export async function loadResultsData() {
  return handleAsyncError(async () => {
    const [primaryResults, upcomingResults] = await Promise.all([
      getPrimaryResults(),
      getUpcomingResults(),
    ]);

    return {
      primaryResults,
      upcomingResults,
    };
  }, "Error loading results data");
}
