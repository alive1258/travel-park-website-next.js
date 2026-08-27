import Image from "next/image";
import FaqAccordion from "@/src/components/Ui/HomePage/FaqSection/FaqAccordion";
import { TRANSPORT_FAQS } from "@/src/utils/data/transportation";
import { TRANSPORT_LOCAL_IMAGES } from "@/src/utils/data/localImages";

const TransportationFaq = () => {
  return (
    <section className="bg-brand-50/40 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Good to Know
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Transportation FAQs
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[420px]">
            <Image
              src={TRANSPORT_LOCAL_IMAGES.mountainRoad}
              alt="Scenic mountain road for a private transfer"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <FaqAccordion faqs={TRANSPORT_FAQS} />
        </div>
      </div>
    </section>
  );
};

export default TransportationFaq;
