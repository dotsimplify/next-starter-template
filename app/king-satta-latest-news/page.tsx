import { notFound } from "next/navigation";
import MovingTestComponent from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import BreadCrumb from "@/components/breadCrumb";
import type { Metadata } from "next";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { API_TAGS, NEXT_PUBLIC_CLIENT_URL } from "@/constants";
import type { Blog } from "@/types";
import { JSX } from "react";
import Thumbnail from "@/components/blogs/thumbnail";
import { getSeo } from "@/helper";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata() {
  const slug = "contact";
  const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${slug}`;
  const ogImage = `${
    process.env.NEXT_PUBLIC_SERVER_PORT
  }/api/og?title=${encodeURI(slug)}`;
  const meta = await getSeo(slug, canonical, ogImage);
  return meta;
}

export async function generateStaticParams() {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_LIVE_API_URL}/all-blogs`,
      {
        next: { tags: [API_TAGS.BLOGS] },
      }
    ).then((res) => res.json());

    return posts.map((post: Blog) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [];
  }
}

export default async function Post(): Promise<JSX.Element> {
  const blogs = await getBlogs();
  try {
    return (
      <main>
        <div className="bg-black">
          <MovingTestComponent />
          <NameStrip />
        </div>
        <BreadCrumb />
        {blogs && blogs.length > 0 && (
          <h6 className="py-6 text-xl font-bold text-center md:text-3xl bg-theme-yellow">
            Satta King News
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
  } catch (error) {
    console.error(`Error rendering blog post :`, error);
    return notFound();
  }
}
