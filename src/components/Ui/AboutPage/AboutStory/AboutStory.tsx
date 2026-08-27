import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            A Fleet Built Around a Simple Idea
          </h2>
          <div className="mt-5 space-y-4 text-brand-900/70 leading-relaxed">
            <p>
              Eco Yachts started with a straightforward frustration: the luxury
              charter industry rarely asked what a week on the water cost the
              water itself. We set out to build a fleet where hybrid propulsion,
              responsible provisioning, and eco-certified operations were the
              standard, not an upsell.
            </p>
            <p>
              Today that means every yacht in our fleet is inspected and
              certified each season, every itinerary is built with local marine
              partners, and every guest gets the same standard of service
              you&apos;d expect from any five-star charter — just without the
              fuel bill weighing on your conscience.
            </p>
          </div>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <Image
            src="/images/experiences/exp-marina.jpg"
            alt="Eco Yachts marina operations"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className=""
          />
        </div>
      </div>
    </section>
  );
}
