import Link from "next/link";
import { MovingTextComponent } from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import HeadingYellow from "../components/HeadingYellow";
import Pill from "../components/Pill";
import { getSeo, getYearsDescending } from "../helper";
import ShowContent from "@/components/showContent";
import { API_TAGS } from "@/constants";

interface IGAME {
  gameName: string;
  slug: string;
  createdAt: string;
}

interface IPAGE {
  page: string;
  slug: string;
  createdAt: string;
}

export async function generateMetadata() {
  const slug = "playbazaar";
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${slug}`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(slug)}`;
  const meta = await getSeo(slug, canonical, ogImage);
  return meta;
}

async function getGames() {
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
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/playbazaar`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );
  return res.json();
}

export default async function Chart() {
  const currentYear = new Date().getFullYear();
  const meta = await getHeaderText();
  const games: IGAME[] = await getGames();

  return (
    <main>
      <div className="bg-black">
        <MovingTextComponent text={meta.headerText} />
        <NameStrip />
      </div>
      <ShowContent html={meta.content} className="prose max-w-none" />
      {[currentYear].map((year, index) => (
        <div key={index}>
          <HeadingYellow type="h6" text={`PLAY BAZAAR ${year}`} />
          <div className="grid items-center grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 ">
            {games &&
              games.length > 0 &&
              games.map((one, index) => {
                return (
                  <Link key={index} href={`/playbazaar/${one.slug}`}>
                    <Pill text={`${one.gameName} play bazaar chart ${year}`} />
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </main>
  );
}
