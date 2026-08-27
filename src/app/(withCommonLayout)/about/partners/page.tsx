import type { Metadata } from "next";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Award,
  Handshake,
  ShoppingBag,
  Waves,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The marina, certification, conservation, and provisioning partners that help Eco Yachts run a genuinely sustainable charter fleet.",
};

const PARTNER_CATEGORIES = [
  {
    icon: Anchor,
    title: "Marina & Port Partners",
    description:
      "Preferred berthing and shore-power access at marinas across the Mediterranean, Caribbean, and Middle East that meet our environmental standards.",
  },
  {
    icon: Award,
    title: "Certification Bodies",
    description:
      "Independent auditors who verify our eco-certification claims each season — we don't self-grade our own sustainability record.",
  },
  {
    icon: Waves,
    title: "Conservation Partners",
    description:
      "Regional marine reserves and reef-monitoring programs we support financially and route excursions through.",
  },
  {
    icon: ShoppingBag,
    title: "Provisioning & Supply Partners",
    description:
      "Local, low-waste suppliers for galley provisioning, linens, and onboard amenities at every home port.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Partners"
        subtitle="Sustainable chartering isn't something one company does alone. Here's who we work with to make it real."
        image="/images/experiences/exp-marina.jpg"
        alt="Marina partnership location used by the Eco Yachts fleet"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              How We Choose
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Vetted the Same Way We Vet Our Own Fleet
            </h2>
            <p className="mt-4 text-brand-900/60 leading-relaxed">
              Every partner on this list was reviewed against the same
              standard we hold ourselves to — environmental practice,
              reliability, and a track record guests can actually feel.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PARTNER_CATEGORIES.map(({ icon: Icon, title, description }) => (
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

      <section className="bg-brand-50/50 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <Handshake size={32} className="text-brand-600" />
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Interested in Partnering With Us?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            We&apos;re always vetting new marina, conservation, and supply
            partners at the destinations we operate. Get in touch to start a
            conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Become a Partner
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
