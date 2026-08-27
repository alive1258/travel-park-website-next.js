import { Globe2, Headset, MapPinned, Package, Users } from "lucide-react";

// TODO: swap for real, reported figures once the business tracks them —
// currently illustrative marketing copy, consistent with other placeholder
// stats already in this codebase (see Navbar/Footer TODOs).
const STATS = [
  { icon: Users, value: "50K+", label: "Happy Travelers" },
  { icon: MapPinned, value: "120+", label: "Destinations" },
  { icon: Package, value: "300+", label: "Tour Packages" },
  { icon: Globe2, value: "80+", label: "Travel Partners" },
  { icon: Headset, value: "24/7", label: "Support" },
];

const TrustStatsSection = () => {
  return (
    <section className="border-y border-brand-900/10 bg-white py-10">
      <div className="container grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-lg font-bold text-brand-900 leading-none">
                {value}
              </p>
              <p className="mt-1 text-xs text-brand-900/50">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustStatsSection;
