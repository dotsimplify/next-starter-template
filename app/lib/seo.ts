import type { Metadata } from "next";
import { getSeo } from "@/helper";
import {
  NEXT_PUBLIC_CLIENT_URL,
  NEXT_PUBLIC_SERVER_PORT,
  PAGE_META,
} from "@/constants";
import type { SeoProps } from "@/types";

// Generate metadata for a page
export async function generatePageMetadata(
  slug: string,
  customTitle?: string,
  customDescription?: string
): Promise<Metadata> {
  try {
    const canonical = `${NEXT_PUBLIC_CLIENT_URL}/${slug}`;
    const ogImage = `${NEXT_PUBLIC_SERVER_PORT}/api/og?title=${encodeURIComponent(
      slug
    )}`;
    const meta = await getSeo(slug, canonical, ogImage);

    // If custom title or description is provided, override the fetched metadata
    if (customTitle) {
      meta.title = customTitle;
    }

    if (customDescription) {
      meta.description = customDescription;
    }

    return meta;
  } catch (error) {
    console.error(`Error generating metadata for ${slug}:`, error);

    // Fallback metadata
    return {
      title:
        customTitle ||
        `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Satta King`,
      description: customDescription || `Information about ${slug}`,
      alternates: {
        canonical: `${NEXT_PUBLIC_CLIENT_URL}/${slug}`,
      },
      openGraph: {
        locale: "en_IN",
        type: "website",
        images: [`${NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
      },
    };
  }
}

// Generate metadata for a dynamic page
export async function generateDynamicPageMetadata({
  slug,
  title,
  description,
  ogImage,
}: SeoProps): Promise<Metadata> {
  try {
    const canonical = `${NEXT_PUBLIC_CLIENT_URL}/${slug}`;
    const imageUrl =
      ogImage ||
      `${NEXT_PUBLIC_SERVER_PORT}/api/og?title=${encodeURIComponent(slug)}`;

    return {
      title:
        title || `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Satta King`,
      description: description || `Information about ${slug}`,
      alternates: {
        canonical,
      },
      openGraph: {
        locale: "en_IN",
        type: "website",
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error(`Error generating dynamic metadata for ${slug}:`, error);

    // Fallback metadata
    return {
      title:
        title || `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Satta King`,
      description: description || `Information about ${slug}`,
      alternates: {
        canonical: `${NEXT_PUBLIC_CLIENT_URL}/${slug}`,
      },
      openGraph: {
        locale: "en_IN",
        type: "website",
        images: [`${NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
      },
    };
  }
}

// Get predefined metadata for common pages
export function getPageMetadata(page: keyof typeof PAGE_META): Metadata {
  const meta = PAGE_META[page];

  return {
    title: meta.TITLE,
    description: meta.DESCRIPTION,
    alternates: {
      canonical: `${NEXT_PUBLIC_CLIENT_URL}/${page.toLowerCase()}`,
    },
    openGraph: {
      locale: "en_IN",
      type: "website",
      images: [`${NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
    },
  };
}
