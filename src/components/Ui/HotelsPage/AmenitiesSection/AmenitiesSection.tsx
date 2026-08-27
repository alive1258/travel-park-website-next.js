import { BadgeDollarSign, Coffee, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const AMENITIES = [
  { icon: Wifi, title: "Free WiFi", description: "Stay connected at every property." },
  { icon: Coffee, title: "Breakfast Included", description: "Most stays include daily breakfast." },
  { icon: Sparkles, title: "Pool & Spa Access", description: "Unwind after a full day of touring." },
  { icon: ShieldCheck, title: "Free Cancellation", description: "Plans change — most rates flex with you." },
  { icon: BadgeDollarSign, title: "Best Price Guarantee", description: "Find it cheaper, we'll match it." },
];

const AmenitiesSection = () => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Why Stay With Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Every Stay, Fully Taken Care Of
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {AMENITIES.map(({ icon: Icon, title, description }, i) => (
            <SlideUp key={title} delay={i + 1}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-900/10 bg-white p-6 text-center shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon size={20} />
                </span>
                <h3 className="font-bold text-brand-900 text-sm">{title}</h3>
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

export default AmenitiesSection;
