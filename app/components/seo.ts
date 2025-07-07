export const allMetaTags = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}`
  ).then((res) => res.json());
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    keywords: response.metaKeywords,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_CLIENT_URL,
    },
    verification: {
      google: "google",
    },
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
    },
  };
};
