"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OFFER_BACKGROUND } from "@/src/utils/data/localImages";

/** Rolling 10-day window from first render — restarts each visit rather
 * than pointing at a fixed date that would go stale. */
function getTargetDate() {
  const target = new Date();
  target.setDate(target.getDate() + 10);
  return target;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
];

const OfferCountdownSection = () => {
  const [target] = useState(getTargetDate);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src={OFFER_BACKGROUND}
        alt="Trekker overlooking the Everest mountain range"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/70" />

      <div className="container relative flex flex-col items-center text-center gap-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
          Limited Time Offer
        </span>
        <h2 className="max-w-lg text-3xl sm:text-4xl font-bold text-white leading-tight">
          Adventure Awaits, Memories Last Forever
        </h2>
        <p className="max-w-md text-white/80">
          Save up to 40% on selected tours booked before the timer runs out.
        </p>

        <div className="flex gap-3 sm:gap-4">
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm sm:h-20 sm:w-20"
            >
              <span className="text-xl font-bold text-white sm:text-2xl">
                {String(timeLeft[key]).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-wide text-white/60">
                {label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/tours"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
        >
          Grab The Deal
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default OfferCountdownSection;
