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

    // Revalidate ads
    revalidateTag(API_TAGS.GAMES);

    return NextResponse.json({
      revalidated: true,
      message: "Successfully revalidated ads",
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error during ads revalidation:", error);
    return NextResponse.json(
      { revalidated: false, error: "Failed to revalidate ads" },
      { status: 500 }
    );
  }
}
