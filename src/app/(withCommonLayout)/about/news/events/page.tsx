import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import EventsList from "@/src/components/Ui/AboutPage/EventsList/EventsList";

export const metadata: Metadata = {
  title: "Events & Boat Shows",
  description:
    "Where to find the Eco Yachts fleet in person — upcoming boat shows, charter previews, and industry events.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Events & Boat Shows"
        subtitle="Meet the fleet and our charter team in person at the shows and previews below."
        image="/images/experiences/exp-38.jpg"
        alt="Eco Yachts at a marina event"
      />

      <EventsList />

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Can&apos;t Make an Event?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            We can arrange a private walkthrough or video tour of any yacht
            in the fleet.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Arrange a Tour
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
