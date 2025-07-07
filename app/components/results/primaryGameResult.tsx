import React from "react";
import { addZero, AM_PM_Time } from "@/helper";
import NextImage from "next/image";
import { API_TAGS } from "@/constants";

interface GameResult {
  gameName: string;
  createdAt: string;
  yesterday: number;
  today: number;
  // Add other properties if they exist in your API response
}

interface ApiResponse {
  results: GameResult[];
}

async function getPrimaryResults(): Promise<ApiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/primary-games-result`,
    {
      next: { tags: [API_TAGS.RESULTS] },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch primary game results");
  }

  return res.json();
}

const PrimaryGameResult = async () => {
  let results: GameResult[] = [];

  try {
    const data = await getPrimaryResults();
    results = data.results || [];
  } catch (error) {
    console.error("Error fetching primary game results:", error);
    // Optionally render an error state here
    return null;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <section className="flex justify-center py-4 bg-theme-yellow">
      {results.map((data, index) => (
        <div key={`${data.gameName}-${index}`} className="mx-4">
          <h3 className="p-0 text-xl font-semibold uppercase sm:text-2xl">
            {data.gameName}
          </h3>
          <p className="py-2 text-lg text-center">
            {AM_PM_Time(data.createdAt)}
          </p>
          <div className="flex items-center justify-evenly">
            <strong className="text-2xl font-bold">
              {data.yesterday !== -1 ? addZero(data.yesterday) : "--"}
            </strong>
            <NextImage
              src="/images/arrow.gif"
              alt="arrow icon"
              height={30}
              width={30}
              className="ml-1"
            />
            {data.today !== -1 ? (
              <strong className="text-2xl font-bold">
                {addZero(data.today)}
              </strong>
            ) : (
              <NextImage
                alt="wait icon"
                src="/images/d.gif"
                height={60}
                width={60}
                className="img-responsive"
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PrimaryGameResult;
