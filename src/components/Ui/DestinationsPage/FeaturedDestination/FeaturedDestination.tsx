import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import type { Destination } from "@/src/utils/data/destinations";

interface FeaturedDestinationProps {
  destination: Destination;
}

const FeaturedDestination = ({ destination }: FeaturedDestinationProps) => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <SlideLeft>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[380px]">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </SlideLeft>

        <SlideRight>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
              <MapPin size={13} />
              Featured Destination
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">
              {destination.name}
            </h2>
            <p className="mt-5 text-brand-900/70 leading-relaxed max-w-lg">
              {destination.description ||
                "One of our most requested coastlines — handpicked itineraries, curated stays, and easy transfers all sorted for you."}
            </p>
            <Link
              href={`/tours?region=${encodeURIComponent(destination.name)}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Explore Tours Here
              <ArrowRight size={16} />
            </Link>
          </div>
        </SlideRight>
      </div>
    </section>
  );
};

export default FeaturedDestination;
