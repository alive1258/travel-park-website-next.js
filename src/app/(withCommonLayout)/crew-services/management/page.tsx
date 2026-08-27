import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  HeartHandshake,
  Scale,
  Wallet,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Crew Management",
  description:
    "Crew management services from Eco Yachts — payroll and compliance, rotational scheduling, welfare support, and flag-state regulatory compliance.",
};

const SERVICES = [
  {
    icon: Wallet,
    title: "Payroll & Compliance",
    description:
      "Multi-jurisdiction payroll handling, tax compliance, and contract management for crew across our operating regions.",
  },
  {
    icon: CalendarClock,
    title: "Rotational Scheduling",
    description:
      "Season-aware rotation planning that balances guest-facing coverage with crew rest requirements and time off.",
  },
  {
    icon: HeartHandshake,
    title: "Welfare & Performance Support",
    description:
      "Ongoing check-ins, performance reviews, and welfare support so issues get addressed before they affect a charter.",
  },
  {
    icon: Scale,
    title: "Regulatory & Flag-State Compliance",
    description:
      "Keeping crew certifications, manning levels, and documentation aligned with flag-state and classification requirements.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew Services"
        title="Crew Management"
        subtitle="Day-to-day crew administration for our own fleet, and available to owners who'd rather not run it themselves."
        image="/images/yachts/yacht-2082it.jpeg"
        alt="Crew management aboard an Eco Yachts vessel"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            What Crew Management Covers
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {SERVICES.map(({ icon: Icon, title, description }) => (
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

      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            For Yacht Owners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-900/60 leading-relaxed">
            If you own a yacht outside the Eco Yachts fleet, our crew
            management team can take on payroll, scheduling, and compliance
            for your crew directly — the same systems we run internally,
            available as a standalone service.
          </p>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Simplify Your Crew Administration
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Talk to our crew specialists about what management support would
            look like for your vessel.
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
