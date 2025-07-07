export async function getAll() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_API_URL}/all-blogs`);

  return res.json();
}

export default async function sitemap() {
  const allBlogs = await getAll();

  const arr =
    allBlogs &&
    allBlogs.length > 0 &&
    allBlogs.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/king-satta-latest-news/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "weekly",
        priority: 1,
      };
    });
  return arr;
}
