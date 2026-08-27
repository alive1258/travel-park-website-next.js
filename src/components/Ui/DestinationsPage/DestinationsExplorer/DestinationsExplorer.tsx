"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import type { Destination } from "@/src/utils/data/destinations";

interface DestinationsExplorerProps {
  destinations: Destination[];
}

const DestinationsExplorer = ({ destinations }: DestinationsExplorerProps) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => {
    if (!query) return destinations;
    const q = query.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q),
    );
  }, [destinations, query]);

  return (
    <>
      <section className="relative z-10 -mt-12 md:-mt-16">
        <div className="container">
          <div className="relative mx-auto max-w-xl rounded-2xl bg-white p-2 shadow-xl">
            <Search
              size={16}
              className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-brand-900/40"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full rounded-xl border-none bg-transparent py-3 pl-10 pr-4 text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 pb-16 md:pb-24">
        <div className="container">
          {results.length === 0 ? (
            <p className="text-center text-brand-900/60">
              No destinations match &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((destination) => (
                <ZoomIn key={destination.id}>
                  <div className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="flex items-center gap-1.5 font-bold text-brand-900">
                        <MapPin size={15} className="text-brand-600 shrink-0" />
                        {destination.name}
                      </h3>
                      {destination.description && (
                        <p className="mt-2 text-sm text-brand-900/60 leading-relaxed line-clamp-2">
                          {destination.description}
                        </p>
                      )}
                    </div>
                  </div>
                </ZoomIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DestinationsExplorer;
