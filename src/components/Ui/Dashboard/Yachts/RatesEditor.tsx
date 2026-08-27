"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { YachtRateItem } from "@/src/types/yachtAdminType";

interface RatesEditorProps {
  values: YachtRateItem[];
  onChange: (values: YachtRateItem[]) => void;
}

const EMPTY_RATE: YachtRateItem = {
  season: "",
  dateRange: "",
  region: "",
  lowSeason: "",
  highSeason: "",
};

const RatesEditor: React.FC<RatesEditorProps> = ({ values, onChange }) => {
  const [draft, setDraft] = useState<YachtRateItem>(EMPTY_RATE);

  const handleAdd = () => {
    if (
      !draft.season.trim() ||
      !draft.dateRange.trim() ||
      !draft.region.trim() ||
      !draft.lowSeason.trim() ||
      !draft.highSeason.trim()
    ) {
      return;
    }
    onChange([...values, draft]);
    setDraft(EMPTY_RATE);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-700">
        Seasonal Rates (Optional)
      </label>

      {values.length > 0 && (
        <div className="space-y-2">
          {values.map((rate, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                <span className="font-medium text-gray-800">{rate.season}</span>
                <span className="text-gray-600">{rate.dateRange}</span>
                <span className="text-gray-600">{rate.region}</span>
                <span className="text-gray-600">{rate.lowSeason}</span>
                <span className="text-gray-600">{rate.highSeason}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <input
          type="text"
          value={draft.season}
          onChange={(e) => setDraft({ ...draft, season: e.target.value })}
          placeholder="Season"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={draft.dateRange}
          onChange={(e) => setDraft({ ...draft, dateRange: e.target.value })}
          placeholder="Date Range"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={draft.region}
          onChange={(e) => setDraft({ ...draft, region: e.target.value })}
          placeholder="Region"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={draft.lowSeason}
          onChange={(e) => setDraft({ ...draft, lowSeason: e.target.value })}
          placeholder="Low Season Rate"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={draft.highSeason}
          onChange={(e) => setDraft({ ...draft, highSeason: e.target.value })}
          placeholder="High Season Rate"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="flex w-full sm:w-auto items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Plus size={16} />
        Add Rate
      </button>
    </div>
  );
};

export default RatesEditor;
