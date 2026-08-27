"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import MyBookings from "@/src/components/Ui/Dashboard/Bookings/MyBookings";
import { useAppSelector } from "@/src/redux/hooks";

const MyBookingsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  return (
    <>
      <PageHero
        eyebrow="Account"
        title="My Bookings"
        subtitle="Track every yacht charter you&apos;ve booked, its status, and its payments — all in one place."
        image="/images/yachts/yacht-render-1.jpg"
        alt="Luxury charter yacht at anchor near a tropical coastline"
      />

      <section className="bg-brand-50/40 py-16 md:py-24">
        <div className="container">
          {user ? (
            <MyBookings />
          ) : (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-brand-900/10 bg-white py-16 text-center shadow-sm">
              <Lock size={28} className="text-brand-600" />
              <h3 className="text-lg font-bold text-brand-900">
                Log In to See Your Bookings
              </h3>
              <p className="max-w-xs text-sm text-brand-900/60">
                Sign in to your account to view your charter history, statuses,
                and payments.
              </p>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem("redirectAfterLogin", "/my-bookings");
                  router.push("/login");
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600"
              >
                Log In / Sign Up
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyBookingsPage;
