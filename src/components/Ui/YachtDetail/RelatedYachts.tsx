import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Users } from "lucide-react";
import type { Yacht } from "@/src/types/yachtType";

const RelatedYachts = ({ yachts }: { yachts: Yacht[] }) => {
  if (yachts.length === 0) return null;

  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Explore More of the Fleet
          </h2>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View Full Fleet
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {yachts.map((other) => (
            <Link
              key={other.slug}
              href={`/yachts/${other.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={other.heroImage}
                  alt={other.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className=" transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-900">
                  {other.name}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                  <span className="flex items-center gap-1.5">
                    <Ruler size={13} />
                    {other.length}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {other.guests} Guests
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedYachts;
