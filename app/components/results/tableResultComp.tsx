import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { addSlash, addZero, AM_PM_Time } from "@/helper";

interface GameResult {
  gameName: string;
  gameResultTime: string;
  yesterday: number;
  today: number;
  // Add other properties if they exist in your data
}

interface TableResultCompProps {
  mapResults: GameResult[];
}

const TableResultComp: React.FC<TableResultCompProps> = ({ mapResults }) => {
  // Sort results by time
  const sorted = [...mapResults].sort((a, b) =>
    a.gameResultTime.localeCompare(b.gameResultTime)
  );

  return (
    <div className="relative p-0 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 border-collapse border-gray-400">
        <thead className="text-base text-white bg-black">
          <tr>
            <th className="text-center border border-gray-800 py-3 w-[37%]">
              सट्टा का नाम
            </th>
            <th className="py-3 text-center border border-gray-800">
              कल आया था
            </th>
            <th className="py-3 text-center border border-gray-800">
              आज का रिज़ल्ट
            </th>
          </tr>
        </thead>

        {sorted.length > 0 &&
          sorted.map((single, index) => (
            <tbody key={`${single.gameName}-${index}`}>
              <tr>
                <td className="py-2 text-center text-white border border-gray-800 bg-theme-yellow">
                  <Link
                    className="text-base font-bold text-black uppercase hover:text-blue-600 md:text-2xl"
                    href={`/super-fast-sattaking-yearly-chart/${addSlash(
                      single.gameName
                    )}`}
                    passHref
                  >
                    {single.gameName}
                  </Link>
                  <p className="text-sm font-bold text-gray-800 md:text-lg">
                    {AM_PM_Time(single.gameResultTime)}
                  </p>
                </td>
                <td className="text-center bg-white border border-gray-800 yesterday-number">
                  <div className="text-2xl font-bold tracking-widest text-black">
                    {single.yesterday === -1 ? "--" : addZero(single.yesterday)}
                  </div>
                </td>
                <td className="text-center bg-white border border-gray-800 today-number">
                  <div
                    className="flex justify-center"
                    style={{
                      marginBottom: 0,
                      letterSpacing: "2px",
                      fontSize: "22px",
                    }}
                  >
                    {single.today === -1 ? (
                      <NextImage
                        src="/images/d.gif"
                        height={40}
                        width={40}
                        alt="wait icon"
                        priority
                      />
                    ) : (
                      <span className="text-2xl font-bold tracking-widest text-black">
                        {addZero(single.today)}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default TableResultComp;
