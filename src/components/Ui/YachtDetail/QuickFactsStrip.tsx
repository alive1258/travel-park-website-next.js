import type { Yacht } from "@/src/types/yachtType";
import { getQuickFacts } from "./quickFacts";

const QuickFactsStrip = ({ yacht }: { yacht: Yacht }) => (
  <section className="border-b border-brand-900/10 bg-white">
    <div className="container">
      <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {getQuickFacts(yacht).map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon size={18} className="mt-0.5 shrink-0 text-gold-500" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-900/50">
                {label}
              </div>
              <div className="text-sm font-bold text-brand-900">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickFactsStrip;
