import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  Handshake,
  Leaf,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";

const SECTIONS = [
  {
    icon: Building2,
    title: "Offices & People",
    description:
      "Meet the teams behind every charter, from fleet operations to guest experience, across our regional offices.",
    href: "/about/offices-people",
  },
  {
    icon: Leaf,
    title: "Future & Sustainability",
    description:
      "Our roadmap for a lower-impact fleet — hybrid propulsion, marine conservation, and measurable emissions goals.",
    href: "/about/sustainability",
  },
  {
    icon: Users,
    title: "Join the Team",
    description:
      "Open roles across crew, shoreside operations, and sustainability — and what it's like working with us.",
    href: "/about/careers",
  },
  {
    icon: Handshake,
    title: "Partners",
    description:
      "The marinas, certification bodies, and conservation partners that make responsible chartering possible.",
    href: "/about/partners",
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description:
      "Fleet updates, sustainability milestones, and announcements from across Eco Yachts.",
    href: "/about/news/latest",
  },
  {
    icon: Compass,
    title: "Events & Boat Shows",
    description:
      "Where to find the fleet in person — from regional boat shows to charter previews.",
    href: "/about/news/events",
  },
  {
    icon: ShieldCheck,
    title: "Luxury Charter Portfolio",
    description:
      "An overview of the charter experiences we build, from family itineraries to large-scale celebrations.",
    href: "/about/portfolio",
  },
];

export default function AboutExplore() {
  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-10 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Explore
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            More About Eco Yachts
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-bold text-brand-900">{title}</h3>
              <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                {description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                Learn More
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
