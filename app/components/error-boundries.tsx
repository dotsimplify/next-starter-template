"use client";

import { useEffect } from "react";
import { ERROR_MESSAGES } from "@/constants";
import type { ErrorProps } from "@/types";
import type { JSX } from "react/jsx-runtime"; // Declaring JSX variable

export default function ErrorBoundary({
  error,
  reset,
}: ErrorProps): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-lg mb-6">{error.message || ERROR_MESSAGES.GENERAL}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-theme-yellow text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
