import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Users } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { YachtAdminItem } from "@/src/types/yachtAdminType";
import { mapYachtAdminItemToSummary } from "@/src/utils/mappers/yacht";

export interface FleetGridProps {
  region?: string;
  guestsMin?: number;
  date?: string;
}

async function getFleet({ region, guestsMin }: FleetGridProps) {
  try {
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (guestsMin) params.set("guests_min", String(guestsMin));

    const query = params.toString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/yachts/active${query ? `?${query}` : ""}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<YachtAdminItem[]> = await res.json();
    return (body.data ?? []).map(mapYachtAdminItemToSummary);
  } catch {
    return [];
  }
}

export default async function FleetGrid({
  region,
  guestsMin,
  date,
}: FleetGridProps) {
  const FLEET = await getFleet({ region, guestsMin });
  const isFiltered = Boolean(region || guestsMin);

  if (FLEET.length === 0) {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="container text-center">
          <p className="text-brand-900/60">
            {isFiltered
              ? "No yachts match your search. Try a different destination or group size."
              : "No yachts are available right now. Please check back soon."}
          </p>
          {isFiltered && (
            <Link
              href="/yachts"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              Clear filters
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        {isFiltered && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50/70 px-5 py-3.5 text-sm text-brand-900/70">
            <span>
              Showing {FLEET.length} yacht{FLEET.length === 1 ? "" : "s"}
              {region ? ` in ${region}` : ""}
              {guestsMin ? ` for ${guestsMin}+ guests` : ""}
              {date
                ? ` — mention your preferred date (${date}) when you inquire`
                : ""}
            </span>
            <Link
              href="/yachts"
              className="font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              Clear filters
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET.map((yacht) => (
            <Link
              key={yacht.slug}
              href={`/yachts/${yacht.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={yacht.image}
                  alt={yacht.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className=" transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-900">
                  {yacht.name}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                  <span className="flex items-center gap-1.5">
                    <Ruler size={13} />
                    {yacht.length}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {yacht.guests}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
                  <span className="text-sm">
                    <span className="font-bold text-brand-900">
                      {yacht.price}
                    </span>
                    <span className="text-brand-900/50"> / night</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                    View Details
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
