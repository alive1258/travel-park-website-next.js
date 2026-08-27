"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, Search, Star } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import {
  FEATURED_HOTELS,
  HOTEL_CATEGORIES,
  type HotelListing,
} from "@/src/utils/data/hotels";

const HotelCard = ({ hotel }: { hotel: HotelListing }) => (
  <ZoomIn>
    <div className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-900">
          {hotel.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-brand-900">{hotel.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-900">
            <Star size={12} className="text-gold-500" fill="currentColor" />
            {hotel.rating}
            <span className="text-brand-900/40">({hotel.reviewCount})</span>
          </span>
        </div>
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-900/60">
          <MapPin size={12} />
          {hotel.location}
        </span>
        <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
          <span className="text-sm">
            <span className="font-bold text-brand-900">
              ${hotel.pricePerNight}
            </span>
            <span className="text-brand-900/50"> / night</span>
          </span>
          <span className="text-sm font-semibold text-brand-700">
            Best Price
          </span>
        </div>
      </div>
    </div>
  </ZoomIn>
);

const HotelsExplorer = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    return FEATURED_HOTELS.filter((hotel) => {
      if (category && hotel.category !== category) return false;
      if (
        query &&
        !`${hotel.name} ${hotel.location}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, category]);

  return (
    <>
      {/* Search bar */}
      <section className="relative z-10 -mt-12 md:-mt-16">
        <div className="container">
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-xl sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by hotel name or destination"
                className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 py-3 pl-11 pr-4 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Search size={16} />
              Search Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white pt-10 pb-6">
        <div className="container flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === null
                ? "bg-accent-500 text-white"
                : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
            }`}
          >
            All Stays
          </button>
          {HOTEL_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c
                  ? "bg-accent-500 text-white"
                  : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white pt-6 pb-16 md:pb-24">
        <div className="container">
          {results.length === 0 ? (
            <p className="text-center text-brand-900/60">
              No stays match your search. Try a different name or category.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((hotel) => (
                <HotelCard key={hotel.slug} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HotelsExplorer;
