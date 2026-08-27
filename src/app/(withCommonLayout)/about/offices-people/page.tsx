import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Compass,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Offices & People",
  description:
    "The regional offices and departments behind every Eco Yachts charter — fleet operations, guest experience, sustainability, and crew placement.",
};

// TODO: replace with the charter company's real office addresses/contacts
const OFFICES = [
  {
    city: "Athens, Greece",
    role: "Global Headquarters",
    address: "14 Marina Boulevard, Piraeus, Athens",
    phone: "+30 21 0555 0198",
    hours: "Mon – Sat, 9am – 6pm EET",
  },
  {
    city: "Monaco",
    role: "Mediterranean Charter Desk",
    address: "7 Quai Antoine 1er, Monte-Carlo",
    phone: "+377 93 555 0142",
    hours: "Mon – Sat, 9am – 7pm CET",
  },
  {
    city: "Fort Lauderdale, USA",
    role: "Americas & Caribbean Desk",
    address: "1200 Marina Way, Fort Lauderdale, FL",
    phone: "+1 (954) 555 0176",
    hours: "Mon – Fri, 8am – 6pm EST",
  },
  {
    city: "Dubai, UAE",
    role: "Middle East & Indian Ocean Desk",
    address: "Marina Walk, Dubai Marina",
    phone: "+971 4 555 0121",
    hours: "Sun – Thu, 9am – 6pm GST",
  },
];

const DEPARTMENTS = [
  {
    icon: Compass,
    title: "Fleet Operations",
    description:
      "Owns vessel readiness — inspections, certifications, maintenance scheduling, and season-to-season fleet planning.",
  },
  {
    icon: Users,
    title: "Charter & Guest Experience",
    description:
      "Builds itineraries, coordinates provisioning, and is the point of contact for guests before, during, and after a charter.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Compliance",
    description:
      "Tracks emissions targets, manages eco-certifications, and vets marine and shoreside partners against our standards.",
  },
  {
    icon: HeartHandshake,
    title: "Crew Placement",
    description:
      "Recruits, trains, and manages the captains and crew who staff every yacht in the fleet — see Crew Services for more.",
  },
];

export default function OfficesPeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Offices & People"
        subtitle="A global charter desk backed by regional offices, and a set of departments purpose-built around one job: getting every charter right."
        image="/images/experiences/exp-marina.jpg"
        alt="Eco Yachts marina office and operations"
      />

      {/* OFFICES */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Our Offices
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <div
                key={office.city}
                className="rounded-2xl border border-brand-900/10 p-6"
              >
                <h3 className="text-lg font-bold text-brand-900">
                  {office.city}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-600">
                  {office.role}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-brand-900/70">
                  <li className="flex items-start gap-2.5">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-gold-500" />
                    {office.address}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone size={15} className="mt-0.5 shrink-0 text-gold-500" />
                    {office.phone}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Clock size={15} className="mt-0.5 shrink-0 text-gold-500" />
                    {office.hours}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Our People
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Departments Behind Every Charter
            </h2>
            <p className="mt-4 text-brand-900/60 leading-relaxed">
              Every charter touches four teams before a guest ever steps
              aboard. Here&apos;s what each one is responsible for.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DEPARTMENTS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
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

      <section className="bg-white py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <ShieldCheck size={32} className="text-brand-600" />
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Prefer to Speak With Someone Directly?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Reach the office closest to your itinerary, or send a general
            inquiry and we&apos;ll route it for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Mail size={16} />
              Contact Us
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-900/15 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
            >
              Back to About
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
