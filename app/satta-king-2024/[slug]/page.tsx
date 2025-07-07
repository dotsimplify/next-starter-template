import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  splitMonthFromDate,
  breadcrumbSchema,
  strReplace,
  getSeo,
  serverTime,
} from "@/helper";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import UpcomingResults from "@/components/results/upcomingResults";
import Pill from "@/components/Pill";
import HeadingYellow from "@/components/HeadingYellow";
import ShowContent from "@/components/showContent";
import { getUpcomingResults } from "@/lib/api";
import YearlyResultTable from "@/components/charts/completeYearChart";
import { API_TAGS } from "@/constants";

const thisYear = 2024;

interface Game {
  slug: string;
  gameName: string;
}

interface ResultData {
  gameName: string;
  result: string | number;
  resultDate: string;
  createdAt: string;
}

interface CompleteData {
  [key: string]: ResultData;
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
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/satta-king-${thisYear}/${allParams.slug}`;
  const str = `${strReplace(allParams.slug)} satta chart ${thisYear}`;
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

interface AllYearData {
  [key: string]: ResultData[];
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
  const year = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const allYear: AllYearData = {
    JAN: [],
    FEB: [],
    MAR: [],
    APR: [],
    MAY: [],
    JUN: [],
    JUL: [],
    AUG: [],
    SEP: [],
    OCT: [],
    NOV: [],
    DEC: [],
  };

  for (const key in complete) {
    const singleMonth = complete[key];
    if (singleMonth.resultDate) {
      const month = splitMonthFromDate(singleMonth.resultDate);
      const engMonth = year[month - 1];
      allYear[engMonth].push(singleMonth);
    }
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
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME || ""} />
        <section className="p-3 pb-4 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h1 className="text-base md:text-xl font-bold leading-8 text-center text-white uppercase ">
            🔥 TODAY LIVE SATTA KING RESULTS 🔥
          </h1>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />
      <ShowContent html={meta.content} className="prose max-w-none" />
      <div className="flex border-t border-black border-b items-center justify-center py-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h6 className="text-base font-bold text-center uppercase md:text-3xl">
          {`${strReplace(slug)} SATTA KING CHART ${thisYear}`}
        </h6>
      </div>
      <YearlyResultTable thisYear={thisYear} slug={slug} data={complete} />
      <HeadingYellow type="h6" text={`SATTA KING ${thisYear} CHART`} />
      <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
        {allGames &&
          allGames.length > 0 &&
          allGames.map((one, index) => (
            <Link key={index} href={`/satta-king-${thisYear}/${one.slug}`}>
              <Pill text={`${one.gameName} satta chart ${thisYear}`} />
            </Link>
          ))}
      </div>
    </main>
  );
}
