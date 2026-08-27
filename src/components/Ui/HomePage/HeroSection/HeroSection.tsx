import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { TEAM_PORTRAITS } from "@/src/utils/data/stockImages";
import { HERO_BANNER } from "@/src/utils/data/localImages";
import { TOUR_REGIONS } from "@/src/utils/data/tours";
import HeroSearchWidget from "./HeroSearchWidget";

const AVATARS = [
  TEAM_PORTRAITS.memberOne,
  TEAM_PORTRAITS.memberTwo,
  TEAM_PORTRAITS.memberThree,
  TEAM_PORTRAITS.memberFour,
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[640px] items-center pt-28 pb-28 md:min-h-[740px] md:pt-32 md:pb-36">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_BANNER}
          alt="Traveler at a marina full of yachts"
          fill
          priority
          sizes="100vw"
          className=""
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-brand-900/75 via-brand-900/40 to-transparent" />

      <div className="container relative">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Inspiring Travel Experiences Designed For The Way You Explore
          </h1>

          <p className="mt-6 text-white/80 text-base md:text-lg max-w-lg leading-relaxed">
            Find your perfect trip with exclusive deals, handpicked destinations
            and unforgettable experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Explore Tours
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gold-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Play size={14} fill="currentColor" />
              </span>
              Watch Video
            </button>
          </div>

          <div className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <span
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-brand-900"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                  {i === AVATARS.length - 1 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-brand-900/50 text-[10px] font-bold text-white">
                      +
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="text-sm text-white/80 leading-tight">
              <span className="block font-bold text-white">25K+</span>
              Happy Customers
            </div>
          </div>
        </div>

        <HeroSearchWidget destinations={TOUR_REGIONS} />
      </div>
    </section>
  );
};

export default HeroSection;
