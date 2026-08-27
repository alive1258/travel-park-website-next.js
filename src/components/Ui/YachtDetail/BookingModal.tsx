"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Lock,
  Users,
  X,
} from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { useCreateBookingMutation } from "@/src/redux/api/bookingApi";
import { useCreateCheckoutSessionMutation } from "@/src/redux/api/paymentApi";
import type { ApiError } from "@/src/types/authType";

interface BookingModalProps {
  yachtId: string;
  yachtSlug: string;
  yachtName: string;
  heroImage: string;
  priceFrom: string;
  priceUnit: string;
  pricePerNight: number;
  currency: string;
  maxGuests: number;
  triggerLabel?: string;
  triggerClassName: string;
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

const BookingModal = ({
  yachtId,
  yachtSlug,
  yachtName,
  heroImage,
  priceFrom,
  priceUnit,
  pricePerNight,
  currency,
  maxGuests,
  triggerLabel = "Book This Yacht",
  triggerClassName,
}: BookingModalProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const [createCheckoutSession, { isLoading: isRedirecting }] =
    useCreateCheckoutSessionMutation();
  const isSubmitting = isBooking || isRedirecting;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = nights * pricePerNight;
  const deposit = subtotal * 0.3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingRes = await createBooking({
        yacht_id: yachtId,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        message: message || undefined,
      }).unwrap();

      const session = await createCheckoutSession({
        booking_id: bookingRes.data.id,
        type: "deposit",
      }).unwrap();

      window.location.assign(session.data.url);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(
        apiError?.data?.message ||
          apiError?.message ||
          "Could not start your booking. Please try again.",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
        <ArrowRight size={16} />
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-900/70 backdrop-blur-md" />

            <div className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl md:grid-cols-2 md:overflow-hidden">
              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-900 shadow-sm transition hover:bg-white"
              >
                <X size={16} />
              </button>

              {/* IMAGE SIDE */}
              <div className="relative hidden min-h-[220px] md:block">
                <Image src={heroImage} alt={yachtName} fill sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    Booking Request
                  </p>
                  <p className="mt-1 text-xl font-bold">{yachtName}</p>
                </div>
              </div>

              {/* FORM SIDE */}
              <div className="p-6 sm:p-8">
                {!user ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <Lock size={28} className="text-brand-600" />
                    <h3 className="text-lg font-bold text-brand-900">
                      Log In to Book {yachtName}
                    </h3>
                    <p className="max-w-xs text-sm text-brand-900/60">
                      Booking history and payment receipts live on your
                      account, so we need you signed in first.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        sessionStorage.setItem(
                          "redirectAfterLogin",
                          `/yachts/${yachtSlug}`,
                        );
                        router.push("/login");
                      }}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600"
                    >
                      Log In / Sign Up
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                      Book This Yacht
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-brand-900">
                      {yachtName}
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            <CalendarDays size={13} />
                            Check-In
                          </span>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().slice(0, 10)}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                            <CalendarDays size={13} />
                            Check-Out
                          </span>
                          <input
                            type="date"
                            required
                            min={checkIn || new Date().toISOString().slice(0, 10)}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          <Users size={13} />
                          Guests
                        </span>
                        <input
                          type="number"
                          min={1}
                          max={maxGuests}
                          required
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                        />
                        <span className="mt-1 block text-xs text-brand-900/40">
                          This yacht sleeps up to {maxGuests} guests.
                        </span>
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          Message (optional)
                        </span>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Anything else we should know?"
                          className="w-full resize-none rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
                        />
                      </label>

                      {/* DEPOSIT & PAYMENT SUMMARY */}
                      <div className="rounded-xl border border-brand-900/10 bg-brand-50/50 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
                          <CreditCard size={14} className="text-gold-500" />
                          Deposit &amp; Payment
                        </div>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">Charter Rate</span>
                            <span className="font-semibold text-brand-900">
                              {priceFrom} {priceUnit}
                            </span>
                          </div>
                          {nights > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-brand-900/60">
                                {nights} {nights === 1 ? "night" : "nights"}
                              </span>
                              <span className="font-semibold text-brand-900">
                                {currency} {subtotal.toLocaleString()}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">
                              Deposit to Confirm (30%)
                            </span>
                            <span className="font-semibold text-brand-900">
                              {nights > 0
                                ? `${currency} ${deposit.toLocaleString()}`
                                : "Select your dates"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-900/60">Balance Due</span>
                            <span className="font-semibold text-brand-900">
                              Before departure
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 flex items-center gap-1.5 text-[11px] leading-relaxed text-brand-900/50">
                          <Lock size={11} className="shrink-0" />
                          You&apos;ll pay the deposit securely on Stripe&apos;s
                          checkout page — we never see or store your card
                          details.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || nights < 1}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Redirecting to Payment…" : "Continue to Secure Payment"}
                        <ArrowRight size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default BookingModal;
