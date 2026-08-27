import CategoryExploreSection from "../CategoryExploreSection/CategoryExploreSection";
import DestinationsSection from "../DestinationsSection/DestinationsSection";
import DiscoverSection from "../DiscoverSection/DiscoverSection";
import FaqSection from "../FaqSection/FaqSection";
import FeaturedYachtsSection from "../FeaturedYachtsSection/FeaturedYachtsSection";
import HeroSection from "../HeroSection/HeroSection";
import InsightsSection from "../InsightsSection/InsightsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import OfferCountdownSection from "../OfferCountdownSection/OfferCountdownSection";
import PopularToursStrip from "../PopularToursStrip/PopularToursStrip";
import TeamExpertsSection from "../TeamExpertsSection/TeamExpertsSection";
import TestimonialsSection from "../TestimonialsSection/TestimonialsSection";
import TrustStatsSection from "@/src/components/Shared/Sections/TrustStatsSection";
import WhyChooseUsSection from "@/src/components/Shared/Sections/WhyChooseUsSection";

const RootHomePage = () => {
  return (
    <>
      <div id="home" className="scroll-mt-[100px]">
        <HeroSection />
      </div>

      {/* clearance for HeroSearchWidget's negative-margin overlap card */}
      <div className="h-24 md:h-16" aria-hidden="true" />

      <PopularToursStrip />

      <CategoryExploreSection />

      <DiscoverSection />

      <div id="destinations" className="scroll-mt-[100px]">
        <DestinationsSection />
      </div>

      <OfferCountdownSection />

      <TrustStatsSection />

      <div id="tours" className="scroll-mt-[100px]">
        <FeaturedYachtsSection />
      </div>

      <WhyChooseUsSection />

      <TeamExpertsSection />

      <TestimonialsSection />

      <FaqSection />

      <div id="insights" className="scroll-mt-[100px]">
        <InsightsSection />
      </div>

      <NewsletterSection />
    </>
  );
};

export default RootHomePage;
