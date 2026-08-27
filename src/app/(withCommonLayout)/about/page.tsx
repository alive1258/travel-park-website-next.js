import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import AboutStory from "@/src/components/Ui/AboutPage/AboutStory/AboutStory";
import AboutStats from "@/src/components/Ui/AboutPage/AboutStats/AboutStats";
import AboutExplore from "@/src/components/Ui/AboutPage/AboutExplore/AboutExplore";

export const metadata: Metadata = {
  title: "About Eco Yachts",
  description:
    "Learn who's behind Eco Yachts — our offices and people, our sustainability commitments, our partners, and our record for luxury charter without compromise.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Luxury Chartering, Built With Intent"
        subtitle="Eco Yachts exists to prove that a charter can be genuinely luxurious and genuinely lower-impact at the same time. Here's who we are and how we work."
        image="/images/banner/large.jpg"
        alt="Eco Voyager underway, representing the Eco Yachts fleet"
      />

      <AboutStory />

      <AboutStats />

      <AboutExplore />

      <section className="bg-white py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Want to Talk to a Real Person?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Our team is happy to walk you through the fleet, our sustainability
            standards, or a custom itinerary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
