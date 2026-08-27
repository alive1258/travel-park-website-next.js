"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { ChevronDown, ChevronRight, CreditCard, ImageOff } from "lucide-react";
import { useGetMyBookingsQuery } from "@/src/redux/api/bookingApi";
import { useCreateCheckoutSessionMutation } from "@/src/redux/api/paymentApi";
import { useGetPaymentsByBookingQuery } from "@/src/redux/api/paymentApi";
import { BookingItem } from "@/src/types/bookingType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";

const LIMIT = 10;

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

const PaymentHistory = ({ bookingId }: { bookingId: string }) => {
  const { data, isLoading } = useGetPaymentsByBookingQuery(bookingId);
  const payments = data?.data ?? [];

  if (isLoading) return <p className="text-sm text-brand-900/50">Loading payments…</p>;
  if (!payments.length)
    return <p className="text-sm text-brand-900/50">No payments recorded yet.</p>;

  return (
    <div className="space-y-1.5">
      {payments.map((p) => (
        <div key={p.id} className="flex items-center justify-between text-sm">
          <span className="capitalize text-brand-900/70">
            {p.type} — {p.status}
          </span>
          <span className="flex items-center gap-3">
            <span className="font-semibold text-brand-900">
              {p.currency} {Number(p.amount).toLocaleString()}
            </span>
            {p.receipt_url && (
              <a
                href={p.receipt_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-600 underline"
              >
                Receipt
              </a>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

const MyBookings: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useGetMyBookingsQuery({
    page: currentPage,
    limit: LIMIT,
  });
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const bookings: BookingItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handlePay = async (booking: BookingItem) => {
    const type = booking.payment_status === "unpaid" ? "deposit" : "balance";
    setPayingId(booking.id);
    try {
      const res = await createCheckoutSession({
        booking_id: booking.id,
        type,
      }).unwrap();
      window.location.assign(res.data.url);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(
        apiError?.data?.message || apiError?.message || "Could not start payment.",
      );
      setPayingId(null);
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
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500">
          Every yacht charter you&apos;ve booked, and its payment status
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 w-8"></th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Yacht</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Dates</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Guests</th>
              <th className="px-5 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Payment</th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const isExpanded = expandedId === booking.id;
                const canPay =
                  booking.status !== "cancelled" &&
                  (booking.payment_status === "unpaid" ||
                    (booking.payment_status === "deposit_paid" &&
                      Number(booking.balance_amount) > 0));

                return (
                  <React.Fragment key={booking.id}>
                    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                          className="cursor-pointer text-gray-400 hover:text-emerald-600"
                        >
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                      </td>
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
                      <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {booking.check_in} → {booking.check_out}
                      </td>
                      <td className="px-5 py-3 text-center text-sm text-gray-600">
                        {booking.guests}
                      </td>
                      <td className="px-5 py-3 text-right text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {booking.currency} {Number(booking.subtotal_amount).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                            STATUS_BADGE[booking.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {booking.status}
                        </span>
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
                      <td className="px-5 py-3 text-center">
                        {canPay && (
                          <button
                            onClick={() => handlePay(booking)}
                            disabled={payingId === booking.id}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                          >
                            <CreditCard size={13} />
                            {booking.payment_status === "unpaid" ? "Pay Deposit" : "Pay Balance"}
                          </button>
                        )}
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="border-t border-gray-100 bg-gray-50/60">
                        <td colSpan={8} className="px-5 py-4">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                Pricing
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between text-gray-600">
                                  <span>
                                    {booking.nights} nights &times; {booking.currency}{" "}
                                    {Number(booking.price_per_night).toLocaleString()}
                                  </span>
                                  <span>
                                    {booking.currency}{" "}
                                    {Number(booking.subtotal_amount).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                  <span>Deposit ({booking.deposit_percentage}%)</span>
                                  <span>
                                    {booking.currency}{" "}
                                    {Number(booking.deposit_amount).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                  <span>Balance</span>
                                  <span>
                                    {booking.currency}{" "}
                                    {Number(booking.balance_amount).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              {booking.message && (
                                <p className="mt-3 text-sm italic text-gray-500">
                                  &quot;{booking.message}&quot;
                                </p>
                              )}
                            </div>
                            <div>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                Payment History
                              </h4>
                              <PaymentHistory bookingId={booking.id} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  You haven&apos;t booked a yacht yet.
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

export default MyBookings;
