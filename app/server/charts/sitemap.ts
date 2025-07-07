export async function getAll() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`);

  return res.json();
}

export default async function sitemap() {
  const allPages = await getAll();
  const currentYear =
    allPages &&
    allPages.length > 0 &&
    allPages.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/super-fast-sattaking-yearly-chart/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "daily",
        priority: 1,
      };
    });
  const year2023 =
    allPages &&
    allPages.length > 0 &&
    allPages.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/satta-king-2023/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "weekly",
        priority: 1,
      };
    });
  const year2022 =
    allPages &&
    allPages.length > 0 &&
    allPages.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/satta-king-2022/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "weekly",
        priority: 1,
      };
    });

  function mergeArrays<T>(arr1: T[], arr2: T[], arr3: T[]): T[] {
    // Initialize an empty array to store the merged result
    let mergedArray: T[] = [];
    // Check if at least one element exists in each array
    if (arr1.length > 0) {
      mergedArray = mergedArray.concat(arr1);
    }
    if (arr2.length > 0) {
      mergedArray = mergedArray.concat(arr2);
    }
    if (arr3.length > 0) {
      mergedArray = mergedArray.concat(arr3);
    }

    return mergedArray;
  }
  return mergeArrays(currentYear, year2023, year2022);
}
