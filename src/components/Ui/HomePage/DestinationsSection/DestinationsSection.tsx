import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { DESTINATIONS } from "@/src/utils/data/destinations";
import DestinationsTabs from "./DestinationsTabs";

const DestinationsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Top Destinations
            </span>
            <h2 className="mt-3 flex items-center gap-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Most Favourite Destinations
              <Send size={26} className="hidden sm:block text-gold-500" />
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View All Destinations
            <ArrowRight size={16} />
          </Link>
        </div>

        <DestinationsTabs destinations={DESTINATIONS} />
      </div>
    </section>
  );
};

export default DestinationsSection;
