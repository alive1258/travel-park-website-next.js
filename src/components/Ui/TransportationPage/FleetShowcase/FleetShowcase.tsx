import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { VEHICLE_FLEET } from "@/src/utils/data/transportation";

const FleetShowcase = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Our Fleet
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Vehicles For Every Trip
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLE_FLEET.map((vehicle) => (
            <ZoomIn key={vehicle.slug}>
              <div className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-900">{vehicle.name}</h3>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-900/60">
                    <Users size={12} />
                    {vehicle.capacity}
                  </span>
                  <div className="mt-4 flex items-center justify-between border-t border-brand-900/10 pt-4">
                    <span className="text-sm">
                      <span className="font-bold text-brand-900">
                        ${vehicle.pricePerTrip}
                      </span>
                      <span className="text-brand-900/50"> / trip</span>
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 transition"
                    >
                      Book
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </ZoomIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
