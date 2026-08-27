const ROADMAP = [
  {
    year: "2024",
    milestone:
      "Completed hybrid-electric refits across the first eight yachts in the fleet.",
  },
  {
    year: "2025",
    milestone:
      "Eliminated single-use plastics fleet-wide and launched onboard water-treatment systems.",
  },
  {
    year: "2026",
    milestone:
      "Extending eco-certification to all shoreside provisioning and excursion partners.",
  },
  {
    year: "2028",
    milestone:
      "Target: 50% reduction in average fleet fuel consumption versus our 2020 baseline.",
  },
  {
    year: "2030",
    milestone:
      "Target: fully hybrid-electric fleet, with pilot electric-only vessels for short-range charters.",
  },
];

export default function SustainabilityRoadmap() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
          Our Roadmap
        </h2>
        <div className="mt-8 space-y-0 divide-y divide-brand-900/10 border-y border-brand-900/10">
          {ROADMAP.map((item) => (
            <div
              key={item.year}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <span className="text-lg font-bold text-gold-500 sm:w-20 shrink-0">
                {item.year}
              </span>
              <p className="text-brand-900/70 leading-relaxed">
                {item.milestone}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-brand-900/50">
          Targets reflect current fleet planning and are reviewed annually as
          technology and partnerships evolve.
        </p>
      </div>
    </section>
  );
}
