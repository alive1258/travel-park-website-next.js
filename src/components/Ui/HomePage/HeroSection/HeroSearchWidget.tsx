"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bus,
  Building2,
  CalendarDays,
  MapPin,
  Search,
  Ship,
  Users,
} from "lucide-react";

type Tab = "tours" | "hotels" | "transportation";

const TABS: { id: Tab; label: string; icon: typeof Ship }[] = [
  { id: "tours", label: "Tours", icon: Ship },
  { id: "hotels", label: "Hotels", icon: Building2 },
  { id: "transportation", label: "Transportation", icon: Bus },
];

const GUEST_OPTIONS = [
  { label: "1-2 Guests", value: "1" },
  { label: "3-4 Guests", value: "3" },
  { label: "5-8 Guests", value: "5" },
  { label: "9+ Guests", value: "9" },
];

interface HeroSearchWidgetProps {
  destinations: string[];
}

const HeroSearchWidget = ({ destinations }: HeroSearchWidgetProps) => {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("tours");

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (tab === "tours") {
      if (destination) params.set("region", destination);
      if (guests) params.set("guests_min", guests);
      const query = params.toString();
      router.push(query ? `/tours?${query}` : "/tours");
      return;
    }

    if (tab === "hotels") {
      if (destination) params.set("destination", destination);
      if (date) params.set("check_in", date);
      const query = params.toString();
      router.push(query ? `/hotels?${query}` : "/hotels");
      return;
    }

    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    const query = params.toString();
    router.push(query ? `/transportation?${query}` : "/transportation");
  };

  return (
    <div className="relative z-10 mt-10 -mb-24 md:-mb-16 rounded-2xl bg-white p-3 shadow-xl sm:p-4">
      <div className="flex flex-wrap gap-1 border-b border-brand-900/10 pb-3">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === id
                ? "bg-accent-500 text-white"
                : "text-brand-900/60 hover:bg-brand-50 hover:text-brand-900"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {tab !== "transportation" ? (
        <form
          onSubmit={handleSearch}
          className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <MapPin size={13} />
              Destination
            </span>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">Anywhere</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <CalendarDays size={13} />
              {tab === "tours" ? "Departure" : "Check-in"}
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
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">Any group size</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>
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
            Search
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSearch}
          className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <MapPin size={13} />
              From
            </span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Airport / Marina"
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <MapPin size={13} />
              To
            </span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Hotel / Destination"
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <CalendarDays size={13} />
              Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            <Search size={16} />
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default HeroSearchWidget;
