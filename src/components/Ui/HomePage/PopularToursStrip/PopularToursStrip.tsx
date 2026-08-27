import Link from "next/link";
import { MapPin } from "lucide-react";
import { TOUR_PACKAGES } from "@/src/utils/data/tours";

interface RegionPrice {
  region: string;
  fromPrice: number;
}

function getRegionPrices(): RegionPrice[] {
  const byRegion = new Map<string, RegionPrice>();

  for (const tour of TOUR_PACKAGES) {
    const existing = byRegion.get(tour.region);
    if (!existing || tour.price < existing.fromPrice) {
      byRegion.set(tour.region, { region: tour.region, fromPrice: tour.price });
    }
  }

  return Array.from(byRegion.values()).sort((a, b) => a.fromPrice - b.fromPrice);
}

const PopularToursStrip = () => {
  const regions = getRegionPrices();

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Best Sellers
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-brand-900">
            Top Destinations &amp; Tour Regions
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {regions.map(({ region, fromPrice }) => (
            <Link
              key={region}
              href={`/tours?region=${encodeURIComponent(region)}`}
              className="group flex items-center gap-3 rounded-xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm transition hover:border-brand-300 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-sm font-bold text-brand-900">
                  {region}
                </span>
                <span className="block text-xs text-brand-900/50">
                  From ${fromPrice.toLocaleString("en-US")}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularToursStrip;
