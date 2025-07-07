import { ResultResponse } from "@/endpoints/userAPI";
import type { JSX } from "react";

interface DashboardStatsProps {
  stats: ResultResponse;
}

export default function DashboardStatsComponent({
  stats,
}: DashboardStatsProps): JSX.Element {
  const statItems = [
    {
      name: "Total Games",
      value: stats.gameName,
      icon: "🎮",
      color: "bg-blue-500",
    },
    {
      name: "Total Results",
      value: stats.result,
      icon: "📊",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`${item.color} rounded-md p-3`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {item.value.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
