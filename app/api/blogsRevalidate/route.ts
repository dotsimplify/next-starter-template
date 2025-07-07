import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isValidToken } from "@/lib/utils";
import type { RevalidateResponse } from "@/types";
import { API_TAGS } from "@/constants";

export async function GET(
  request: NextRequest
): Promise<NextResponse<RevalidateResponse>> {
  try {
    const token = request.nextUrl.searchParams.get("token");

    // Validate token for security
    if (!isValidToken(token)) {
      return NextResponse.json(
        { revalidated: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    revalidateTag(API_TAGS.BLOGS);

    return NextResponse.json({
      revalidated: true,
      message: "Successfully revalidated blogs",
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error during blogs revalidation:", error);
    return NextResponse.json(
      { revalidated: false, error: "Failed to revalidate blogs" },
      { status: 500 }
    );
  }
}
