import Image from "next/image";
import { Sparkles } from "lucide-react";

const INNOVATIONS = [
  {
    name: "Silent Series Concept",
    description:
      "Near-silent electric propulsion for long-range cruising — in development for a future season.",
    image: "/images/yachts/yacht-my112-concept.webp",
  },
  {
    name: "Wind-Assisted Concept",
    description:
      "Rigid sail propulsion designed to cut fuel burn without cutting comfort.",
    image: "/images/yachts/yacht-ponant-solidsail.avif",
  },
];

export default function InnovationConcepts() {
  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
            <Sparkles size={13} />
            Innovation &amp; What&apos;s Next
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            The Future of Sustainable Sailing
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {INNOVATIONS.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className=""
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-brand-900">{item.name}</h3>
                <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
