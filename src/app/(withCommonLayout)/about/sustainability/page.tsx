import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import SustainabilityIntro from "@/src/components/Ui/AboutPage/SustainabilityIntro/SustainabilityIntro";
import SustainabilityPillars from "@/src/components/Ui/AboutPage/SustainabilityPillars/SustainabilityPillars";
import SustainabilityRoadmap from "@/src/components/Ui/AboutPage/SustainabilityRoadmap/SustainabilityRoadmap";

export const metadata: Metadata = {
  title: "Future & Sustainability",
  description:
    "Eco Yachts' sustainability roadmap — hybrid propulsion, marine conservation partnerships, waste reduction, and the emissions targets we're working toward.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Future & Sustainability"
        subtitle="A charter shouldn't cost the water it sails on. Here's our roadmap for making that true across the whole fleet."
        image="/images/experiences/adventure-nature.jpg"
        alt="Coastal nature representing Eco Yachts' conservation focus"
      />

      <SustainabilityIntro />

      <SustainabilityPillars />

      <SustainabilityRoadmap />

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Charter With a Lower-Impact Fleet
          </h2>
          <p className="max-w-lg text-brand-100/80">
            See the hybrid and solar-assisted yachts making this roadmap real,
            right now.
          </p>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Browse the Fleet
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
