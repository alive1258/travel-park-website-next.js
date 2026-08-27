import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import type { ApiResponse } from "@/src/types/axios";
import type { ExperienceItem } from "@/src/types/experienceType";

export const metadata: Metadata = {
  title: "Handpicked Experiences",
  description:
    "A closer look at every handpicked experience woven into our charters — water sports, island escapes, cultural voyages, and more.",
};

const FALLBACK_HERO_IMAGE = "/images/experiences/exp-marina.jpg";

async function getActiveExperiences(): Promise<ExperienceItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/experiences/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<ExperienceItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export default async function ExperiencesGalleryPage() {
  const experiences = await getActiveExperiences();

  return (
    <>
      <PageHero
        eyebrow="Handpicked Experiences"
        title="Every Journey We Curate"
        subtitle="Water sports, island escapes, and coastal moments — a closer look at the experiences woven into our charters."
        image={experiences[0]?.image ?? FALLBACK_HERO_IMAGE}
        alt="A handpicked Eco Yachts charter experience"
      />

      {experiences.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map(({ id, image, title, description }) => (
                <div
                  key={id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  {image && (
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-900">
                      {title}
                    </h3>
                    {description && (
                      <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Plan Your Own?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us what kind of experience you&apos;re after and we&apos;ll
            build the itinerary around it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Plan Your Journey
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
