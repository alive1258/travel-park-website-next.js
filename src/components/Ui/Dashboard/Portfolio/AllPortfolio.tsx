"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, ImageOff } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { PortfolioItem } from "@/src/types/portfolioType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import { PORTFOLIO_ICON_MAP } from "@/src/utils/portfolioIcons";
import {
  useDeletePortfolioMutation,
  useGetAllPortfolioQuery,
} from "@/src/redux/api/portfolioApi";

const LIMIT = 10;

const AllPortfolio: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } = useGetAllPortfolioQuery({
    search: (debouncedSearch as string) || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [deletePortfolio] = useDeletePortfolioMutation();

  const items: PortfolioItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleDeleteItem = async (item: PortfolioItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete portfolio card "${item.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deletePortfolio(item.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Portfolio card "${item.title}" has been deleted.`,
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
            Luxury Charter Portfolio
          </h1>
          <p className="text-sm text-gray-500">
            Manage the charter experience cards on the Portfolio page
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <Link href="/dashboard/portfolio/add-portfolio">
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
                Image
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Icon
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Title
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
            {items?.length > 0 ? (
              items.map((item, index) => {
                const Icon = PORTFOLIO_ICON_MAP[item.icon];
                return (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-3 text-sm">
                      {(currentPage - 1) * LIMIT + index + 1}
                    </td>

                    <td className="px-5 py-3">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <ImageOff size={16} />
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        {Icon && <Icon size={18} />}
                      </div>
                    </td>

                    <td className="px-5 py-3 text-sm font-medium text-gray-800">
                      {item.title}
                    </td>

                    <td className="px-5 py-3 text-sm text-gray-500">
                      {item.href}
                    </td>

                    <td className="px-5 py-3 text-center text-sm text-gray-600">
                      {item.position}
                    </td>

                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          item.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex justify-center gap-2">
                        <Link href={`/dashboard/portfolio/edit-portfolio/${item.id}`}>
                          <button
                            className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteItem(item)}
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
                  No portfolio cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {items.length > 0 && (
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

export default AllPortfolio;
