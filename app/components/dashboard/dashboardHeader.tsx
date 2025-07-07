"use client";
import type { JSX } from "react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "@/features/userSlice";

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({
  setSidebarOpen,
}: DashboardHeaderProps): JSX.Element {
  const user = useSelector((state: RootState) => state.login.userDetails);
  // Memoize handleLogout to prevent recreation
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-yellow lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <div className="flex-1 px-4 flex justify-end">
        <div className="ml-4 flex items-center md:ml-6">
          <div className="ml-3 relative">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <button
                onClick={() => dispatch(logoutRequest())}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
