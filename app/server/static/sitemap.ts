export async function getAll() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-all-meta-except-auto`
  );

  return res.json();
}

export default async function sitemap() {
  const { pages } = await getAll();
  const response =
    pages &&
    pages.length > 0 &&
    pages.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "daily",
        priority: 1,
      };
    });

  return response;
}
