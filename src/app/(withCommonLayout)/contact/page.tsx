import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import ContactForm from "@/src/components/Ui/ContactPage/ContactForm";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch to plan your next tour, hotel stay, or transportation booking — questions, custom itineraries, or a quote.",
};

// TODO: same placeholders as Navbar/Footer — replace with the charter
// company's real contact details.
const CONTACT_PHONE = "+1 (202) 555-0198";
const CONTACT_EMAIL = "hello@travelpark.com";
const OFFICE_ADDRESS = "14 Marina Boulevard, Athens, Greece";
const OPEN_HOURS = "Mon – Sat, 9am – 6pm";

const INFO_ITEMS = [
  { icon: Phone, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}` },
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: MapPin, label: "Office", value: OFFICE_ADDRESS },
  { icon: Clock, label: "Hours", value: OPEN_HOURS },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Plan Your Next Trip"
        subtitle="Questions about a tour, hotel, transportation, or a group booking? Reach out and we&apos;ll get back to you within one business day."
        image={PAGE_HERO_IMAGES.contact}
        alt="Tranquil beach loungers under a palm tree"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Get in Touch
              </span>
              <h2 className="mt-3 text-3xl font-bold text-brand-900">
                We&apos;re Here to Help
              </h2>
            </div>

            <ul className="space-y-5">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/50">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-medium text-brand-900 hover:text-brand-600 transition"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium text-brand-900">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden rounded-2xl border border-brand-900/10">
              <iframe
                title="Eco Yachts office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=23.60%2C37.94%2C23.64%2C37.96&layer=mapnik&marker=37.9475%2C23.6187"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
