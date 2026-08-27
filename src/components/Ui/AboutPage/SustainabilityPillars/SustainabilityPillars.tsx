import { BatteryCharging, Fish, Recycle, Sprout } from "lucide-react";

const PILLARS = [
  {
    icon: BatteryCharging,
    title: "Fleet Electrification",
    description:
      "Every new build and major refit moves toward hybrid-electric propulsion, cutting fuel burn without cutting range or comfort.",
  },
  {
    icon: Fish,
    title: "Marine Conservation",
    description:
      "We partner with regional marine reserves and reef-monitoring programs at the destinations we cruise most often.",
  },
  {
    icon: Recycle,
    title: "Waste Reduction",
    description:
      "Onboard water treatment, zero single-use plastic provisioning, and shoreside recycling protocols across the fleet.",
  },
  {
    icon: Sprout,
    title: "Community Partnerships",
    description:
      "Local provisioning and shore excursions are sourced from operators who share our environmental standards.",
  },
];

export default function SustainabilityPillars() {
  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
          Four Pillars
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
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
  );
}
