"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Ship,
  Users,
} from "lucide-react";
import {
  useCreateCheckoutSessionMutation,
  useGetPaymentsByBookingQuery,
  useVerifyCheckoutSessionMutation,
} from "@/src/redux/api/paymentApi";
import { useGetBookingByIdQuery } from "@/src/redux/api/bookingApi";
import type { ApiError } from "@/src/types/authType";

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

const PAYMENT_STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  succeeded: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
};

function money(currency: string, amount: number | string): string {
  return `${currency} ${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, refetch } = useGetBookingByIdQuery(
    bookingId as string,
    {
      skip: !bookingId,
    },
  );

  const booking = data?.data;
  const isConfirmed = booking?.payment_status !== "unpaid";

  // Poll for a few seconds in case the Stripe webhook hasn't landed yet by
  // the time the browser redirects back here.
  useGetBookingByIdQuery(bookingId as string, {
    skip: !bookingId || isConfirmed,
    pollingInterval: 3000,
  });

  // Webhooks require Stripe to be able to reach this server (a public URL,
  // or the Stripe CLI tunnel in local dev). As soon as we're back here with
  // a session_id, actively verify the session against Stripe ourselves
  // instead of only waiting on the webhook — self-heals local dev and any
  // delayed/missed webhook delivery in production too.
  const [verifySession, { isLoading: isVerifying }] =
    useVerifyCheckoutSessionMutation();
  const hasVerifiedRef = useRef(false);
  const [showManualCheck, setShowManualCheck] = useState(false);

  useEffect(() => {
    if (!sessionId || isConfirmed || hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;
    verifySession(sessionId).catch(() => {
      // Swallow — polling and the manual "Check Again" button remain as
      // fallbacks, and a failed sync here shouldn't crash the page.
    });
  }, [sessionId, isConfirmed, verifySession]);

  useEffect(() => {
    if (isConfirmed) return;
    const timer = setTimeout(() => setShowManualCheck(true), 10000);
    return () => clearTimeout(timer);
  }, [isConfirmed]);

  const handleCheckAgain = () => {
    if (sessionId) {
      verifySession(sessionId).catch(() => undefined);
    }
    refetch();
  };

  const { data: paymentsData, isLoading: isLoadingPayments } =
    useGetPaymentsByBookingQuery(bookingId as string, {
      skip: !bookingId || !isConfirmed,
    });
  const payments = paymentsData?.data ?? [];

  const [createCheckoutSession, { isLoading: isPayingBalance }] =
    useCreateCheckoutSessionMutation();

  const handlePayBalance = async () => {
    if (!booking) return;
    try {
      const res = await createCheckoutSession({
        booking_id: booking.id,
        type: "balance",
      }).unwrap();
      window.location.assign(res.data.url);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(
        apiError?.data?.message ||
          apiError?.message ||
          "Could not start the balance payment.",
      );
    }
  };

  const canPayBalance =
    !!booking &&
    booking.status !== "cancelled" &&
    booking.payment_status === "deposit_paid" &&
    Number(booking.balance_amount) > 0;

  return (
    <section className="bg-brand-50/40 py-16 md:py-24 print:bg-white print:py-6">
      <div className="container">
        {!bookingId || isLoading ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Loader2 size={40} className="animate-spin text-brand-600" />
            <p className="mt-4 text-brand-900/60">Loading your booking…</p>
          </div>
        ) : !booking ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Clock size={40} className="text-brand-600" />
            <h1 className="mt-4 text-2xl font-bold text-brand-900">
              We can&apos;t find that booking
            </h1>
            <p className="mt-2 max-w-md text-brand-900/60">
              If you completed a payment, check your dashboard — it may take a
              moment to appear.
            </p>
            <Link
              href="/dashboard/bookings"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Go to My Bookings
            </Link>
          </div>
        ) : !isConfirmed ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Loader2 size={40} className="animate-spin text-brand-600" />
            <h1 className="mt-4 text-2xl font-bold text-brand-900">
              Confirming your payment…
            </h1>
            <p className="mt-2 max-w-md text-brand-900/60">
              Stripe is finalizing your payment — this page will update
              automatically in a few seconds.
            </p>
            {showManualCheck && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="max-w-sm text-sm text-brand-900/50">
                  Taking longer than usual? You can check the status directly,
                  or find it in your bookings dashboard.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCheckAgain}
                    disabled={isVerifying}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw
                      size={15}
                      className={isVerifying ? "animate-spin" : ""}
                    />
                    {isVerifying ? "Checking…" : "Check Again"}
                  </button>
                  <Link
                    href="/dashboard/bookings"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-900/10 px-5 py-2.5 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                  >
                    View My Bookings
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            {/* HEADER */}
            <div className="flex flex-col items-center text-center print:hidden">
              <CheckCircle2 size={48} className="text-emerald-500" />
              <h1 className="mt-4 text-2xl font-bold text-brand-900 sm:text-3xl">
                Booking Confirmed
              </h1>
              <p className="mt-2 max-w-md text-brand-900/60">
                Your payment for {booking.yacht?.name ?? "your charter"} has
                been received. A confirmation has been sent to{" "}
                <span className="font-medium text-brand-900">
                  {booking.guest_email}
                </span>
                .
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-900/40">
                Booking Reference&nbsp;
                <span className="text-brand-600">
                  #{booking.id.slice(0, 8).toUpperCase()}
                </span>
              </p>
            </div>

            {/* RECEIPT CARD */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm print:border-0 print:shadow-none">
              {/* Yacht strip */}
              <div className="flex items-center gap-4 border-b border-brand-900/10 bg-brand-50/60 p-5">
                {booking.yacht?.hero_image ? (
                  <Image
                    src={booking.yacht.hero_image}
                    alt={booking.yacht.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-900/5 text-brand-900/30">
                    <Ship size={22} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-bold text-brand-900">
                    {booking.yacht?.name ?? "Yacht Charter"}
                  </p>
                  {booking.yacht?.slug && (
                    <Link
                      href={`/yachts/${booking.yacht.slug}`}
                      className="text-xs font-semibold text-brand-600 hover:underline print:hidden"
                    >
                      View Yacht Details
                    </Link>
                  )}
                </div>
                <div className="hidden shrink-0 gap-2 sm:flex">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                      STATUS_BADGE[booking.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                      PAYMENT_BADGE[booking.payment_status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.payment_status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2">
                {/* LEFT: Trip + Guest details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-900/50">
                      Trip Details
                    </h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-brand-600"
                        />
                        <span className="text-brand-900/70">
                          {booking.check_in} → {booking.check_out}
                          <span className="text-brand-900/40">
                            {" "}
                            ({booking.nights}{" "}
                            {booking.nights === 1 ? "night" : "nights"})
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Users size={15} className="shrink-0 text-brand-600" />
                        <span className="text-brand-900/70">
                          {booking.guests}{" "}
                          {booking.guests === 1 ? "guest" : "guests"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-900/50">
                      Guest Information
                    </h3>
                    <div className="space-y-2.5 text-sm">
                      <p className="font-medium text-brand-900">
                        {booking.guest_name}
                      </p>
                      <div className="flex items-center gap-2.5">
                        <Mail size={15} className="shrink-0 text-brand-600" />
                        <span className="text-brand-900/70">
                          {booking.guest_email}
                        </span>
                      </div>
                      {booking.guest_phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone
                            size={15}
                            className="shrink-0 text-brand-600"
                          />
                          <span className="text-brand-900/70">
                            {booking.guest_phone}
                          </span>
                        </div>
                      )}
                      {booking.message && (
                        <p className="mt-2 rounded-lg bg-brand-50/60 p-3 text-xs italic text-brand-900/60">
                          &quot;{booking.message}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Price + Payment */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-900/50">
                      Price Breakdown
                    </h3>
                    <div className="space-y-2 rounded-xl border border-brand-900/10 bg-brand-50/40 p-4 text-sm">
                      <div className="flex justify-between text-brand-900/70">
                        <span>
                          {booking.nights}{" "}
                          {booking.nights === 1 ? "night" : "nights"} ×{" "}
                          {money(booking.currency, booking.price_per_night)}
                        </span>
                        <span className="font-semibold text-brand-900">
                          {money(booking.currency, booking.subtotal_amount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-brand-900/70">
                        <span>Deposit ({booking.deposit_percentage}%)</span>
                        <span className="font-semibold text-brand-900">
                          {money(booking.currency, booking.deposit_amount)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-brand-900/10 pt-2 text-brand-900/70">
                        <span>Balance Due</span>
                        <span className="font-semibold text-brand-900">
                          {Number(booking.balance_amount) > 0
                            ? money(booking.currency, booking.balance_amount)
                            : "Paid in full"}
                        </span>
                      </div>
                    </div>
                    {canPayBalance && (
                      <button
                        type="button"
                        onClick={handlePayBalance}
                        disabled={isPayingBalance}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 print:hidden"
                      >
                        <CreditCard size={15} />
                        {isPayingBalance
                          ? "Redirecting…"
                          : "Pay Remaining Balance"}
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-900/50">
                      Payment History
                    </h3>
                    {isLoadingPayments ? (
                      <p className="text-sm text-brand-900/50">
                        Loading payments…
                      </p>
                    ) : payments.length ? (
                      <div className="space-y-2">
                        {payments.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between rounded-lg border border-brand-900/10 px-3 py-2 text-sm"
                          >
                            <div>
                              <span className="font-medium capitalize text-brand-900">
                                {p.type}
                              </span>
                              <span
                                className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
                                  PAYMENT_STATUS_BADGE[p.status] ||
                                  "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {p.status}
                              </span>
                              <p className="text-xs text-brand-900/40">
                                {new Date(p.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-brand-900">
                                {money(p.currency, p.amount)}
                              </p>
                              {p.receipt_url && (
                                <a
                                  href={p.receipt_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-semibold text-brand-600 underline print:hidden"
                                >
                                  View Receipt
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-brand-900/50">
                        No payments recorded yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingConfirmation;
