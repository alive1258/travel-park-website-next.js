import type { Metadata } from "next";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import TrustStatsSection from "@/src/components/Shared/Sections/TrustStatsSection";
import DestinationsExplorer from "@/src/components/Ui/DestinationsPage/DestinationsExplorer/DestinationsExplorer";
import FeaturedDestination from "@/src/components/Ui/DestinationsPage/FeaturedDestination/FeaturedDestination";
import { DESTINATIONS } from "@/src/utils/data/destinations";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore every destination we cover — from Lake Como and Istanbul to Thailand, Nepal, and beyond.",
};

export default function DestinationsPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Destinations"
        title="Explore the World, One Coastline at a Time"
        subtitle={`${DESTINATIONS.length} destinations to choose from, with new tours added every season.`}
        image={PAGE_HERO_IMAGES.destinations}
        alt="Lake Louise in Banff National Park, Canada"
      />

      {/* 2 & 3. Search bar + destinations grid */}
      <DestinationsExplorer destinations={DESTINATIONS} />

      {/* 4. Stats / why explore */}
      <TrustStatsSection />

      {/* 5. Featured destination spotlight */}
      <FeaturedDestination destination={DESTINATIONS[0]} />

      {/* 6. CTA */}
      <CtaBanner
        title="Don't See Your Dream Destination?"
        description="We plan custom itineraries across every region we cover — tell us where you want to go."
        buttonText="Plan My Trip"
        buttonHref="/contact"
      />
    </>
  );
}
