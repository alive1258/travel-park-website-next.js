import { Quote, Star, User } from "lucide-react";
import { TESTIMONIALS, type LocalTestimonial } from "@/src/utils/data/testimonials";

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: LocalTestimonial;
}) => (
  <div className="w-[220px] shrink-0 rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm sm:w-[300px]">
    <Quote size={22} className="text-brand-200" />

    <p className="mt-4 line-clamp-4 text-sm text-brand-900/70 leading-relaxed">
      &ldquo;{testimonial.description}&rdquo;
    </p>

    <div className="mt-4 flex gap-1 text-gold-500">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </div>

    <div className="mt-4 flex items-center gap-3 border-t border-brand-900/10 pt-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
        <User size={15} />
      </span>
      <div className="text-left">
        <p className="text-sm font-bold text-brand-900">{testimonial.name}</p>
        {testimonial.designation && (
          <p className="text-xs text-brand-900/50">{testimonial.designation}</p>
        )}
      </div>
    </div>
  </div>
);

const MarqueeRow = ({
  testimonials,
  direction,
}: {
  testimonials: LocalTestimonial[];
  direction: "left" | "right";
}) => (
  <div className="testimonial-fade overflow-hidden">
    <div
      className={`flex w-max gap-6 ${
        direction === "left"
          ? "animate-testimonial-left"
          : "animate-testimonial-right"
      }`}
    >
      {[...testimonials, ...testimonials].map((testimonial, i) => (
        <TestimonialCard
          key={`${testimonial.name}-${i}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, mid);
  const row2 = TESTIMONIALS.slice(mid);

  return (
    <section className="overflow-hidden bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Guest Stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            What Our Travellers Are Saying
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <MarqueeRow testimonials={row1} direction="left" />
        {row2.length > 0 && <MarqueeRow testimonials={row2} direction="right" />}
      </div>
    </section>
  );
};

export default TestimonialsSection;
