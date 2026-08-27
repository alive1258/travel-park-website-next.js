"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { useGetBookingByIdQuery } from "@/src/redux/api/bookingApi";

const BookingCancelled = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data } = useGetBookingByIdQuery(bookingId as string, {
    skip: !bookingId,
  });
  const yachtSlug = data?.data?.yacht?.slug;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container flex flex-col items-center text-center">
        <XCircle size={44} className="text-brand-600" />
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-brand-900">
          Payment Cancelled
        </h1>
        <p className="mt-2 max-w-md text-brand-900/60">
          No charge was made. Your booking request is still saved — you can
          pick up the deposit payment any time from your bookings dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard/bookings"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            View My Bookings
          </Link>
          {yachtSlug && (
            <Link
              href={`/yachts/${yachtSlug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-900/10 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
            >
              Back to Yacht
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingCancelled;
