import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export interface RevalidateResponse {
  revalidated: boolean;
  message?: string;
  error?: string;
  now?: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<RevalidateResponse>> {
  try {
    // Revalidate ads
    revalidateTag("games");

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
