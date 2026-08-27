import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { TOUR_PACKAGES } from "@/src/utils/data/tours";

const BADGES = ["Best Seller", "Top Rated", "Editor's Pick", "Popular"];

const FeaturedYachtsSection = () => {
  const tours = TOUR_PACKAGES.slice(0, 6);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Handpicked For You
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Top Rated Tours &amp; Experiences
            </h2>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View All Tours
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, i) => (
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
                  <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-brand-900">
                    {BADGES[i % BADGES.length]}
                  </span>
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
      </div>
    </section>
  );
};

export default FeaturedYachtsSection;
