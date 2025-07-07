// components/UpcomingResults.tsx
import React from "react";
import NextImage from "next/image";

interface IUpcomingResult {
  gameName: string;
  result: number; // -1 typically represents "waiting" state
}

interface UpcomingResultsProps {
  results?: IUpcomingResult[]; // Optional array
}

const addZero = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const UpcomingResults: React.FC<UpcomingResultsProps> = ({
  results = [],
}) => {
  if (results.length === 0) return null;

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
                unoptimized
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
