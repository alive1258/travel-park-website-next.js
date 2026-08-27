"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, ImageOff } from "lucide-react";
import { LifeAboardPhotoItem } from "@/src/types/lifeAboardPhotoType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeleteLifeAboardPhotoMutation,
  useGetAllLifeAboardPhotosQuery,
} from "@/src/redux/api/lifeAboardPhotoApi";

const LIMIT = 10;

const AllLifeAboardPhotos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } =
    useGetAllLifeAboardPhotosQuery({
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteLifeAboardPhoto] = useDeleteLifeAboardPhotoMutation();

  const photos: LifeAboardPhotoItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeletePhoto = async (photo: LifeAboardPhotoItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Delete this photo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteLifeAboardPhoto(photo.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Photo has been deleted.",
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
            Life Aboard Photos
          </h1>
          <p className="text-sm text-gray-500">
            Manage the &quot;Life Aboard&quot; gallery strip on the Fleet page
          </p>
        </div>

        <Link href="/dashboard/life-aboard-photos/add-life-aboard-photo">
          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
            <Plus size={18} />
            Add Photo
          </button>
        </Link>
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
                Photo
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Position
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
            {photos?.length > 0 ? (
              photos.map((photo, index) => (
                <tr
                  key={photo.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="px-5 py-3">
                    {photo.image ? (
                      <Image
                        src={photo.image}
                        alt="Life aboard"
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <ImageOff size={16} />
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {photo.position}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        photo.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {photo.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/life-aboard-photos/edit-life-aboard-photo/${photo.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeletePhoto(photo)}
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
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No photos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {photos.length > 0 && (
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

export default AllLifeAboardPhotos;
