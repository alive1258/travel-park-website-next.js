import { CalendarCheck, CarFront, MapPin, MessageSquare } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const STEPS = [
  {
    icon: MapPin,
    title: "Tell Us Your Route",
    description: "Share your pickup, drop-off, and travel dates.",
  },
  {
    icon: CalendarCheck,
    title: "Confirm Your Booking",
    description: "We match you with the right vehicle and driver.",
  },
  {
    icon: CarFront,
    title: "We Pick You Up",
    description: "Your driver tracks your flight or charter timing.",
  },
  {
    icon: MessageSquare,
    title: "Arrive Stress-Free",
    description: "Direct, comfortable transfer to your next stop.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Booking a Ride Takes Minutes
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <SlideUp key={title} delay={i + 1}>
              <div className="relative text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Icon size={22} />
                </span>
                <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-brand-600">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-bold text-brand-900">{title}</h3>
                <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
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

export default HowItWorks;
