/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  Receipt,
  Sailboat,
  Users,
  MapPin,
  Newspaper,
  Quote,
  Video,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  ImageOff,
  type LucideIcon,
} from "lucide-react";

import { useGetAllBookingsQuery } from "@/src/redux/api/bookingApi";
import { useGetAllPaymentsQuery } from "@/src/redux/api/paymentApi";
import { useGetAllYachtsQuery } from "@/src/redux/api/yachtAdminApi";
import { useGetAllDestinationsQuery } from "@/src/redux/api/destinationApi";
import { useGetUsersQuery } from "@/src/redux/api/usersApi";
import { useGetAllBlogsQuery } from "@/src/redux/api/blogApi";
import { useGetAllTestimonialsQuery } from "@/src/redux/api/testimonialApi";
import { useGetAllVideoGallariesQuery } from "@/src/redux/api/videoGallaryApi";
import { useGetAllQuestionAnswersQuery } from "@/src/redux/api/questionAnswerApi";
import type { BookingItem } from "@/src/types/bookingType";
import type { PaymentItem } from "@/src/types/paymentType";

import RevenueTrendChart from "./RevenueTrendChart";
import BookingStatusChart from "./BookingStatusChart";
import PaymentStatusChart from "./PaymentStatusChart";
import TopYachtsChart from "./TopYachtsChart";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function sumSucceededPayments(payments: PaymentItem[]) {
  return payments
    .filter((p) => p.status === "succeeded")
    .reduce((total, p) => total + (Number(p.amount) || 0), 0);
}

function inWeek<T>(items: T[], getDate: (item: T) => string, weeksAgo: number) {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() - weeksAgo * 7);
  const start = new Date(end);
  start.setDate(start.getDate() - 7);

  return items.filter((item) => {
    const created = new Date(getDate(item));
    return created >= start && created < end;
  });
}

function percentDelta(current: number, previous: number) {
  if (previous > 0) return ((current - previous) / previous) * 100;
  return current > 0 ? 100 : 0;
}

// Most common currency among succeeded payments — this fleet prices
// predominantly in one currency, but nothing enforces it, so we don't just
// hardcode one.
function primaryCurrency(payments: PaymentItem[], fallback = "USD") {
  const counts = new Map<string, number>();
  payments
    .filter((p) => p.status === "succeeded")
    .forEach((p) => counts.set(p.currency, (counts.get(p.currency) || 0) + 1));

  let best = fallback;
  let bestCount = 0;
  counts.forEach((count, currency) => {
    if (count > bestCount) {
      best = currency;
      bestCount = count;
    }
  });
  return best;
}

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

// ─────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  deltaPercent?: number;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBg,
  deltaPercent,
  isLoading,
}) => {
  const hasDelta = typeof deltaPercent === "number";
  const isUp = (deltaPercent || 0) >= 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm font-bold text-gray-500">
          {title}
        </span>
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon size={18} className="text-white" />
        </div>
      </div>

      {isLoading ? (
        <div className="h-7 w-24 bg-gray-100 rounded animate-pulse" />
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {value}
          </span>
          {hasDelta && (
            <span
              className={`flex items-center gap-0.5 text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                isUp
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(deltaPercent || 0).toFixed(0)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Content overview tile (secondary row)
// ─────────────────────────────────────────────────────────────

interface OverviewTileProps {
  label: string;
  value: number;
  icon: LucideIcon;
  href: string;
  isLoading?: boolean;
}

const OverviewTile: React.FC<OverviewTileProps> = ({
  label,
  value,
  icon: Icon,
  href,
  isLoading,
}) => (
  <Link
    href={href}
    className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex items-center gap-3 hover:border-emerald-200 hover:shadow-md transition-all"
  >
    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      {isLoading ? (
        <div className="h-4 w-10 bg-gray-100 rounded animate-pulse" />
      ) : (
        <p className="text-base font-extrabold text-gray-900 leading-tight">
          {value}
        </p>
      )}
      <p className="text-[11px] text-gray-500 font-medium truncate">{label}</p>
    </div>
  </Link>
);

// ─────────────────────────────────────────────────────────────
// Main Overview
// ─────────────────────────────────────────────────────────────

export default function DashboardOverview() {
  // Bookings & payments: the backend caps list requests at 100, ordered
  // newest-first, which is exactly what the trend/status charts and revenue
  // totals need.
  const { data: bookingsRes, isLoading: bookingsLoading } =
    useGetAllBookingsQuery({ limit: 100 });
  const bookings: BookingItem[] = bookingsRes?.data || [];
  const totalBookings = bookingsRes?.meta?.total ?? bookings.length;

  const { data: paymentsRes, isLoading: paymentsLoading } =
    useGetAllPaymentsQuery({ limit: 100 });
  const payments: PaymentItem[] = paymentsRes?.data || [];

  const { data: yachtsRes, isLoading: yachtsLoading } = useGetAllYachtsQuery({
    limit: 1,
  });
  const totalYachts = yachtsRes?.meta?.total ?? 0;

  const { data: destinationsRes, isLoading: destinationsLoading } =
    useGetAllDestinationsQuery({ limit: 1 });
  const totalDestinations = destinationsRes?.meta?.total ?? 0;

  const { data: usersRes, isLoading: usersLoading } = useGetUsersQuery({
    limit: 1,
  });
  const totalCustomers =
    (usersRes as { meta?: { total?: number } })?.meta?.total ?? 0;

  const { data: blogsRes, isLoading: blogsLoading } = useGetAllBlogsQuery({
    limit: 1,
  });
  const totalBlogs = blogsRes?.meta?.total ?? 0;

  const { data: testimonialsRes, isLoading: testimonialsLoading } =
    useGetAllTestimonialsQuery({ limit: 1 });
  const totalTestimonials = testimonialsRes?.meta?.total ?? 0;

  const { data: videosRes, isLoading: videosLoading } =
    useGetAllVideoGallariesQuery({ limit: 1 });
  const totalVideos = videosRes?.meta?.total ?? 0;

  const { data: faqsRes, isLoading: faqsLoading } =
    useGetAllQuestionAnswersQuery({ limit: 1 });
  const totalFaqs = faqsRes?.meta?.total ?? 0;

  // Real week-over-week comparisons, computed from actual booking/payment
  // dates — no fabricated percentages.
  const { totalRevenue, revenueDelta, bookingDelta, currency } = useMemo(() => {
    const revenue = sumSucceededPayments(payments);
    const thisWeekPayments = inWeek(payments, (p) => p.created_at, 0);
    const lastWeekPayments = inWeek(payments, (p) => p.created_at, 1);
    const thisWeekBookings = inWeek(bookings, (b) => b.created_at, 0);
    const lastWeekBookings = inWeek(bookings, (b) => b.created_at, 1);

    return {
      totalRevenue: revenue,
      currency: primaryCurrency(payments),
      revenueDelta: percentDelta(
        sumSucceededPayments(thisWeekPayments),
        sumSucceededPayments(lastWeekPayments),
      ),
      bookingDelta: percentDelta(
        thisWeekBookings.length,
        lastWeekBookings.length,
      ),
    };
  }, [payments, bookings]);

  const recentBookings = useMemo(() => bookings.slice(0, 6), [bookings]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Revenue"
          value={`${currency} ${totalRevenue.toLocaleString()}`}
          icon={Wallet}
          iconBg="bg-emerald-600"
          deltaPercent={payments.length > 0 ? revenueDelta : undefined}
          isLoading={paymentsLoading}
        />
        <StatCard
          title="Total Bookings"
          value={totalBookings.toLocaleString()}
          icon={Receipt}
          iconBg="bg-blue-600"
          deltaPercent={bookings.length > 0 ? bookingDelta : undefined}
          isLoading={bookingsLoading}
        />
        <StatCard
          title="Total Yachts"
          value={totalYachts.toLocaleString()}
          icon={Sailboat}
          iconBg="bg-orange-500"
          isLoading={yachtsLoading}
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers.toLocaleString()}
          icon={Users}
          iconBg="bg-violet-600"
          isLoading={usersLoading}
        />
      </div>

      {/* Charts Row 1: Revenue + Booking Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Revenue Trend
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Daily revenue collected over the last 14 days
            </p>
          </div>
          {paymentsLoading ? (
            <div className="flex-1 min-h-55 bg-gray-50 rounded-xl animate-pulse" />
          ) : (
            <RevenueTrendChart payments={payments} currency={currency} />
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Booking Status
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Breakdown of all bookings
            </p>
          </div>
          {bookingsLoading ? (
            <div className="h-55 bg-gray-50 rounded-xl animate-pulse" />
          ) : (
            <BookingStatusChart bookings={bookings} />
          )}
        </div>
      </div>

      {/* Charts Row 2: Top Yachts + Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Top Booked Yachts
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Which yachts in the fleet get chartered most
            </p>
          </div>
          {bookingsLoading ? (
            <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />
          ) : (
            <TopYachtsChart bookings={bookings} />
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="mb-3">
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Payment Status
            </h2>
            <p className="text-xs font-medium text-gray-500">
              Where bookings stand on payment
            </p>
          </div>
          {bookingsLoading ? (
            <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />
          ) : (
            <PaymentStatusChart bookings={bookings} />
          )}
        </div>
      </div>
      {/* Content Overview Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <OverviewTile
          label="Destinations"
          value={totalDestinations}
          icon={MapPin}
          href="/dashboard/destinations/all-destinations"
          isLoading={destinationsLoading}
        />
        <OverviewTile
          label="Blog Posts"
          value={totalBlogs}
          icon={Newspaper}
          href="/dashboard/blog/blog-posts/all-blog-posts"
          isLoading={blogsLoading}
        />
        <OverviewTile
          label="Testimonials"
          value={totalTestimonials}
          icon={Quote}
          href="/dashboard/testimonials/all-testimonials"
          isLoading={testimonialsLoading}
        />
        <OverviewTile
          label="Videos"
          value={totalVideos}
          icon={Video}
          href="/dashboard/video-gallaries/all-video-gallaries"
          isLoading={videosLoading}
        />
        <OverviewTile
          label="FAQs"
          value={totalFaqs}
          icon={HelpCircle}
          href="/dashboard/question-answers/all-question-answers"
          isLoading={faqsLoading}
        />
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Recent Bookings
            </h2>
            <p className="text-xs font-medium text-gray-500">
              The latest charter requests placed
            </p>
          </div>
          <Link
            href="/dashboard/bookings/all-bookings"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 shrink-0"
          >
            View all
          </Link>
        </div>

        {bookingsLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 bg-gray-50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-900 font-bold text-sm">No bookings yet</p>
            <p className="text-xs text-gray-500 mt-1">
              New charter requests will show up here as they come in.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-2 pr-4">Yacht</th>
                    <th className="pb-2 pr-4">Guest</th>
                    <th className="pb-2 pr-4">Dates</th>
                    <th className="pb-2 pr-4">Status</th>
                    <th className="pb-2 pr-4">Payment</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          {booking.yacht?.hero_image ? (
                            <Image
                              src={booking.yacht.hero_image}
                              alt={booking.yacht.name}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-lg border object-cover"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                              <ImageOff size={13} />
                            </div>
                          )}
                          <span className="font-bold text-gray-800 truncate max-w-36">
                            {booking.yacht?.name ?? "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-600 truncate max-w-36">
                        {booking.guest_name}
                      </td>
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">
                        {formatDate(booking.check_in)} –{" "}
                        {formatDate(booking.check_out)}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                            STATUS_BADGE[booking.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                            PAYMENT_BADGE[booking.payment_status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {booking.payment_status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                        {booking.currency}{" "}
                        {Number(booking.subtotal_amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards */}
            <div className="sm:hidden space-y-2">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-3 rounded-xl border border-gray-100 bg-gray-50/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-800 truncate max-w-40">
                      {booking.yacht?.name ?? "—"}
                    </span>
                    <span className="font-extrabold text-sm text-emerald-600 shrink-0">
                      {booking.currency}{" "}
                      {Number(booking.subtotal_amount).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {booking.guest_name}
                  </p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-[11px] text-gray-400 shrink-0">
                      {formatDate(booking.check_in)} –{" "}
                      {formatDate(booking.check_out)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                          STATUS_BADGE[booking.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
