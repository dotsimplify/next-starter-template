import React from "react";
import { dateWithoutHoursSorting, addZero } from "@/helper";

interface GameResult {
  gameName: string;
  result: string | number;
  resultDate: string;
  createdAt: string;
}

interface YearTableProps {
  results: GameResult[];
  days: number;
  month: number;
  year: number;
  gameName: string;
}

const YearTable: React.FC<YearTableProps> = ({
  results,
  days,
  month,
  year,
  gameName,
}) => {
  const todayISO = new Date().toISOString();
  const daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

  // Create initial array with empty results
  const unsortedNewArr: GameResult[] = daysInMonth.map((day) => ({
    gameName,
    result: "-",
    resultDate: `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`,
    createdAt: todayISO,
  }));

  // Fill in actual results
  results.forEach((singleResult) => {
    const findObjInUnsorted = unsortedNewArr.findIndex(
      (one) => one.resultDate === singleResult.resultDate
    );
    if (findObjInUnsorted !== -1) {
      unsortedNewArr[findObjInUnsorted] = {
        ...unsortedNewArr[findObjInUnsorted],
        result: singleResult.result,
        createdAt: singleResult.createdAt,
      };
    }
  });

  const sorted = dateWithoutHoursSorting(unsortedNewArr, "resultDate");

  return (
    <table className="table w-full border-separate whitespace-nowrap">
      <tbody>
        {sorted.map((single, index) => (
          <tr key={`${single.resultDate}-${index}`} className="text-green-600">
            <th
              className={`w-full py-1 text-center border ${
                single.result === "-"
                  ? "text-indigo-700  bg-white"
                  : "text-indigo-700  bg-white cursor-pointer"
              }`}
              title={single.resultDate}
            >
              {single.result === "-" ? "-" : addZero(Number(single.result))}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default YearTable;
