"use client";

import React, { useState, useEffect } from "react";
import { addZero } from "@/helper";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { getUpcomingResults } from "@/lib/api";

interface UpcomingResult {
  gameName: string;
  result: number;
}

const ErrorUpcomingResults = () => {
  const router = useRouter();
  const [results, setResults] = useState<UpcomingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRefresh, setShowRefresh] = useState(false);

  const fetchResults = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newResults = await getUpcomingResults();
      setResults(newResults.results);
      setShowRefresh(false);

      // Auto-navigate after 10 seconds if results exist
      if (newResults.results.length > 0) {
        setTimeout(() => {
          router.push("/");
        }, 10000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch results");
      setShowRefresh(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show refresh button when there are no results
  useEffect(() => {
    if (results.length === 0 && !isLoading) {
      setShowRefresh(true);
    }
  }, [results, isLoading]);

  if (isLoading) {
    return (
      <section className="pb-3 text-center bg-black min-h-[200px] flex items-center justify-center">
        <NextImage
          height={60}
          width={60}
          priority
          alt="loading icon"
          src="/images/d.gif"
        />
      </section>
    );
  }

  if (!results || results.length === 0) {
    return (
      <section className="pb-3 text-center bg-black">
        {showRefresh && (
          <>
            <div className="flex justify-center mb-4">
              <button
                onClick={fetchResults}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md font-medium ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-100"
                } text-black`}
              >
                {isLoading ? "Loading..." : "Get Live Satta Results"}
              </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </>
        )}
      </section>
    );
  }

  return (
    <section className="pb-3 text-center bg-black">
      {results.map((single, index) => (
        <div className="py-2" key={`${single.gameName}-${index}`}>
          <p className="text-4xl font-bold text-white uppercase">
            {single.gameName}
          </p>
          <div className="flex justify-center py-3 text-center">
            {single.result !== -1 ? (
              <span className="text-4xl font-bold text-white">
                {addZero(single.result)}
              </span>
            ) : (
              <NextImage
                height={60}
                width={60}
                priority
                alt="wait icon"
                src="/images/d.gif"
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ErrorUpcomingResults;
