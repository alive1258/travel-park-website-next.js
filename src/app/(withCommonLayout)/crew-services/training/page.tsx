import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  LifeBuoy,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Crew Training",
  description:
    "Eco Yachts' crew training programs — STCW basic safety, eco-operations, guest service excellence, and leadership development.",
};

const PROGRAMS = [
  {
    icon: LifeBuoy,
    title: "STCW Basic Safety",
    duration: "5 days, before first placement",
    description:
      "Firefighting, sea survival, first aid, and personal safety — the baseline certification every crew member holds before boarding.",
  },
  {
    icon: Leaf,
    title: "Eco-Operations & Sustainability",
    duration: "2 days, on joining the fleet",
    description:
      "Hybrid propulsion operating procedures, waste protocols, and how to talk guests through our sustainability standards.",
  },
  {
    icon: Sparkles,
    title: "Guest Service Excellence",
    duration: "3 days, role-specific",
    description:
      "Five-star hospitality standards for stewards, chefs, and deck crew working directly with guests.",
  },
  {
    icon: TrendingUp,
    title: "Leadership & Certification Renewal",
    duration: "Ongoing, by role tenure",
    description:
      "Advanced certifications and leadership development for crew progressing toward senior or command roles.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew Services"
        title="Crew Training"
        subtitle="Every crew member completes the same core curriculum before their first charter, regardless of experience level coming in."
        image="/images/experiences/exp-wakeboard.webp"
        alt="Eco Yachts crew training session"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Training Programs
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PROGRAMS.map(({ icon: Icon, title, duration, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-brand-900/10 p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-900">{title}</h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {duration}
                  </p>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
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
            Why We Train In-House
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-900/60 leading-relaxed">
            Outsourced crew often arrive with inconsistent standards. Running
            training ourselves means every yacht in the fleet — regardless of
            size or itinerary — delivers the same level of safety and
            service, and every crew member understands why the fleet
            operates the way it does.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Training Questions?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Whether you&apos;re newly certified or an experienced captain, our
            crew specialists can walk you through the program.
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
