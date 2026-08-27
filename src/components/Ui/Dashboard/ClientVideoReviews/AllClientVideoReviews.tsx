"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, Star, PlayCircle } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { ClientVideoReviewItem } from "@/src/types/clientVideoReviewType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeleteClientVideoReviewMutation,
  useGetAllClientVideoReviewsQuery,
} from "@/src/redux/api/clientVideoReviewApi";

const LIMIT = 10;

const AllClientVideoReviews: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } =
    useGetAllClientVideoReviewsQuery({
      search: (debouncedSearch as string) || undefined,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteClientVideoReview] = useDeleteClientVideoReviewMutation();

  const reviews: ClientVideoReviewItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleDeleteReview = async (review: ClientVideoReviewItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete video review from "${review.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteClientVideoReview(review.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Video review from "${review.name}" has been deleted.`,
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
            Client Video Reviews
          </h1>
          <p className="text-sm text-gray-500">
            Manage the homepage video testimonials
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search video reviews..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <Link href="/dashboard/client-video-reviews/add-client-video-review">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
              <Plus size={18} />
              Add Video Review
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
                Client Image
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Designation
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Video
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <tr
                  key={review.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="px-5 py-3">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full border "
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                        {review.name?.charAt(0).toUpperCase() || "C"}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3 text-sm font-medium text-gray-800">
                    {review.name}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600">
                    {review.designation || "N/A"}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span>{review.rating}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <a
                      href={review.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#2AA7FF] hover:underline"
                    >
                      <PlayCircle size={14} />
                      Watch
                    </a>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        review.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {review.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/client-video-reviews/edit-client-video-review/${review.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteReview(review)}
                        className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10 text-center text-gray-500">
                  No client video reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {reviews.length > 0 && (
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

export default AllClientVideoReviews;
