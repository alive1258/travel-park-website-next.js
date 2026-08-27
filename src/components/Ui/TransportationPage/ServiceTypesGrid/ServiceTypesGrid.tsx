import Image from "next/image";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { SERVICE_TYPES } from "@/src/utils/data/transportation";

const ServiceTypesGrid = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Ground &amp; Water Transportation
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_TYPES.map(({ title, description, image }, i) => (
            <SlideUp key={title} delay={i + 1}>
              <div className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-900">{title}</h3>
                  <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTypesGrid;
