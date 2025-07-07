import Link from "next/link";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import UpcomingResults from "@/components/results/upcomingResults";
import HeadingYellow from "../components/HeadingYellow";
import Pill from "../components/Pill";
import { getSeo, serverTime } from "../helper";
import ShowContent from "@/components/showContent";
import { API_TAGS } from "@/constants";
import { getUpcomingResults } from "@/lib/api";

interface Game {
  slug: string;
  gameName: string;
}

export async function generateMetadata() {
  const slug = "chart-2022";
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/satta-king-2022`;
  const str = `satta king chart 2022`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(str)}`;
  const meta = await getSeo(slug, canonical, ogImage);
  return meta;
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

async function getHeaderText() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/chart-2022`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );

  return res.json();
}

export default async function Chart() {
  const currentYear = 2022;
  const meta = await getHeaderText();
  const games = await getGames();
  const upcoming = await getUpcomingResults();

  return (
    <main>
      <div className="bg-black">
        <MovingTextComponent text={meta.headerText} />
        <NameStrip />
        <section className="p-3 pb-4 bg-black md:p-6 ">
          <ClockTime initialTime={serverTime} />
          <h2 className="text-2xl font-bold leading-8 text-center text-white ">
            🔥 SATTA KING TODAY LIVE RESULTS 🔥
          </h2>
        </section>
      </div>
      <UpcomingResults results={upcoming.results} />

      <HeadingYellow
        type="h2"
        text={`SATTA KING RECORD CHART ${currentYear}`}
      />
      <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
        {games &&
          games.length > 0 &&
          games.map((one, index) => {
            return (
              <Link key={index} href={`/satta-king-2023/${one.slug}`}>
                <Pill
                  text={`${one.gameName} satta king ${currentYear} chart`}
                />
              </Link>
            );
          })}
      </div>
      <ShowContent html={meta.content} className="prose max-w-none" />
      <HeadingYellow type="h5" text={`SATTA KING RECORD CHART 2022`} />
      <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
        {games &&
          games.length > 0 &&
          games.map((one, index) => {
            return (
              <Link key={index} href={`/satta-king-2022/${one.slug}`}>
                <Pill text={`${one.gameName} satta king 2022 Chart`} />
              </Link>
            );
          })}
      </div>
    </main>
  );
}
