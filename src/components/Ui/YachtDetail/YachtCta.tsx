import type { Yacht } from "@/src/types/yachtType";
import BookingModal from "./BookingModal";

const YachtCta = ({ yacht }: { yacht: Yacht }) => (
  <section className="bg-brand-900 py-16 md:py-20">
    <div className="container flex flex-col items-center text-center gap-5">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        Ready to Charter {yacht.name}?
      </h2>
      <p className="max-w-lg text-brand-100/80">
        Tell us your dates, destination, and group size — our team will
        confirm availability and build your itinerary.
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
        triggerClassName="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
      />
    </div>
  </section>
);

export default YachtCta;
