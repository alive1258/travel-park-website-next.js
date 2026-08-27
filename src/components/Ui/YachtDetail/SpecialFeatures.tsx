import { CheckCircle2 } from "lucide-react";

const SpecialFeatures = ({ features }: { features: string[] }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
      Special Features
    </h2>
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-2.5 text-sm text-brand-900/70"
        >
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default SpecialFeatures;
