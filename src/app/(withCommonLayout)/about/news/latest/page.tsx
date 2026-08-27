import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Latest News",
  description:
    "Fleet updates, sustainability milestones, and announcements from Eco Yachts.",
};

const ARTICLES = [
  {
    title: "Eco Voyager Completes Hybrid-Electric Refit",
    category: "Fleet",
    date: "June 2026",
    excerpt:
      "Our flagship returns to service with a fully upgraded hybrid drivetrain, cutting fuel consumption by roughly a third on standard itineraries.",
    image: "/images/yachts/eco-voyager.jpg",
  },
  {
    title: "Eco Yachts Reaches Zero Single-Use Plastic Fleet-Wide",
    category: "Sustainability",
    date: "April 2026",
    excerpt:
      "Every yacht in the fleet has now eliminated single-use plastic from provisioning, a milestone two years ahead of our original roadmap.",
    image: "/images/experiences/adventure-nature.jpg",
  },
  {
    title: "New Charter Desk Opens in Dubai",
    category: "Company",
    date: "February 2026",
    excerpt:
      "Our fourth regional office extends dedicated charter support across the Middle East and Indian Ocean itineraries.",
    image: "/images/experiences/exp-dubai-tour.avif",
  },
  {
    title: "Eco Sharlou Joins the Fleet as New Flagship",
    category: "Fleet",
    date: "November 2025",
    excerpt:
      "At 110ft and 14 guests, Eco Sharlou is the largest vessel we've added to date — and one of the most efficient per guest.",
    image: "/images/yachts/yacht-sharlou.jpg",
  },
  {
    title: "Partnering With Regional Marine Reserves",
    category: "Sustainability",
    date: "September 2025",
    excerpt:
      "We've formalized conservation partnerships at four of our most-cruised destinations, funding reef monitoring alongside guest excursions.",
    image: "/images/experiences/exp-savannah.jpg",
  },
  {
    title: "Crew Training Program Adds Sustainability Module",
    category: "Crew",
    date: "July 2025",
    excerpt:
      "Every crew member now completes eco-operations training alongside standard STCW certification — details on the Crew Services page.",
    image: "/images/experiences/exp-38.jpg",
  },
];

export default function LatestNewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Latest News"
        subtitle="Fleet updates, sustainability milestones, and announcements from across Eco Yachts."
        image="/images/experiences/images-37.jpg"
        alt="Eco Yachts news and updates"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <article
                key={article.title}
                className="overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className=""
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand-600">
                    <span>{article.category}</span>
                    <span className="flex items-center gap-1.5 text-brand-900/40 normal-case tracking-normal">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-brand-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50/50 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            See Us in Person
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Catch the fleet at an upcoming boat show or charter preview.
          </p>
          <Link
            href="/about/news/events"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Events & Boat Shows
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
