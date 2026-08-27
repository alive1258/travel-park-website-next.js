const STATS = [
  { value: "12+", label: "Years Chartering" },
  { value: "16", label: "Yachts in Fleet" },
  { value: "24", label: "Destinations Served" },
  { value: "98%", label: "Guest Return Rate" },
];

export default function AboutStats() {
  return (
    <section className="bg-brand-900 py-14">
      <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gold-400">
              {stat.value}
            </div>
            <div className="mt-2 text-xs sm:text-sm uppercase tracking-wide text-brand-100/70">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
