import { BadgeDollarSign, CalendarCheck, Headset, ShieldCheck, Star } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const REASONS = [
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "Transparent pricing with no hidden fees, always.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Every booking is protected end to end.",
  },
  {
    icon: Headset,
    title: "24/7 Expert Support",
    description: "Real people, ready to help before and during your trip.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking Process",
    description: "Reserve in minutes, no back-and-forth required.",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Honest feedback from travelers who've been there.",
  },
];

interface WhyChooseUsSectionProps {
  eyebrow?: string;
  title?: string;
  className?: string;
}

const WhyChooseUsSection = ({
  eyebrow = "Why Choose Us",
  title = "Why Travelers Choose Us",
  className = "bg-brand-50/40",
}: WhyChooseUsSectionProps) => {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {REASONS.map(({ icon: Icon, title: reasonTitle, description }, i) => (
            <SlideUp key={reasonTitle} delay={i + 1}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-900/10 bg-white p-6 text-center shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon size={20} />
                </span>
                <h3 className="font-bold text-brand-900 text-sm">
                  {reasonTitle}
                </h3>
                <p className="text-xs text-brand-900/60 leading-relaxed">
                  {description}
                </p>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
