import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import FleetGrid from "@/src/components/Ui/YachtsPage/FleetGrid/FleetGrid";
import FleetGridSkeleton from "@/src/components/Ui/YachtsPage/FleetGrid/FleetGridSkeleton";
import InnovationConcepts from "@/src/components/Ui/YachtsPage/InnovationConcepts/InnovationConcepts";
import LifeAboardGallery from "@/src/components/Ui/YachtsPage/LifeAboardGallery/LifeAboardGallery";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Browse the full Eco Yachts fleet — eco-certified sailing and motor yachts for charter, from intimate 6-guest boats to 14-guest flagships.",
};

interface YachtsPageProps {
  searchParams: Promise<{
    region?: string;
    guests_min?: string;
    date?: string;
  }>;
}

export default async function YachtsPage({ searchParams }: YachtsPageProps) {
  const { region, guests_min, date } = await searchParams;
  const guestsMin = guests_min ? Number(guests_min) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Our Fleet"
        title="Sixteen Yachts. One Standard of Sustainable Luxury."
        subtitle="Every yacht in the Eco Yachts fleet is inspected, eco-certified, and crewed for a charter that's as easy on the water as it is on you."
        image="/images/yachts/eco-dawn.jpg"
        alt="Eco Voyager charter yacht underway"
      />

      <Suspense fallback={<FleetGridSkeleton />}>
        <FleetGrid
          region={region}
          guestsMin={Number.isFinite(guestsMin) ? guestsMin : undefined}
          date={date}
        />
      </Suspense>

      <InnovationConcepts />

      <LifeAboardGallery />

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Not Sure Which Yacht Fits?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us your group size, destination, and dates — we&apos;ll match
            you with the right boat.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Talk to Our Team
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
