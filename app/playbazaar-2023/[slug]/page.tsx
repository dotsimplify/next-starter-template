import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  splitMonthFromDate,
  breadcrumbSchema,
  strReplace,
  getSeo,
} from "@/helper";
import NameStrip from "@/components/Header/NameStrip";
import YearTable from "@/components/charts/yearTable";
import Pill from "@/components/Pill";
import HeadingYellow from "@/components/HeadingYellow";
import YearlyResultTable from "@/components/charts/completeYearChart";
import { API_TAGS } from "@/constants";

let thisYear = 2023;

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

interface AllYearData {
  [key: string]: ResultData[];
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazaar-2023/${params.slug}`;
  const str = `${strReplace(params.slug)} play bazaar 2023`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(str)}`;
  const meta = await getSeo(params.slug, canonical, ogImage);
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
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );
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
  return res.json();
}

async function getContent(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}`,
    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  );

  return res.json();
}

async function getGames(): Promise<Game[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`,

    {
      next: { tags: [API_TAGS.GAMES] },
    }
  );

  return res.json();
}

export default async function SinglePage({ params }: { params: PageParams }) {
  const { slug } = params;
  const { complete } = await getSingleBySlug(slug);
  const meta = await getHeaderText(slug);
  const content = await getContent(slug);
  const allGames = await getGames();
  if (!complete || !meta || !content) {
    return notFound();
  }

  let yearNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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

  let day = [];
  for (let i = 1; i < 32; i++) {
    day.push(i);
  }

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
    let singleMonth = complete[key];
    if (singleMonth.resultDate) {
      let month = splitMonthFromDate(singleMonth.resultDate);
      let engMonth = year[month - 1];
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
      <div className="py-4 bg-black">
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
      </div>
      <div className="flex border-t border-black border-b items-center justify-center py-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h6 className="text-base font-bold text-center uppercase md:text-3xl">
          {`${strReplace(slug)} PLAY BAZAAR CHART ${thisYear}`}
        </h6>
      </div>

      <YearlyResultTable thisYear={thisYear} slug={slug} data={complete} />

      <HeadingYellow type="h6" text={`PLAY BAZAAR CHART ${thisYear}`} />
      <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
        {allGames &&
          allGames.length &&
          allGames.map((one, index) => {
            return (
              <Link key={index} href={`/playbazaar-2023/${one.slug}`}>
                <Pill text={`${one.gameName} play bazaar ${thisYear}`} />
              </Link>
            );
          })}
      </div>
    </main>
  );
}
