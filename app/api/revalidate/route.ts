import { type NextRequest, NextResponse } from "next/server";
import { revalidateHomePage } from "@/lib/revalidation";
import type { RevalidateResponse } from "@/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<RevalidateResponse>> {
  const token = request.nextUrl.searchParams.get("token");
  const result = revalidateHomePage(token);

  if (!result.revalidated) {
    return NextResponse.json(result, {
      status: result.error === "Invalid token" ? 401 : 500,
    });
  }

  return NextResponse.json(result);
}
