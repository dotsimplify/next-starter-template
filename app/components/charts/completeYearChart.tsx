import React from "react";
import YearTable from "./yearTable";
import {
  splitMonthFromDate,
  strReplace,
  yearNumber,
  yearsArray,
  day,
  allYear,
} from "@/helper";
import { CompleteData } from "@/types";

interface YearlyResultTableProps {
  thisYear: number;
  slug: string;
  data: CompleteData;
}

const YearlyResultTable: React.FC<YearlyResultTableProps> = ({
  thisYear,
  slug,
  data,
}) => {
  for (const key in data) {
    const singleMonth = data[key];
    if (singleMonth.resultDate) {
      const month = splitMonthFromDate(singleMonth.resultDate);
      const engMonth = yearsArray[month - 1];
      allYear[engMonth].push(singleMonth);
    }
  }
  return (
    <div className="overflow-auto">
      <table className="w-full table-auto">
        <tbody>
          <tr className="text-black bg-theme-yellow">
            <th className="sticky left-0 px-3 py-3 bg-theme-yellow">
              {thisYear}
            </th>
            {yearNumber.map((one, index) => (
              <th key={index} className="px-3 border border-gray-400 fs-6">
                {yearsArray[one]}
              </th>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 text-center">
              <table className="table w-full text-center border-separate whitespace-nowrap">
                <tbody>
                  {day.map((one) => (
                    <tr key={one} className="text-center bg-gray-100">
                      <th className="w-full py-1 text-blue-800 text-center bg-white border ">
                        {one}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </th>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <th key={month}>
                <YearTable
                  results={allYear[getMonthAbbreviation(month)]}
                  days={31} // You might want to make this dynamic per month
                  month={month}
                  gameName={strReplace(slug)}
                  year={Number(thisYear)}
                />
              </th>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get month abbreviation
function getMonthAbbreviation(month: number): string {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return months[month - 1];
}

export default YearlyResultTable;
