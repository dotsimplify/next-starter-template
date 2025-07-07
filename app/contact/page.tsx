import { MovingTextComponent } from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import { getSeo } from "../helper";
import ShowContent from "@/components/showContent";
import { API_TAGS } from "@/constants";

export async function generateMetadata() {
  const slug = "contact";
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${slug}`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(slug)}`;
  const meta = await getSeo(slug, canonical, ogImage);
  return meta;
}

async function getHeaderText() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/contact`,
    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  );

  return res.json();
}

export default async function Chart() {
  const meta = await getHeaderText();
  return (
    <main>
      <div className="bg-black">
        <MovingTextComponent text={meta.headerText} />
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
      </div>
      <ShowContent
        html={meta.content}
        className="prose max-w-none contactImage"
      />
    </main>
  );
}
