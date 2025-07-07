import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { tagExtract, timeAgoWithDate } from "@/helper";

interface ThumbnailImage {
  url: string | StaticImageData;
  // Add other image properties if they exist
}

interface ThumbnailData {
  slug: string;
  title: string;
  coverAlt?: string;
  createdAt: string;
  tags: string;
  images?: ThumbnailImage; // Now properly marked as optional
}

interface ThumbnailProps {
  data: ThumbnailData;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ data }) => {
  const extractedTags = tagExtract(data.tags);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-500">
      {data.images?.url && (
        <Link href={`/king-satta-latest-news/${data.slug}`} passHref>
          <Image
            height={360}
            width={480}
            className="rounded-t-lg"
            src={data.images.url}
            alt={data.coverAlt || data.title}
            priority={false}
          />
        </Link>
      )}

      <div className="p-5">
        <Link href={`/king-satta-latest-news/${data.slug}`} passHref>
          <h6 className="text-xl font-bold tracking-tight text-gray-900 first-letter:uppercase hover:text-blue-600 transition-colors">
            {data.title}
          </h6>
        </Link>

        <span className="block mt-1 text-xs text-gray-600">
          Posted on {timeAgoWithDate(data.createdAt)}
        </span>

        {extractedTags.length > 0 && (
          <div className="flex flex-wrap items-center mt-2 text-gray-500">
            {extractedTags.map((tag: string, index: number) => (
              <span
                className="mr-2 text-sm cursor-pointer hover:text-blue-500 tracking-widest transition-colors"
                key={`${tag}-${index}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
