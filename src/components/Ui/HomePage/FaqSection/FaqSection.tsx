import Image from "next/image";
import { SITE_FAQS } from "@/src/utils/data/faqs";
import { FAQ_IMAGE } from "@/src/utils/data/localImages";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Good to Know
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[480px]">
            <Image
              src={FAQ_IMAGE}
              alt="Abu Dhabi skyline at golden hour"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <FaqAccordion faqs={SITE_FAQS} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
