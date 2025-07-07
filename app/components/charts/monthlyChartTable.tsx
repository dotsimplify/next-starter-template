import React from "react";
import { formatResultDate, addZero, dateSortingWithIndexOf } from "@/helper";
import {
  MonthlyChartTableProps,
  TableRow,
  GameResultForMonthChart,
} from "@/types";

function moveToLast<T>(arr: T[], target: T): T[] {
  return [...arr.filter((item) => item !== target), target];
}

export const getGameNamesSortedByPosition = (
  results: GameResultForMonthChart[],
  tableKey: string
): string[] => {
  if (!results || !results.length) return ["resultDate"];

  // Remove duplicates by creating a Map with gameName as key
  const uniqueGames = new Map<string, GameResultForMonthChart>();
  results.forEach((game) => {
    if (!uniqueGames.has(game.gameName)) {
      uniqueGames.set(game.gameName, game);
    }
  });

  // Convert Map values to array, sort by position, and extract gameNames
  const sorted = Array.from(uniqueGames.values())
    .sort((a, b) => {
      // Split into hours and minutes
      const [aHours, aMins] = (a.resultTime || "00:00").split(":").map(Number);
      const [bHours, bMins] = (b.resultTime || "00:00").split(":").map(Number);

      // Compare hours first, then minutes
      return aHours - bHours || aMins - bMins;
    })
    .map((game) => game.gameName);
  const final = moveToLast(sorted, "disawer");
  return tableKey === "table1"
    ? ["resultDate", ...final]
    : ["resultDate", ...sorted];
};

const MonthlyChartTable: React.FC<MonthlyChartTableProps> = ({
  data,
  tableKey,
}) => {
  // Transform data into table rows
  const array: TableRow[] = [];
  const columns = getGameNamesSortedByPosition(data, tableKey);
  Object.values(data).forEach((single) => {
    const foundIndex = array.findIndex(
      (obj) => obj.resultDate === single.resultDate
    );
    if (foundIndex !== -1) {
      array[foundIndex][single.gameName] = single.result;
    } else {
      const newRow: TableRow = {
        resultDate: single.resultDate,
        createdAt: single.createdAt,
        [single.gameName]: single.result,
      };
      array.push(newRow);
    }
  });
  // Sort the array by date
  const sorted = dateSortingWithIndexOf(array, "resultDate");

  return (
    <section className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 border border-collapse border-gray-800">
        <thead className="text-base text-black">
          <tr>
            {columns.map((item) => (
              <td
                key={`header-${item}`}
                className={
                  item === "resultDate"
                    ? "py-2 text-sm sticky left-0 z-50 font-semibold min-w-[100px] bg-theme-yellow w-[100px] text-center border border-gray-800"
                    : "min-w-[150px] bg-theme-yellow p-4 py-2 text-sm font-semibold text-center uppercase border border-gray-800"
                }
              >
                {item === "resultDate" ? <strong>Date</strong> : item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((column, colIndex) => {
                const cellValue = item[column];
                const isDateColumn = column === "resultDate";

                return (
                  <td
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={
                      isDateColumn
                        ? "sticky left-0 py-1 font-bold text-center text-black border border-gray-800 bg-theme-yellow"
                        : "p-4 py-2 font-bold tracking-widest text-center text-black border border-gray-800"
                    }
                  >
                    <span className="text-center">
                      {isDateColumn
                        ? formatResultDate(item.resultDate)
                        : cellValue === 0 ||
                          (typeof cellValue === "number" && cellValue < 100)
                        ? addZero(cellValue)
                        : "-"}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MonthlyChartTable;
