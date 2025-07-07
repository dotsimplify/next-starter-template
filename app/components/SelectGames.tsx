"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getYearsDescending } from "@/helper";

interface Game {
  slug: string;
  gameName: string;
}

interface SelectGamesProps {
  games: Game[];
}

const SelectGames: React.FC<SelectGamesProps> = ({ games }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [slug, setSlug] = useState(games && games[0]?.slug);
  const [year, setYear] = useState(currentYear);
  const yearsArray = getYearsDescending(2022);
  const handleSubmit = () => {
    if (slug) {
      if (year === currentYear) {
        router.push(`/super-fast-sattaking-yearly-chart/${slug}`);
      } else router.push(`/satta-king-chart-${year}/${slug}`);
    }
  };
  return (
    <div className="flex items-center justify-center py-4 space-x-2 px-12 bg-white md:space-x-4">
      <select
        className="px-4 py-2 text-sm font-medium uppercase border-2 border-yellow-400 rounded-md outline-none md:text-xl"
        aria-label="satta game name"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSlug(e.target.value)
        }
        value={slug}
      >
        {games?.length > 0 &&
          games.map((one: Game) => (
            <option key={one.gameName} value={one.slug}>
              {one.gameName}
            </option>
          ))}
      </select>

      <select
        className="px-1 py-2  text-sm font-medium uppercase border-2 border-yellow-400 rounded-md outline-none md:px-4 md:text-xl"
        aria-label="year"
      >
        {yearsArray &&
          yearsArray.length > 0 &&
          yearsArray.map((one, index) => (
            <option key={index} value={one}>
              {one}
            </option>
          ))}
      </select>

      <button
        type="button"
        onClick={handleSubmit}
        className="text-black bg-theme-yellow hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg hover:bg-gray-900/70 text-sm px-3 py-2.5 me-2"
      >
        Check
      </button>
    </div>
  );
};

export default SelectGames;
