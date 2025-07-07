import React from "react";
import { addZero } from "@/helper";
import NextImage from "next/image";

interface UpcomingResult {
  gameName: string;
  result: number;
}

interface UpcomingResultsProps {
  results: UpcomingResult[];
}

const UpcomingResults: React.FC<UpcomingResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
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

export default UpcomingResults;
