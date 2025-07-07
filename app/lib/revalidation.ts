import { revalidateTag } from "next/cache";
import { isValidToken } from "@/lib/utils";
import { API_TAGS } from "@/constants";
import type { RevalidateResponse } from "@/types";

// Validate token and revalidate a single tag
export function validateAndRevalidateTag(
  tag: string | null,
  token: string | null
): RevalidateResponse {
  // Validate token
  if (!isValidToken(token)) {
    return { revalidated: false, error: "Invalid token" };
  }

  // Validate tag
  if (!tag) {
    return { revalidated: false, error: "Missing tag parameter" };
  }

  try {
    revalidateTag(tag);

    return {
      revalidated: true,
      message: `Successfully revalidated tag: ${tag}`,
      now: Date.now(),
    };
  } catch (error) {
    console.error("Error during revalidation:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

// Validate token and revalidate multiple tags
export function validateAndRevalidateTags(
  tags: string[],
  token: string | null
): RevalidateResponse {
  // Validate token
  if (!isValidToken(token)) {
    return { revalidated: false, error: "Invalid token" };
  }

  try {
    // Revalidate all tags
    for (const tag of tags) {
      revalidateTag(tag);
    }

    return {
      revalidated: true,
      message: `Successfully revalidated ${tags.length} tags`,
      now: Date.now(),
    };
  } catch (error) {
    console.error("Error during revalidation:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

// Revalidate all tags
export function revalidateAllTags(token: string | null): RevalidateResponse {
  // Validate token
  if (!isValidToken(token)) {
    return { revalidated: false, error: "Invalid token" };
  }

  try {
    // Get all tags from API_TAGS
    const allTags = Object.values(API_TAGS);

    // Revalidate all tags
    for (const tag of allTags) {
      revalidateTag(tag);
    }

    return {
      revalidated: true,
      message: `Successfully revalidated all ${allTags.length} tags`,
      now: Date.now(),
    };
  } catch (error) {
    console.error("Error during revalidation:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

// Revalidate home page tags
export function revalidateHomePage(token: string | null): RevalidateResponse {
  // Validate token
  if (!isValidToken(token)) {
    return { revalidated: false, error: "Invalid token" };
  }

  try {
    // Tags related to home page
    const homeTags = [
      API_TAGS.HEADER_TEXT,
      API_TAGS.NOTIFICATIONS,
      API_TAGS.PRIMARY_RESULTS,
      API_TAGS.RESULTS,
      API_TAGS.ADS,
      API_TAGS.MONTHLY_CHART,
      API_TAGS.CONTENT,
      API_TAGS.DB_RESULT,
      API_TAGS.BLOGS,
    ];

    // Revalidate all home page related tags
    for (const tag of homeTags) {
      revalidateTag(tag);
    }

    return {
      revalidated: true,
      message: "Successfully revalidated home page",
      now: Date.now(),
    };
  } catch (error) {
    console.error("Error during home page revalidation:", error);
    return {
      revalidated: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to revalidate home page",
    };
  }
}
