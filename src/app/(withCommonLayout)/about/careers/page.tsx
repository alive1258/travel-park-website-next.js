import type { Metadata } from "next";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  ChefHat,
  Compass,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Wrench,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Careers at Eco Yachts — deck and engineering crew, hospitality roles, shoreside operations, and sustainability positions across our fleet and offices.",
};

const ROLE_CATEGORIES = [
  {
    icon: Anchor,
    title: "Deck & Engineering Crew",
    description:
      "Captains, mates, engineers, and deckhands who keep the fleet running and guests safe on the water.",
  },
  {
    icon: ChefHat,
    title: "Hospitality & Service",
    description:
      "Chefs, stewards, and stewardesses delivering five-star service on every charter, every season.",
  },
  {
    icon: Compass,
    title: "Shoreside Operations",
    description:
      "Charter coordinators, logistics, and guest experience roles across our regional offices.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Compliance",
    description:
      "Roles focused on emissions tracking, certification management, and partner vetting.",
  },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Structured Training",
    description:
      "Every crew hire goes through our training program — see Crew Services for the full curriculum.",
  },
  {
    icon: Globe2,
    title: "Seasonal Variety",
    description:
      "Rotate across Mediterranean, Caribbean, and Middle East itineraries depending on the season.",
  },
  {
    icon: HeartHandshake,
    title: "Career Pathways",
    description:
      "Clear progression from entry-level deck and service roles up to senior crew and shoreside management.",
  },
  {
    icon: Wrench,
    title: "Modern Fleet",
    description:
      "Work on hybrid-electric and eco-certified vessels, not aging diesel tonnage.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Join the Team"
        subtitle="We hire crew and shoreside staff who care about the same thing we do: a genuinely good charter that doesn't cost the earth."
        image="/images/experiences/exp-35.jpg"
        alt="Crew at work aboard an Eco Yachts vessel"
      />

      {/* ROLE CATEGORIES */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Where You&apos;d Fit
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Roles Across the Fleet and Offices
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {ROLE_CATEGORIES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-brand-900/10 p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-900">{title}</h3>
                  <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Why Crew With Eco Yachts
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 shadow-sm text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-bold text-brand-900">{title}</h3>
                <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Apply?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Send us your CV and the role you&apos;re interested in — our crew
            placement team will follow up directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Send Your CV
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/crew-services/recruitment"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How Recruitment Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
