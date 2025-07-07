import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbSchema, strReplace, getSeo, serverTime } from "@/helper";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import UpcomingResults from "@/components/results/upcomingResults";
import Pill from "@/components/Pill";
import HeadingYellow from "@/components/HeadingYellow";
import ShowContent from "@/components/showContent";
import { getUpcomingResults } from "@/lib/api";
import YearlyResultTable from "@/components/charts/completeYearChart";
import { CompleteData } from "@/types";
import { API_TAGS } from "@/constants";

const thisYear = new Date().getFullYear();

interface Game {
  slug: string;
  gameName: string;
}

interface MetaData {
  headerText?: string;
  content?: string;
}

interface PageParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const allParams = await params;
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazaar/${allParams.slug}`;
  const str = `${strReplace(allParams.slug)} play bazaar chart ${thisYear}`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(str)}`;
  const meta = await getSeo(allParams.slug, canonical, ogImage);
  return meta;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const posts: Game[] = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`,
    {
      next: { tags: [API_TAGS.GAMES] },
    }
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getHeaderText(slug: string): Promise<MetaData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}-${thisYear}`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch header text");
  }

  return res.json();
}

async function getSingleBySlug(
  slug: string
): Promise<{ complete: CompleteData }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/yearly-chart?game=${slug}&&year=${thisYear}`,
    {
      next: { tags: [API_TAGS.RESULTS] },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch yearly chart data");
  }

  return res.json();
}

async function getGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`, {
    next: { tags: [API_TAGS.GAMES] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}

export default async function SinglePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const { complete } = await getSingleBySlug(slug);
  const upcoming = await getUpcomingResults();
  const meta = await getHeaderText(slug);
  const allGames = await getGames();

  if (!complete || !meta) {
    return notFound();
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="bg-black">
        {meta.headerText && <MovingTextComponent text={meta.headerText} />}
        <NameStrip />
        <section className="p-3 pb-4 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h1 className="text-xl font-bold leading-8 text-center text-white uppercase ">
            🔥 TODAY LIVE PLAY BAZAAR RESULTS 🔥
          </h1>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />
      <ShowContent html={meta.content} className="prose max-w-none" />
      <div className="flex border-t border-black border-b items-center justify-center py-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h6 className="text-base font-bold text-center uppercase md:text-3xl">
          {`${strReplace(slug)} PLAY BAZAAR CHART ${thisYear}`}
        </h6>
      </div>

      <YearlyResultTable thisYear={thisYear} slug={slug} data={complete} />

      <HeadingYellow type="h6" text={`PLAY BAZAAR ${thisYear} CHART`} />
      <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
        {allGames &&
          allGames.length > 0 &&
          allGames.map((one, index) => (
            <Link key={index} href={`/playbazaar/${one.slug}`}>
              <Pill text={`${one.gameName} play bazaar ${thisYear}`} />
            </Link>
          ))}
      </div>
    </main>
  );
}
