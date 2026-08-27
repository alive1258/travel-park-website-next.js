import Link from "next/link";
import {
  Building2,
  Heart,
  Mountain,
  Palmtree,
  Ship,
  Sparkles,
  Users,
} from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const CATEGORIES = [
  { icon: Palmtree, label: "Beach Holidays", href: "/tours?category=Beach" },
  { icon: Mountain, label: "Adventure", href: "/tours?category=Adventure" },
  { icon: Building2, label: "City Breaks", href: "/tours?category=City" },
  { icon: Heart, label: "Honeymoon", href: "/tours?category=Honeymoon" },
  { icon: Users, label: "Family Tours", href: "/tours?category=Family" },
  { icon: Ship, label: "Cruises", href: "/tours?category=Cruise" },
  { icon: Sparkles, label: "Wildlife", href: "/tours?category=Wildlife" },
];

const CategoryExploreSection = () => {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Explore
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-brand-900">
              Explore By Category
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map(({ icon: Icon, label, href }, i) => (
            <SlideUp key={label} delay={i + 1}>
              <Link
                href={href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-brand-900/10 bg-white px-4 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Icon size={24} />
                </span>
                <span className="text-sm font-semibold text-brand-900">
                  {label}
                </span>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryExploreSection;
