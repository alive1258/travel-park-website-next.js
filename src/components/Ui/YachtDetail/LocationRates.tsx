import type { YachtRate } from "@/src/types/yachtType";

const LocationRates = ({ rates }: { rates: YachtRate[] }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
      Location &amp; Charter Rate
    </h2>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {rates.map((rate) => (
        <div
          key={rate.season}
          className="rounded-2xl border border-brand-900/10 p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-brand-900">{rate.season}</h3>
            <span className="text-xs font-semibold text-brand-900/50">
              {rate.dateRange}
            </span>
          </div>
          <p className="mt-1 text-sm text-brand-900/60">{rate.region}</p>
          <div className="mt-4 space-y-2 border-t border-brand-900/10 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-brand-900/60">Low Season</span>
              <span className="font-bold text-brand-900">
                {rate.lowSeason}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-brand-900/60">High Season</span>
              <span className="font-bold text-brand-900">
                {rate.highSeason}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LocationRates;
