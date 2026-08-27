import Image from "next/image";

export default function SustainabilityIntro() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Why It Matters
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Sustainability Isn&apos;t an Add-On Here
          </h2>
          <p className="mt-5 text-brand-900/70 leading-relaxed">
            Luxury charter has historically treated environmental impact as
            someone else&apos;s problem. We built Eco Yachts on the opposite
            premise — that the boats we run, the water we cruise, and the
            guests we serve are the same system, and neglecting one part of it
            eventually costs the others.
          </p>
          <p className="mt-4 text-brand-900/70 leading-relaxed">
            That shows up in concrete ways: hybrid propulsion instead of pure
            diesel, provisioning partners we vet for their own practices, and
            a public roadmap we hold ourselves to — not just a mission
            statement.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/experiences/exp-savannah.jpg"
            alt="Coastal conservation area near an Eco Yachts destination"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className=""
          />
        </div>
      </div>
    </section>
  );
}
