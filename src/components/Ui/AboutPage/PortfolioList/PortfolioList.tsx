import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, PartyPopper, Sailboat, Users2 } from "lucide-react";

const PORTFOLIO = [
  {
    icon: Users2,
    title: "Family Charters",
    description:
      "Shallow-draft tenders, connecting cabins, and itineraries paced for guests of every age — built around calm anchorages over long passages.",
    image: "/images/yachts/yacht-3148725.jpg",
    href: "/yachts",
  },
  {
    icon: PartyPopper,
    title: "Celebration Charters",
    description:
      "Milestone birthdays, anniversaries, and weddings hosted aboard our largest yachts, with dedicated event coordination on request.",
    image: "/images/yachts/yacht-2082it.jpeg",
    href: "/yachts",
  },
  {
    icon: Sailboat,
    title: "Adventure & Diving Charters",
    description:
      "Dive lockers, watersports garages, and remote itineraries for guests who want the charter to be the active part of the trip.",
    image: "/images/yachts/yacht-32.jpg",
    href: "/yachts",
  },
  {
    icon: Gem,
    title: "Corporate & Event Charters",
    description:
      "Private client entertaining, product launches, and small conferences run from a yacht instead of a venue.",
    image: "/images/yachts/eco-voyager.jpg",
    href: "/contact",
  },
];

export default function PortfolioList() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container space-y-6">
        {PORTFOLIO.map((item, i) => (
          <div
            key={item.title}
            className={`grid gap-8 rounded-2xl border border-brand-900/10 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className=""
              />
            </div>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <item.icon size={20} />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-brand-900">
                {item.title}
              </h2>
              <p className="mt-3 text-brand-900/60 leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
              >
                Explore
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
