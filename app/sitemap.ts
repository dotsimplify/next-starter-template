export default function sitemap() {
  const paths = ["chart", "login", "contact", "index", "playbazaar"];

  const arr = paths.map((one) => {
    const route = one.replace("index", "");
    const staticPath = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${route}`;
    return {
      url: staticPath,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    };
  });
  return arr;
}
