"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

const GUEST_OPTIONS = [
  { label: "1-2 Guests", min: 1 },
  { label: "3-4 Guests", min: 3 },
  { label: "5-8 Guests", min: 5 },
  { label: "9+ Guests", min: 9 },
];

interface ToursSearchFormProps {
  regions: string[];
  defaultRegion?: string;
  defaultGuestsMin?: string;
}

const ToursSearchForm = ({
  regions,
  defaultRegion = "",
  defaultGuestsMin = "",
}: ToursSearchFormProps) => {
  const router = useRouter();

  const [region, setRegion] = useState(defaultRegion);
  const [date, setDate] = useState("");
  const [guestsMin, setGuestsMin] = useState(defaultGuestsMin);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (guestsMin) params.set("guests_min", guestsMin);
    if (date) params.set("date", date);

    const query = params.toString();
    router.push(query ? `/tours?${query}` : "/tours");
  };

  return (
    <section className="relative z-10 -mt-12 md:-mt-16">
      <div className="container">
        <form
          onSubmit={handleSearch}
          className="grid gap-4 rounded-2xl bg-white p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <MapPin size={13} />
              Destination
            </span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">All destinations</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <CalendarDays size={13} />
              Departure
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <Users size={13} />
              Guests
            </span>
            <select
              value={guestsMin}
              onChange={(e) => setGuestsMin(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">Any group size</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g.label} value={g.min}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            <Search size={16} />
            Search Tours
          </button>
        </form>
      </div>
    </section>
  );
};

export default ToursSearchForm;
