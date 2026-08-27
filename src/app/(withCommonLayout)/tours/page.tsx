import type { Metadata } from "next";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import WhyChooseUsSection from "@/src/components/Shared/Sections/WhyChooseUsSection";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import ToursSearchForm from "@/src/components/Ui/ToursPage/ToursSearchForm/ToursSearchForm";
import ToursResults from "@/src/components/Ui/ToursPage/ToursResults/ToursResults";
import BestSellerTours from "@/src/components/Ui/ToursPage/BestSellerTours/BestSellerTours";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";
import { TOUR_REGIONS } from "@/src/utils/data/tours";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Browse handpicked tours and destinations — find the trip that matches your dates, group size, and dream destination.",
};

interface ToursPageProps {
  searchParams: Promise<{
    region?: string;
    guests_min?: string;
    category?: string;
  }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { region, guests_min, category } = await searchParams;
  const guestsMin = guests_min ? Number(guests_min) : undefined;

  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Tours"
        title="Top Domestic & International Tours"
        subtitle="Handpicked itineraries across every coastline we cover — find the tour that matches your dates, group size, and destination."
        image={PAGE_HERO_IMAGES.tours}
        alt="Aerial view of Railay Beach, Thailand at sunset"
      />

      {/* 2. Search / filter bar */}
      <ToursSearchForm
        regions={TOUR_REGIONS}
        defaultRegion={region}
        defaultGuestsMin={guests_min}
      />

      {/* 3 & 4. Category strip + tour packages grid */}
      <ToursResults region={region} guestsMin={guestsMin} category={category} />

      {/* 5. Why book with us */}
      <WhyChooseUsSection
        eyebrow="Why Book With Us"
        title="Why Travelers Book Their Tours With Us"
      />

      {/* 6. Best-seller tours */}
      <BestSellerTours />

      {/* 7. CTA */}
      <CtaBanner
        title="Can't Find the Right Tour?"
        description="Tell us your dates, group size, and destination — we'll put together a custom itinerary for you."
        buttonText="Talk to Our Team"
        buttonHref="/contact"
      />
    </>
  );
}
