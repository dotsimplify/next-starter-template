"use client";

import { useEffect } from "react";
import DataTable from "@/components/dashboard/dataTable";
import type { TableData, TableColumn } from "@/types";
import type { JSX } from "react/jsx-runtime";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getResultsRequest, setResults } from "@/features/userSlice";

export default function ResultsPage(): JSX.Element {
  const router = useRouter();
  const results = useSelector((state: RootState) => state.login.results);
  const loading = useSelector((state: RootState) => state.app.isLoading);
  // Memoize handleLogout to prevent recreation
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getResultsRequest());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit-result/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    router.push(`/dashboard/delete-result/${id}`);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    const sortedResults = [...results].sort((a, b) => {
      const aValue = a[key as keyof TableData];
      const bValue = b[key as keyof TableData];

      if (direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    dispatch(setResults(sortedResults));
  };

  const columns: TableColumn[] = [
    {
      key: "gameName",
      label: "Game Name",
      sortable: true,
    },
    {
      key: "result",
      label: "Result",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value}
        </span>
      ),
    },
    {
      key: "resultDate",
      label: "Date",
      sortable: true,
      render: (value) => value,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Results Management
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage all satta king results from here.
        </p>
      </div>

      <div className="mb-4">
        <Link href="/dashboard/publish-result">
          <button className="bg-theme-yellow hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium">
            Add New Result
          </button>
        </Link>
      </div>

      <DataTable
        data={results}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        showDeleteLink={true} // Use delete link instead of button
      />
    </div>
  );
}
