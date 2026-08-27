import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ClipboardCheck,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Crew Recruitment",
  description:
    "How Eco Yachts recruits captains, engineers, chefs, and deckhands — screening, certification verification, interviews, and placement.",
};

const PROCESS = [
  {
    icon: ClipboardCheck,
    step: "1",
    title: "Screening",
    description:
      "Every applicant is screened for relevant sea time, references, and role fit before certifications are even reviewed.",
  },
  {
    icon: Award,
    step: "2",
    title: "Certification Verification",
    description:
      "STCW, ENG1 medical, and role-specific licenses are verified directly with issuing bodies — no self-reported credentials.",
  },
  {
    icon: MessageSquare,
    step: "3",
    title: "Interview & Placement",
    description:
      "A structured interview with our crew placement team, followed by matching against open roles across the fleet.",
  },
  {
    icon: UserCheck,
    step: "4",
    title: "Onboarding",
    description:
      "Placed crew move directly into our training program before their first charter — see Crew Training for details.",
  },
];

const ROLES = [
  "Captains & First Mates",
  "Chief & Second Engineers",
  "Chefs & Sous Chefs",
  "Chief Stewards & Stewardesses",
  "Deckhands & Bosuns",
  "Watersports & Dive Instructors",
];

export default function RecruitmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew Services"
        title="Crew Recruitment"
        subtitle="A structured, verified hiring process for every role on the fleet — and for owners who want the same standard for their own vessel."
        image="/images/experiences/exp-marina.jpg"
        alt="Eco Yachts crew recruitment"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            How Recruitment Works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(({ icon: Icon, step, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-900/10 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
                    {step}
                  </span>
                  <Icon size={18} className="text-gold-500" />
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

      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Roles We Place
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {ROLES.map((role) => (
              <span
                key={role}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Looking to Join the Fleet — or Hire For Your Own?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Applicants and owners both start the same way: a conversation
            with our crew placement team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/crew-services/contact-specialist"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Contact a Crew Specialist
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about/careers"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
