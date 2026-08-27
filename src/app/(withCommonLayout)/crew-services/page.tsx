import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  GraduationCap,
  Headset,
  UserSearch,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Crew Services",
  description:
    "Eco Yachts Crew Services — recruitment, training, and management for captains and crew, backed by a dedicated crew specialist team.",
};

const SERVICES = [
  {
    icon: UserSearch,
    title: "Crew Recruitment",
    description:
      "Screening, certification verification, and placement for captains, engineers, chefs, and deckhands.",
    href: "/crew-services/recruitment",
  },
  {
    icon: GraduationCap,
    title: "Crew Training",
    description:
      "STCW safety, eco-operations, and guest service programs every crew member completes before boarding.",
    href: "/crew-services/training",
  },
  {
    icon: ClipboardList,
    title: "Crew Management",
    description:
      "Payroll, scheduling, welfare support, and regulatory compliance for owners and operators.",
    href: "/crew-services/management",
  },
  {
    icon: Headset,
    title: "Contact a Crew Specialist",
    description:
      "Talk directly with our crew placement team about a hire, a training need, or a management question.",
    href: "/crew-services/contact-specialist",
  },
];

export default function CrewServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew Services"
        title="Crew, Done Properly"
        subtitle="The same standards we hold our fleet to — we hold our crew to. Recruitment, training, and management, all in-house."
        image="/images/experiences/exp-jetski-tender.jpg"
        alt="Eco Yachts crew at work"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Why It&apos;s In-House
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Every Yacht Is Only as Good as Its Crew
            </h2>
            <p className="mt-5 text-brand-900/70 leading-relaxed">
              We run crew recruitment, training, and management ourselves rather
              than outsourcing it, because the crew is the single biggest factor
              in how a charter actually feels. That means consistent standards
              across the fleet, not whatever a third-party agency happened to
              place.
            </p>
            <p className="mt-4 text-brand-900/70 leading-relaxed">
              Owners and operators outside our own fleet can also work with our
              crew team directly — see each service below for details.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/experiences/exp-wakeboard.webp"
              alt="Eco Yachts crew running a watersports session"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className=""
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map(({ icon: Icon, title, description, href }) => (
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

      <section className="bg-white py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Have a Crew Need Right Now?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Whether it&apos;s a placement, a training gap, or a management
            question, our crew specialists can help.
          </p>
          <Link
            href="/crew-services/contact-specialist"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Contact a Crew Specialist
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
