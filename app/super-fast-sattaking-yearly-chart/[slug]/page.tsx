import * as React from "react";
import {
  todayDateAnother,
  singleFaq,
  breadcrumbSchema,
  strReplace,
  getSeo,
  serverTime,
} from "@/helper";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import AdsTemplate from "@/components/ads/adsTemplate";
import PrimaryGameResult from "@/components/results/primaryGameResult";
import ResultTable from "@/components/results/resultTable";
import UpcomingResults from "@/components/results/upcomingResults";
import HomeFaqs from "@/components/faqs/HomeFaqs";
import { notFound } from "next/navigation";
import { chartPageData } from "@/lib/api";
import ShowContent from "@/components/showContent";
import CustomFaqComponent from "@/components/faqs/customFaq";
import HeadingYellow from "@/components/HeadingYellow";
import Link from "next/link";
import Pill from "@/components/Pill";
import YearlyResultTable from "@/components/charts/completeYearChart";
import { API_TAGS } from "@/constants";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: any) {
  const finalParams = await params;
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/super-fast-sattaking-yearly-chart/${finalParams.slug}`;
  const str = `${strReplace(finalParams.slug)} satta king`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(str)}`;
  const meta = await getSeo(finalParams.slug, canonical, ogImage);
  return meta;
}

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-games`,
    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  ).then((res) => res.json());

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params;
  const currentYear = new Date().getFullYear().toString();
  // Fetch all data in parallel where possible
  const chartData = await chartPageData(slug, currentYear);

  const { ads, results, content, dlResult, upcoming, games, chart } = chartData;
  const { complete } = chart;

  if (!complete) {
    return notFound();
  }
  const gameName = strReplace(slug);
  const todayDate = todayDateAnother();

  let yyyy = new Date().getFullYear();

  const dbResultSchema = {
    "@type": "Question",
    name: `What is today's ( ${todayDate} ) delhi bazar satta  result ?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Today's ( ${todayDate} ) delhi satta  result ${
        dlResult.result !== -1 ? `is ${dlResult.result}` : `will be published.`
      }`,
    },
  };
  const allFaqsArraySchema =
    content.faqs &&
    content.faqs.length > 0 &&
    content.faqs.map((one: any) => singleFaq(one.question, one.answer));

  const allFaqSchema =
    allFaqsArraySchema && allFaqsArraySchema?.length > 0
      ? [dbResultSchema, ...allFaqsArraySchema]
      : [dbResultSchema];

  const topAds =
    (ads &&
      ads.length > 0 &&
      ads.filter((one: any) => one.position === "top")) ||
    [];
  const bottomAds =
    (ads &&
      ads.length > 0 &&
      ads.filter((one: any) => one.position === "bottom")) ||
    [];
  const inBetweenTableAds =
    (ads &&
      ads.length > 0 &&
      ads.filter(
        (one: any) => one.position != "bottom" && one.position != "top"
      )) ||
    [];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allFaqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="bg-black">
        <MovingTextComponent text={content.headerText} />
        <NameStrip />
        <section className="p-3 pb-4 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h2 className="text-2xl font-bold leading-8 text-center text-white ">
            हा भाई यही आती हे सबसे पहले खबर रूको और देखो
          </h2>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />
      <PrimaryGameResult />
      <AdsTemplate ads={topAds} />
      <ResultTable results={results} ads={inBetweenTableAds} />
      <AdsTemplate ads={bottomAds} />
      <ShowContent html={content.content} className="prose max-w-none" />
      <div className="flex border-t border-black border-b items-center justify-center py-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h6 className="text-base font-bold text-center md:text-3xl">
          {`${strReplace(slug).toUpperCase()} YEARLY RECORD CHART ${yyyy}`}
        </h6>
      </div>
      {Array.isArray(chart.complete) && chart.complete.length > 0 && (
        <YearlyResultTable thisYear={yyyy} slug={slug} data={chart.complete} />
      )}
      {dlResult?.gameName && (
        <p className="py-6 text-xl font-bold text-center uppercase md:text-3xl bg-theme-yellow">
          {`${gameName} Satta FAQ's`}
        </p>
      )}
      <div className="py-4">
        <CustomFaqComponent dlResult={dlResult} />

        {content.faqs &&
          content.faqs.length > 0 &&
          content.faqs.map((one: any) => {
            return <HomeFaqs data={one} key={one.question} />;
          })}
      </div>
      {[currentYear].map((year, index) => (
        <div key={index}>
          <HeadingYellow type="h2" text={`SATTA KING CHART ${year}`} />
          <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
            {games &&
              games.length > 0 &&
              games.map((one, index) => {
                return (
                  <Link
                    key={index}
                    href={`/super-fast-sattaking-yearly-chart/${one.slug}`}
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
