import { notFound } from "next/navigation";
import { ERROR_MESSAGES } from "@/constants";
import type { JSX } from "react";

// Generic error handler for async functions
export async function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  errorMessage: string = ERROR_MESSAGES.GENERAL
): Promise<T> {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`${errorMessage}: `, error);
    throw error;
  }
}

// Error handler for page components
export async function handlePageError<T>(
  asyncFn: () => Promise<T>,
  errorHandler?: (error: unknown) => JSX.Element
): Promise<T | JSX.Element> {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`Error rendering page: `, error);

    if (errorHandler) {
      return errorHandler(error);
    }

    return notFound();
  }
}

// Error handler for API routes
export async function handleApiError<T>(
  req: Request,
  asyncFn: () => Promise<T>,
  errorStatus = 500
): Promise<Response> {
  try {
    const result = await asyncFn();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`API error: `, error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL,
      }),
      {
        status: errorStatus,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Check if a resource exists, otherwise return notFound
export function checkResourceExists<T>(resource: T | null | undefined): T {
  if (!resource) {
    notFound();
  }
  return resource;
}
