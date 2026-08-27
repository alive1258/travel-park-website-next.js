import type { Metadata } from "next";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import WhyChooseUsSection from "@/src/components/Shared/Sections/WhyChooseUsSection";
import ServiceTypesGrid from "@/src/components/Ui/TransportationPage/ServiceTypesGrid/ServiceTypesGrid";
import HowItWorks from "@/src/components/Ui/TransportationPage/HowItWorks/HowItWorks";
import FleetShowcase from "@/src/components/Ui/TransportationPage/FleetShowcase/FleetShowcase";
import TransportationFaq from "@/src/components/Ui/TransportationPage/TransportationFaq/TransportationFaq";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";

export const metadata: Metadata = {
  title: "Transportation",
  description:
    "Airport transfers, private cars, shuttles, and marina boat transfers — book reliable transportation for every leg of your trip.",
};

export default function TransportationPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Transportation"
        title="Reliable Transfers, Wherever You're Headed"
        subtitle="Airport pickups, private cars, shuttles, and marina boat transfers — booked in minutes, tracked to your schedule."
        image={PAGE_HERO_IMAGES.transportation}
        alt="The Great Ocean Road winding along the Australian coast"
      />

      {/* 2. Service types */}
      <ServiceTypesGrid />

      {/* 3. How it works */}
      <HowItWorks />

      {/* 4. Fleet showcase */}
      <FleetShowcase />

      {/* 5. Pricing / why choose us */}
      <WhyChooseUsSection
        eyebrow="Why Choose Us"
        title="Dependable Transportation, Every Trip"
        className="bg-white"
      />

      {/* 6. FAQ */}
      <TransportationFaq />

      {/* 7. CTA */}
      <CtaBanner
        title="Need a Ride Booked?"
        description="Share your pickup, drop-off, and dates — we'll arrange the right vehicle for you."
        buttonText="Book Transportation"
        buttonHref="/contact"
      />
    </>
  );
}
