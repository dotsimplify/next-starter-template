import { notFound } from "next/navigation";
import MovingTestComponent from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import BreadCrumb from "@/components/breadCrumb";
import { getSeo, strReplace } from "@/helper";
import { Metadata } from "next";
import { API_TAGS } from "@/constants";

interface Game {
  slug: string;
  gameName: string;
}

interface ResultData {
  resultDate: string;
  // Add other properties as needed from your actual data
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
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/legal/${params.slug}`;
  const str = `${strReplace(params.slug)}`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(str)}`;
  const meta = await getSeo(params.slug, canonical, ogImage);
  return meta;
}

export async function generateStaticParams() {
  const posts: Game[] = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/legal-documents`,
    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getHeaderText(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );
  return res.json();
}

async function getSingleBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/single-legal-document/${slug}`,

    {
      next: { tags: [API_TAGS.STATIC_PAGES] },
    }
  );
  return res.json();
}

export default async function SinglePage({ params }: { params: PageParams }) {
  const { slug } = params;
  const page = await getSingleBySlug(slug);
  if (!page) {
    return notFound();
  }
  const meta = await getHeaderText(slug);
  return (
    <main>
      <div className="bg-black">
        <MovingTestComponent />
        <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
      </div>
      <BreadCrumb hide link={page.title} />
      {page?.term && (
        <div
          dangerouslySetInnerHTML={{ __html: page.term }}
          className="max-w-3xl p-4 mx-auto main-content"
        />
      )}
    </main>
  );
}
