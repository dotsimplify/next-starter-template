import Link from "next/link";
import { notFound } from "next/navigation";
import ClockTime from "@/components/ClockTime";
import MovingTestComponent from "@/components/Header/MovingTest";
import UpcomingResults from "@/components/results/upcomingResults";
import NameStrip from "@/components/Header/NameStrip";
import HeadingYellow from "@/components/HeadingYellow";
import Pill from "@/components/Pill";
import BreadCrumb from "@/components/breadCrumb";
import SinglePost from "@/components/blogs/singlePost";
import { Metadata } from "next";
import { getUpcomingResults } from "@/lib/api";
import { getYearsDescending, serverTime } from "@/helper";
import { API_TAGS } from "@/constants";

interface Game {
  slug: string;
  gameName: string;
}

interface PageParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  // fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/blogs/${slug}`
  ).then((res) => res.json());

  return {
    title: response.title,
    description: response.description
      ? response.description.slice(0, 200)
      : "SATTA LATEST INFORMATION",
    keywords: response.tags ? response.tags.toString() : "-",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/king-satta-latest-news/${slug}`,
    },
    openGraph: {
      locale: "en_IN",
      type: "website",
      images:
        response.images && Object.entries(response.images)?.length > 0
          ? [response.images.url]
          : [`${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
    },
  };
}

export async function generateStaticParams() {
  const posts: Game[] = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/top-blogs`,
    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`, {
    next: { tags: [API_TAGS.GAMES] },
  });
  return res.json();
}

async function getSinglePostBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/blogs/${slug}`,
    {
      next: { tags: [API_TAGS.BLOGS] },
    }
  );
  return res.json();
}

export default async function SinglePage({ params }: { params: PageParams }) {
  const currentYear = new Date().getFullYear();
  const yearsArray = getYearsDescending(2022);
  const { slug } = await params;
  const page = await getSinglePostBySlug(slug);
  if (!page) {
    return notFound();
  }
  const games = await getGames();
  const upcoming = await getUpcomingResults();

  return (
    <main>
      <div className="bg-black">
        <MovingTestComponent />
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
      </div>
      <BreadCrumb link={page.title} />
      <section className="p-3 pb-4 bg-black md:p-2 ">
        <ClockTime initialTime={serverTime} />
        <UpcomingResults results={upcoming.results} />
      </section>
      <SinglePost data={page} />
      {yearsArray &&
        yearsArray.length > 0 &&
        yearsArray.map((year, index) => (
          <div key={index}>
            <HeadingYellow type="h2" text={`SATTA KING CHART ${year}`} />
            <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
              {games &&
                games.length > 0 &&
                games.map((one, index) => {
                  return (
                    <Link
                      key={index}
                      href={`${
                        year === currentYear
                          ? `/super-fast-sattaking-yearly-chart/${one.slug}`
                          : `/satta-king-${year}/${one.slug}`
                      }`}
                    >
                      <Pill text={`${one.gameName} satta king chart ${year}`} />
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
    </main>
  );
}
