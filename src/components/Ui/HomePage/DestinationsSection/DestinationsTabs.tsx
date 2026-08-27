"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import type { Destination } from "@/src/utils/data/destinations";

interface DestinationsTabsProps {
  destinations: Destination[];
}

const DestinationsTabs = ({ destinations }: DestinationsTabsProps) => {
  const [tab, setTab] = useState<"top" | "all">("top");

  const visible =
    tab === "top" ? destinations.slice(0, 4) : destinations.slice(0, 8);

  return (
    <div>
      <div className="mb-8 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setTab("top")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            tab === "top"
              ? "bg-accent-500 text-white"
              : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
          }`}
        >
          Top Picks
        </button>
        <button
          type="button"
          onClick={() => setTab("all")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            tab === "all"
              ? "bg-accent-500 text-white"
              : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
          }`}
        >
          All Destinations
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((destination) => (
          <ZoomIn key={destination.id}>
            <div className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin size={14} className="text-gold-400 shrink-0" />
                    {destination.name}
                  </h3>
                </div>
              </div>
            </div>
          </ZoomIn>
        ))}
      </div>
    </div>
  );
};

export default DestinationsTabs;
