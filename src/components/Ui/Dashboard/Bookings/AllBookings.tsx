"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { ImageOff, Search } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/src/redux/api/bookingApi";
import { BookingItem, BookingStatus } from "@/src/types/bookingType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";

const LIMIT = 10;

const BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const PAYMENT_BADGE: Record<string, string> = {
  unpaid: "bg-gray-100 text-gray-600",
  deposit_paid: "bg-amber-100 text-amber-700",
  paid_in_full: "bg-emerald-100 text-emerald-700",
  refunded: "bg-red-100 text-red-700",
};

const AllBookings: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500) as string;

  const { data, isLoading, isFetching } = useGetAllBookingsQuery({
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: LIMIT,
    filters: statusFilter ? { status: statusFilter as BookingStatus } : undefined,
  });
  const [updateStatus] = useUpdateBookingStatusMutation();

  const bookings: BookingItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = async (booking: BookingItem, status: BookingStatus) => {
    try {
      await updateStatus({ id: booking.id, status }).unwrap();
      toast.success(`Booking marked as ${status}`);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(
        apiError?.data?.message || apiError?.message || "Could not update booking.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-md bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500">Every charter booking across all customers</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search guest name or email..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full sm:w-64 rounded-lg border border-gray-300 pl-9 pr-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 capitalize"
          >
            <option value="">All Statuses</option>
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Yacht</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Guest</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Dates</th>
              <th className="px-5 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      {booking.yacht?.hero_image ? (
                        <Image
                          src={booking.yacht.hero_image}
                          alt={booking.yacht.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <ImageOff size={14} />
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {booking.yacht?.name ?? "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    <p className="font-medium text-gray-800">{booking.guest_name}</p>
                    <p className="text-xs text-gray-400">{booking.guest_email}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {booking.check_in} → {booking.check_out}
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {booking.currency} {Number(booking.subtotal_amount).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking, e.target.value as BookingStatus)
                      }
                      className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-bold capitalize outline-none ${
                        STATUS_BADGE[booking.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                        PAYMENT_BADGE[booking.payment_status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {booking.payment_status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {bookings.length > 0 && (
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

export default AllBookings;
