import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import PortfolioList from "@/src/components/Ui/AboutPage/PortfolioList/PortfolioList";

export const metadata: Metadata = {
  title: "Luxury Charter Portfolio",
  description:
    "An overview of the charter experiences Eco Yachts builds — family itineraries, celebration charters, adventure trips, and corporate events.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Luxury Charter Portfolio"
        subtitle="Every charter we build falls into one of a few shapes. Here's how we think about matching the right yacht to the right trip."
        image="/images/yachts/yacht-sharlou.jpg"
        alt="Eco Sharlou representing the Eco Yachts luxury charter portfolio"
      />

      <PortfolioList />

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Not Sure Which Fits Your Trip?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us the occasion and group size — we&apos;ll recommend the right
            yacht and itinerary shape.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Talk to Our Team
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
