import Link from "next/link";
import { JSX } from "react";
import {
  stringSorting,
  todayDateAnother,
  singleFaq,
  breadcrumbSchema,
  formatTimeWithAmPm,
  getMonthYear,
  serverTime,
} from "@/helper";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import MovingTest from "@/components/Header/MovingTest";
import AdsTemplate from "@/components/ads/adsTemplate";
import NotificationHome from "@/components/notifications/notificationsHome";
import PrimaryGameResult from "@/components/results/primaryGameResult";
import ResultTable from "@/components/results/resultTable";
import UpcomingResults from "@/components/results/upcomingResults";
import SelectGames from "@/components/SelectGames";
import HomeFaqs from "@/components/faqs/HomeFaqs";
import MonthlyChartTable from "@/components/charts/monthlyChartTable";
import Thumbnail from "@/components/blogs/thumbnail";
import type { Metadata } from "next";
import { getMetaByPage, homePage } from "@/lib/api";
import type { GameResultForMonthChart } from "@/types";
import ShowContent from "./components/showContent";
import CustomFaqComponent from "./components/faqs/customFaq";

export const alt = "A7 SATTA LOGO";

export const size = { width: 1200, height: 630 };

export async function generateMetadata(): Promise<Metadata> {
  const response = await getMetaByPage("home");
  const dateMonth = getMonthYear(true);
  return {
    title: `${response.metaTitle} ${dateMonth}`,
    description: response.metaDescription,
    keywords: response.metaKeywords,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_CLIENT_URL,
    },
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
    },
  };
}

export default async function Home(): Promise<JSX.Element> {
  const { ads, results, games, chart, content, blogs, dlResult, upcoming } =
    await homePage();
  const currentYear = new Date().getFullYear();
  const todayDate = todayDateAnother();
  const dbResultSchema = {
    "@type": "Question",
    name: `What is today's ${dlResult?.gameName} satta result ? (${todayDate})`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Today's ${
        dlResult?.gameName
      } satta result for date (${todayDate}) ${
        dlResult.result !== -1
          ? `is ${dlResult.result}`
          : `will published at ${formatTimeWithAmPm(dlResult.resultTime)}.`
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
  const tablesHeader = Object.keys(chart) || [];
  const sortedTables = stringSorting(tablesHeader);
  const longMonth = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

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
        <MovingTest />
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
        <section className="py-5 pb-8 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h2 className="text-2xl px-4 font-bold leading-8 text-center text-white ">
            हा भाई यही आती हे सबसे पहले खबर रूको और देखो
          </h2>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />
      <PrimaryGameResult />
      <NotificationHome />
      <AdsTemplate ads={topAds} />
      <ResultTable results={results} ads={inBetweenTableAds} />
      <section className="flex md:flex-row  flex-col border-t-2 border-black border-b-2 items-center justify-center p-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <p className="mb-2 mr-4 text-xl font-extrabold text-center md:text-4xl">
          Check Play Bazaar Chart
        </p>
        <Link href="/playbazaar" className="button-50">
          Click
        </Link>
      </section>
      <AdsTemplate ads={bottomAds} />
      <div className="flex border-t border-black border-b items-center justify-center p-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h4 className="text-lg font-bold md:text-2xl">
          SATTA KING RESULT CHART {currentYear}
        </h4>
      </div>
      <SelectGames games={games} />
      <div className="flex border-t border-black border-b items-center justify-center p-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400] ">
        <h5 className="text-lg font-semibold  md:text-3xl">
          {longMonth.toUpperCase() + " SATTA RECORD CHART"}
        </h5>
      </div>
      {sortedTables?.map((tableKey: string, index) => {
        const tableData = chart[tableKey] as GameResultForMonthChart[];
        return tableData?.length ? (
          <MonthlyChartTable data={tableData} key={index} tableKey={tableKey} />
        ) : null;
      })}
      <ShowContent html={content.content} className="prose max-w-none" />
      {blogs && blogs.length > 0 && (
        <p className="py-6 text-xl font-bold text-center md:text-3xl bg-theme-yellow">
          Satta Frequently Asked Questions
        </p>
      )}
      <div style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem" }}>
        <CustomFaqComponent dlResult={dlResult} />
        {content.faqs &&
          content.faqs.length > 0 &&
          content.faqs.map((one: any) => {
            return <HomeFaqs data={one} key={one.question} />;
          })}
      </div>
      {blogs && blogs.length > 0 && (
        <h6 className="py-6 text-xl font-bold text-center md:text-3xl bg-theme-yellow">
          Fastest Satta King News
        </h6>
      )}
      <div className="grid grid-cols-1 gap-4 p-1 px-2 pt-4 bg-black md:grid-cols-3 justify-items-center">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((one) => {
            return <Thumbnail key={one._id} data={one} />;
          })}
      </div>
    </main>
  );
}
