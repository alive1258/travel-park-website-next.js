import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { TOUR_PACKAGES } from "@/src/utils/data/tours";

const BestSellerTours = () => {
  const tours = TOUR_PACKAGES.slice(0, 4);

  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Best Sellers
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Our Most Booked Tours
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {tours.map((tour, i) => (
            <SlideUp key={tour.slug} delay={i + 1} className="w-64 shrink-0 sm:w-auto">
              <Link
                href={`/tours/${tour.slug}`}
                className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-900">
                    Best Seller
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-brand-900 text-sm leading-snug">
                    {tour.name}
                  </h3>
                  <span className="mt-2 flex items-center gap-1.5 text-xs text-brand-900/50">
                    <Users size={12} />
                    {tour.guests}
                  </span>
                  <div className="mt-3 flex items-center justify-between border-t border-brand-900/10 pt-3">
                    <span className="text-sm font-bold text-brand-900">
                      ${tour.price}
                    </span>
                    <ArrowRight size={14} className="text-brand-600" />
                  </div>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerTours;
