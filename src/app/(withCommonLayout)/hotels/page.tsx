import type { Metadata } from "next";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import HotelsExplorer from "@/src/components/Ui/HotelsPage/HotelsExplorer/HotelsExplorer";
import AmenitiesSection from "@/src/components/Ui/HotelsPage/AmenitiesSection/AmenitiesSection";
import TestimonialsSection from "@/src/components/Ui/HomePage/TestimonialsSection/TestimonialsSection";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";

export const metadata: Metadata = {
  title: "Hotels",
  description:
    "Book handpicked partner hotels and stays for the leg of your trip on land — beach resorts, city hotels, boutique stays, and mountain lodges.",
};

export default function HotelsPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Hotels"
        title="Comfortable Stays For Every Journey"
        subtitle="Handpicked partner hotels for the leg of your trip on land — beach resorts, city stays, boutique escapes, and mountain lodges."
        image={PAGE_HERO_IMAGES.hotels}
        alt="Istanbul skyline along the Bosphorus"
      />

      {/* 2, 3, 4. Search bar, categories, featured hotels grid */}
      <HotelsExplorer />

      {/* 5. Amenities / why choose us */}
      <AmenitiesSection />

      {/* 6. Guest reviews */}
      <TestimonialsSection />

      {/* 7. CTA */}
      <CtaBanner
        title="Looking For a Custom Stay?"
        description="Tell us your destination and dates — we'll help you find the right property."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
