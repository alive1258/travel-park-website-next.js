import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, ShieldCheck } from "lucide-react";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import { DISCOVER_IMAGES } from "@/src/utils/data/localImages";

const BADGES = [
  { icon: BadgeCheck, label: "Best Price Guarantee" },
  { icon: Headset, label: "24/7 Customer Support" },
  { icon: ShieldCheck, label: "Secure Bookings" },
];

const DiscoverSection = () => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <SlideLeft>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={DISCOVER_IMAGES.travelerWithSuitcase}
                alt="Traveler with a suitcase on a tropical beach"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={DISCOVER_IMAGES.rovinjPier}
                alt="Traveler on a pier overlooking a marina in Rovinj, Croatia"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </SlideLeft>

        <SlideRight>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              About Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">
              Discover Exceptional Travel Experiences With Us
            </h2>
            <p className="mt-5 text-brand-900/70 leading-relaxed max-w-lg">
              We believe travel should be seamless, inspiring, and personal.
              We combine local expertise and genuine care to deliver tours,
              stays, and journeys at unbeatable value — every itinerary
              planned around you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-brand-900"
                >
                  <Icon size={18} className="text-brand-600" />
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/tours"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>
        </SlideRight>
      </div>
    </section>
  );
};

export default DiscoverSection;
