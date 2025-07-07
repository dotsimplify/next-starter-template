export async function getAll() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/legal-documents`
  );

  return res.json();
}

export default async function sitemap() {
  const allPages = await getAll();
  const response =
    allPages &&
    allPages.length > 0 &&
    allPages.map((one: any) => {
      const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/legal/${one.slug}`;
      return {
        url: staticPath,
        lastModified: one.updatedAt,
        changeFrequency: "monthly",
        priority: 1,
      };
    });

  return response;
}
