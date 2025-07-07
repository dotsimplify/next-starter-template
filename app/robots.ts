export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: ["/"],
      },
    ],
    sitemap: [
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/server-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/old-chart-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazar-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/terms-sitemap.xml`,
    ],
  };
}
