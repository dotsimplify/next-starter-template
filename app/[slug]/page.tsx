import { singleFaq, breadcrumbSchema, strReplace, serverTime } from "@/helper";
import { JSX } from "react";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import AdsTemplate from "@/components/ads/adsTemplate";
import PrimaryGameResult from "@/components/results/primaryGameResult";
import ResultTable from "@/components/results/resultTable";
import UpcomingResults from "@/components/results/upcomingResults";
import HomeFaqs from "@/components/faqs/HomeFaqs";
import type { Metadata } from "next";
import { generateDynamicPageMetadata } from "@/lib/seo";
import { loadCommonPageData } from "@/lib/data-loading";
import { getGames, getUpcomingResults } from "@/lib/api";
import type { PageProps } from "@/types";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import ShowContent from "@/components/showContent";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageParams = await params;
  return generateDynamicPageMetadata({
    slug: pageParams.slug,
    title: `${strReplace(pageParams.slug)} - Satta King`,
    description: `Information about ${strReplace(pageParams.slug)}`,
  });
}

export async function generateStaticParams() {
  try {
    const games = await getGames();
    return games.map((game) => ({
      slug: game.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for dynamic pages:", error);
    return [];
  }
}

export default async function DynamicPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const { meta, results, ads } = await loadCommonPageData(slug);
  const upcoming = await getUpcomingResults();
  const gameName = strReplace(slug);
  if (!meta || Object.entries(meta).length === 0) {
    return notFound();
  }
  // Create FAQ schema
  const allFaqsArraySchema =
    meta.faqs &&
    meta.faqs.length > 0 &&
    meta.faqs.map((one) => singleFaq(one.question, one.answer));
  const allFaqSchema =
    allFaqsArraySchema && allFaqsArraySchema?.length > 0
      ? [...allFaqsArraySchema]
      : [];

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
        <MovingTextComponent text={meta.headerText || ""} />
        <NameStrip />
        <section className="p-3 pb-4 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h1 className="text-2xl font-bold leading-8 text-center text-white uppercase ">
            {`${gameName} DETAILED OVERVIEW`}
          </h1>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />
      <PrimaryGameResult />
      <AdsTemplate ads={ads.top} />
      <ResultTable results={results} ads={ads.inBetween} />
      <AdsTemplate ads={ads.bottom} />
      <ShowContent html={meta.content} className="prose max-w-none" />
      {meta.faqs && meta.faqs.length > 0 && (
        <p className="py-6 text-xl font-bold text-center uppercase md:text-3xl bg-theme-yellow">
          {`${gameName} FAQ's`}
        </p>
      )}
      <div className="py-4">
        {meta.faqs &&
          meta.faqs.length > 0 &&
          meta.faqs.map((one) => {
            return <HomeFaqs data={one} key={one.question} />;
          })}
      </div>
    </main>
  );
}
