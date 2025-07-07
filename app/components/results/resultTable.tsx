import React from "react";
import TableResultComp from "@/components/results/tableResultComp";
import { groupBy, mixedSorting } from "@/helper";
import AdsTemplate from "@/components/ads/adsTemplate";
import { GameResult, Ad } from "@/types"; // Make sure to import these types

interface ResultTableProps {
  results: Record<string, GameResult[]>;
  ads: Ad[];
}
const ResultTable: React.FC<ResultTableProps> = ({ results, ads }) => {
  const sortedObjectKeys = mixedSorting(Object.keys(results));
  const sortedByPositionAds = groupBy(ads, "position");

  return (
    <section className="text-white">
      {sortedObjectKeys.map((single, index) => (
        <article key={`${single}-${index}`} className="p-0 mb-4">
          <TableResultComp mapResults={results[single]} />
          {Array.isArray(sortedByPositionAds[single]) && (
            <AdsTemplate ads={sortedByPositionAds[single]} />
          )}
        </article>
      ))}
    </section>
  );
};

export default ResultTable;
