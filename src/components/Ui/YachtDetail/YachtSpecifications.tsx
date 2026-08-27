import type { ReactNode } from "react";
import type { YachtSpecifications as YachtSpecificationsType } from "@/src/types/yachtType";

function SpecGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900/50">
        {title}
      </h3>
      <div className="mt-3 divide-y divide-brand-900/10 border-t border-brand-900/10">
        {children}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="text-brand-900/60">{label}</span>
      <span className="text-right font-semibold text-brand-900">{value}</span>
    </div>
  );
}

const YachtSpecifications = ({
  specifications,
}: {
  specifications: YachtSpecificationsType;
}) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
      Specifications
    </h2>

    <div className="mt-5 grid gap-8 sm:grid-cols-2">
      <SpecGroup title="Accommodation">
        <SpecRow
          label="Guests"
          value={`${specifications.accommodation.guestsCruising} cruising & ${specifications.accommodation.guestsSleeping} sleeping`}
        />
        <SpecRow
          label="Staterooms"
          value={String(specifications.accommodation.staterooms)}
        />
        <SpecRow
          label="Cabin Configuration"
          value={specifications.accommodation.cabinConfig
            .map((c) => `${c.type} (${c.count})`)
            .join(", ")}
        />
        <SpecRow
          label="Crew"
          value={String(specifications.accommodation.crew)}
        />
      </SpecGroup>

      <SpecGroup title="Construction & Design">
        <SpecRow
          label="Built/Refit"
          value={`${specifications.construction.builtYear}/${specifications.construction.refitYear}`}
        />
        <SpecRow label="Builder" value={specifications.construction.builder} />
        <SpecRow
          label="Hull Material"
          value={specifications.construction.hullMaterial}
        />
        <SpecRow
          label="Exterior Designer"
          value={specifications.construction.exteriorDesigner}
        />
        <SpecRow
          label="Interior Designer"
          value={specifications.construction.interiorDesigner}
        />
      </SpecGroup>

      <SpecGroup title="Dimensions & Volume">
        <SpecRow label="Length" value={specifications.dimensions.length} />
        <SpecRow label="Beam" value={specifications.dimensions.beam} />
        <SpecRow label="Draft" value={specifications.dimensions.draft} />
        <SpecRow
          label="Gross Tonnage"
          value={specifications.dimensions.grossTonnage}
        />
      </SpecGroup>

      <SpecGroup title="Performance & Engines">
        <SpecRow
          label="Cruising Speed"
          value={specifications.performance.cruisingSpeed}
        />
        <SpecRow
          label="Max Speed"
          value={specifications.performance.maxSpeed}
        />
        <SpecRow label="Range" value={specifications.performance.range} />
        <SpecRow label="Engines" value={specifications.performance.engines} />
        <SpecRow
          label="Generators"
          value={specifications.performance.generators}
        />
      </SpecGroup>

      <SpecGroup title="Classification & Flag State">
        <SpecRow
          label="Classification"
          value={specifications.classification.classification}
        />
        <SpecRow label="Flag" value={specifications.classification.flag} />
      </SpecGroup>

      <SpecGroup title="Features">
        <div className="flex flex-wrap gap-2 pt-1">
          {specifications.amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
            >
              {amenity}
            </span>
          ))}
        </div>
      </SpecGroup>
    </div>
  </div>
);

export default YachtSpecifications;
