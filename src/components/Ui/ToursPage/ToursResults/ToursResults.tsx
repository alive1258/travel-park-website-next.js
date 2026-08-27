import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { TOUR_PACKAGES } from "@/src/utils/data/tours";

interface ToursResultsProps {
  region?: string;
  guestsMin?: number;
  category?: string;
}

function buildQuery(overrides: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  Object.entries(overrides).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `/tours?${query}` : "/tours";
}

/** Tour guest counts are stored as display strings ("2-6 Guests") — parse
 * the leading number so the guest-size filter still works against them. */
function guestsFloor(guests: string): number {
  const match = guests.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export default function ToursResults({
  region,
  guestsMin,
  category,
}: ToursResultsProps) {
  const categories = Array.from(new Set(TOUR_PACKAGES.map((t) => t.category)));

  const results = TOUR_PACKAGES.filter((t) => {
    if (region && t.region !== region) return false;
    if (guestsMin && guestsFloor(t.guests) < guestsMin) return false;
    if (category && t.category !== category) return false;
    return true;
  });

  const isFiltered = Boolean(region || guestsMin || category);

  return (
    <>
      <section className="bg-white pt-16 pb-6 md:pt-24">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href={buildQuery({ region, guests_min: guestsMin ? String(guestsMin) : undefined })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !category
                  ? "bg-accent-500 text-white"
                  : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
              }`}
            >
              All Categories
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={buildQuery({
                  region,
                  guests_min: guestsMin ? String(guestsMin) : undefined,
                  category: c,
                })}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c
                    ? "bg-accent-500 text-white"
                    : "bg-brand-50 text-brand-900/70 hover:bg-brand-100"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pt-6 pb-16 md:pb-24">
        <div className="container">
          {isFiltered && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50/70 px-5 py-3.5 text-sm text-brand-900/70">
              <span>
                Showing {results.length} tour{results.length === 1 ? "" : "s"}
                {region ? ` in ${region}` : ""}
                {category ? ` — ${category}` : ""}
              </span>
              <Link
                href="/tours"
                className="font-semibold text-brand-700 hover:text-brand-900 transition"
              >
                Clear filters
              </Link>
            </div>
          )}

          {results.length === 0 ? (
            <p className="text-center text-brand-900/60">
              No tours match your search right now. Try a different
              destination or category.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((tour) => (
                <ZoomIn key={tour.slug}>
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-brand-900">
                        {tour.name}
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={13} />
                          {tour.guests}
                        </span>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
                        <span className="text-sm">
                          <span className="font-bold text-brand-900">
                            ${tour.price}
                          </span>
                          <span className="text-brand-900/50"> / person</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                          View Details
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ZoomIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
