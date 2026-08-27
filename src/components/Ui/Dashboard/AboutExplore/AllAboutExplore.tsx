"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AboutExploreCard } from "@/src/types/aboutExploreType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import { ABOUT_EXPLORE_ICON_MAP } from "@/src/utils/aboutExploreIcons";
import {
  useDeleteAboutExploreMutation,
  useGetAllAboutExploreQuery,
} from "@/src/redux/api/aboutExploreApi";

const LIMIT = 10;

const AllAboutExplore: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } = useGetAllAboutExploreQuery({
    search: (debouncedSearch as string) || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteAboutExplore] = useDeleteAboutExploreMutation();

  const cards: AboutExploreCard[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleDeleteCard = async (card: AboutExploreCard) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete card "${card.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteAboutExplore(card.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Card "${card.title}" has been deleted.`,
        timer: 1000,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      const apiError = err as ApiError;

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: apiError.data?.message || apiError.message || "Delete failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            About Explore Cards
          </h1>
          <p className="text-sm text-gray-500">
            Manage the &quot;More About Eco Yachts&quot; cards on the About page
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <Link href="/dashboard/about-explore/add-about-explore">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
              <Plus size={18} />
              Add Card
            </button>
          </Link>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Icon
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Link
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Position
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {cards?.length > 0 ? (
              cards.map((card, index) => {
                const Icon = ABOUT_EXPLORE_ICON_MAP[card.icon];
                return (
                  <tr
                    key={card.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-3 text-sm">
                      {(currentPage - 1) * LIMIT + index + 1}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        {Icon && <Icon size={18} />}
                      </div>
                    </td>

                    <td className="px-5 py-3 text-sm font-medium text-gray-800">
                      {card.title}
                    </td>

                    <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">
                      {card.description}
                    </td>

                    <td className="px-5 py-3 text-sm text-gray-500">
                      {card.href}
                    </td>

                    <td className="px-5 py-3 text-center text-sm text-gray-600">
                      {card.position}
                    </td>

                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          card.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {card.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/about-explore/edit-about-explore/${card.id}`}
                        >
                          <button
                            className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteCard(card)}
                          className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No About Explore cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {cards.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default AllAboutExplore;
