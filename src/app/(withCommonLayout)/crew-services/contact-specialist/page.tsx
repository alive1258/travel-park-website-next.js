import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  GraduationCap,
  Mail,
  Phone,
  UserSearch,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Contact a Crew Specialist",
  description:
    "Reach the Eco Yachts crew placement team directly for recruitment, training, or crew management questions.",
};

// TODO: same placeholders as Navbar/Footer/Contact — replace with real details
const CREW_PHONE = "+1 (202) 555-0199";
const CREW_EMAIL = "crew@ecoyachts.com";

const TOPICS = [
  {
    icon: UserSearch,
    title: "I'm looking to be placed",
    description:
      "Applying for a crew role — deck, engineering, hospitality, or shoreside.",
  },
  {
    icon: GraduationCap,
    title: "I have a training question",
    description:
      "Questions about STCW, eco-operations, or certification renewal.",
  },
  {
    icon: ClipboardList,
    title: "I need crew management support",
    description:
      "Payroll, scheduling, or compliance help for crew on a vessel you own or operate.",
  },
];

export default function ContactCrewSpecialistPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew Services"
        title="Contact a Crew Specialist"
        subtitle="Recruitment, training, and management questions all go to the same team. Tell us what you need and we'll route it correctly."
        image="/images/experiences/exp-marina.jpg"
        alt="Eco Yachts crew specialist team"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              What Can We Help With
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-brand-900">
              Common Reasons People Reach Out
            </h2>

            <div className="mt-6 space-y-4">
              {TOPICS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-brand-900/10 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold text-brand-900">{title}</h3>
                    <p className="mt-1 text-sm text-brand-900/60 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand-900/10 bg-brand-50/50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-900">
              Reach the Crew Team Directly
            </h2>
            <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
              Call or email with your role, timeline, and a short summary —
              our crew placement team typically replies within one business
              day.
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={`tel:${CREW_PHONE.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white">
                    <Phone size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/50">
                      Call
                    </p>
                    <p className="font-semibold text-brand-900">
                      {CREW_PHONE}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CREW_EMAIL}`}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white">
                    <Mail size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/50">
                      Email
                    </p>
                    <p className="font-semibold text-brand-900">
                      {CREW_EMAIL}
                    </p>
                  </div>
                </a>
              </li>
            </ul>

            <div className="mt-6 border-t border-brand-900/10 pt-6">
              <p className="text-sm text-brand-900/60">
                Prefer a form? Use our general inquiry form and mention
                &ldquo;Crew Services&rdquo; in your message.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
              >
                Go to General Contact Form
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
