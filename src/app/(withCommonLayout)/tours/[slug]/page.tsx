import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import WhyChooseUsSection from "@/src/components/Shared/Sections/WhyChooseUsSection";
import { TOUR_PACKAGES } from "@/src/utils/data/tours";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOUR_PACKAGES.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = TOUR_PACKAGES.find((t) => t.slug === slug);

  if (!tour) return { title: "Tour Not Found" };

  return {
    title: tour.name,
    description: tour.tagline,
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = TOUR_PACKAGES.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  const related = TOUR_PACKAGES.filter(
    (t) => t.slug !== tour.slug && t.region === tour.region,
  ).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[380px] items-center overflow-hidden py-20 md:min-h-[460px]">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/60 to-brand-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />

        <div className="container relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {tour.category}
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl sm:text-5xl font-bold text-white leading-[1.1]">
            {tour.name}
          </h1>
          <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
            {tour.tagline}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            <ArrowLeft size={14} />
            Back to Tours
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="text-2xl font-bold text-brand-900">
                About This Tour
              </h2>
              <p className="mt-4 text-brand-900/70 leading-relaxed">
                {tour.tagline}. This {tour.duration.toLowerCase()} itinerary
                takes you through {tour.region}&apos;s most requested stops,
                with accommodation, local guiding, and transport between
                stops planned around a comfortable pace — built for groups of{" "}
                {tour.guests.toLowerCase()}.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-brand-900/10 p-4 text-center">
                  <Clock size={18} className="mx-auto text-brand-600" />
                  <p className="mt-2 text-sm font-bold text-brand-900">
                    {tour.duration}
                  </p>
                  <p className="text-xs text-brand-900/50">Duration</p>
                </div>
                <div className="rounded-xl border border-brand-900/10 p-4 text-center">
                  <Users size={18} className="mx-auto text-brand-600" />
                  <p className="mt-2 text-sm font-bold text-brand-900">
                    {tour.guests}
                  </p>
                  <p className="text-xs text-brand-900/50">Group Size</p>
                </div>
                <div className="rounded-xl border border-brand-900/10 p-4 text-center">
                  <MapPin size={18} className="mx-auto text-brand-600" />
                  <p className="mt-2 text-sm font-bold text-brand-900">
                    {tour.region}
                  </p>
                  <p className="text-xs text-brand-900/50">Region</p>
                </div>
                <div className="rounded-xl border border-brand-900/10 p-4 text-center">
                  <span className="mx-auto block text-sm font-bold text-brand-900">
                    ${tour.price}
                  </span>
                  <p className="text-xs text-brand-900/50">From / person</p>
                </div>
              </div>
            </div>

            <div className="h-fit rounded-2xl border border-brand-900/10 bg-brand-50/40 p-6">
              <p className="text-sm text-brand-900/60">Starting from</p>
              <p className="mt-1 text-3xl font-bold text-brand-900">
                ${tour.price}
                <span className="text-sm font-normal text-brand-900/50">
                  {" "}
                  / person
                </span>
              </p>
              <Link
                href="/contact"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
              >
                Enquire About This Tour
                <ArrowRight size={16} />
              </Link>
              <p className="mt-3 text-center text-xs text-brand-900/50">
                No payment now — our team will confirm availability first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection
        eyebrow="Why Book With Us"
        title="Why Travelers Book Their Tours With Us"
      />

      {related.length > 0 && (
        <section className="bg-brand-50/50 py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
              More Tours in {tour.region}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/tours/${r.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-brand-900 leading-snug group-hover:text-brand-600 transition-colors">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-sm text-brand-900/60">
                      ${r.price} / person
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Ready to Plan Your Trip?"
        description="Tell us your dates and group size — we'll help you put together the right itinerary."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
