import { Gauge } from "lucide-react";
import type { Yacht } from "@/src/types/yachtType";
import BookingModal from "./BookingModal";
import { getQuickFacts } from "./quickFacts";

const YachtSidebar = ({ yacht }: { yacht: Yacht }) => (
  <aside className="lg:col-span-1">
    <div className="lg:sticky lg:top-24 space-y-6">
      <div className="rounded-2xl border border-brand-900/10 bg-brand-50/50 p-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Charter Rate
        </div>
        <div className="mt-2 text-3xl font-bold text-brand-900">
          {yacht.priceFrom}
          <span className="text-base font-semibold text-brand-900/50">
            {" "}
            {yacht.priceUnit}
          </span>
        </div>
        <p className="mt-2 text-sm text-brand-900/60">
          Rates vary by season and itinerary. Speak with our team for a
          tailored quote.
        </p>
        <BookingModal
          yachtId={yacht.id}
          yachtSlug={yacht.slug}
          yachtName={yacht.name}
          heroImage={yacht.heroImage}
          priceFrom={yacht.priceFrom}
          priceUnit={yacht.priceUnit}
          pricePerNight={yacht.pricePerNight}
          currency={yacht.currency}
          maxGuests={yacht.guests}
          triggerClassName="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
        />
      </div>

      <div className="rounded-2xl border border-brand-900/10 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900/50">
          At a Glance
        </h3>
        <dl className="mt-4 space-y-3">
          {getQuickFacts(yacht).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <dt className="flex items-center gap-2 text-brand-900/60">
                <Icon size={14} className="text-gold-500" />
                {label}
              </dt>
              <dd className="font-semibold text-brand-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-brand-900 p-6 text-white">
        <Gauge size={18} className="shrink-0 text-gold-400" />
        <p className="text-sm leading-relaxed">
          Every yacht in the fleet is inspected and eco-certified ahead of
          each charter season.
        </p>
      </div>
    </div>
  </aside>
);

export default YachtSidebar;
