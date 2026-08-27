"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useGetAllPaymentsQuery } from "@/src/redux/api/paymentApi";
import { PaymentItem, PaymentStatus, PaymentType } from "@/src/types/paymentType";
import Pagination from "@/src/utils/Pagination";

const LIMIT = 10;

const PAYMENT_STATUSES: PaymentStatus[] = ["pending", "succeeded", "failed", "refunded"];
const PAYMENT_TYPES: PaymentType[] = ["deposit", "balance"];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  succeeded: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-amber-100 text-amber-700",
};

const AllPayments: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500) as string;

  const { data, isLoading, isFetching } = useGetAllPaymentsQuery({
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: LIMIT,
    filters: {
      status: (statusFilter as PaymentStatus) || undefined,
      type: (typeFilter as PaymentType) || undefined,
    },
  });

  const payments: PaymentItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
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
          <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500">Every Stripe payment across all bookings</p>
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
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 capitalize"
          >
            <option value="">All Types</option>
            {PAYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 capitalize"
          >
            <option value="">All Statuses</option>
            {PAYMENT_STATUSES.map((s) => (
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
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Booking Dates</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-5 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 text-sm">
                    <p className="font-medium text-gray-800">{payment.user?.name ?? "—"}</p>
                    <p className="text-xs text-gray-400">{payment.user?.email}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {payment.booking
                      ? `${payment.booking.check_in} → ${payment.booking.check_out}`
                      : "—"}
                  </td>
                  <td className="px-5 py-3 text-sm capitalize text-gray-600">{payment.type}</td>
                  <td className="px-5 py-3 text-right text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {payment.currency} {Number(payment.amount).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                        STATUS_BADGE[payment.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {payment.receipt_url ? (
                      <a
                        href={payment.receipt_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-emerald-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {payments.length > 0 && (
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

export default AllPayments;
