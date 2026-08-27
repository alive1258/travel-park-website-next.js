"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { YachtCabinConfigItem } from "@/src/types/yachtAdminType";

interface CabinConfigEditorProps {
  values: YachtCabinConfigItem[];
  onChange: (values: YachtCabinConfigItem[]) => void;
}

const CabinConfigEditor: React.FC<CabinConfigEditorProps> = ({
  values,
  onChange,
}) => {
  const [type, setType] = useState("");
  const [count, setCount] = useState("");

  const handleAdd = () => {
    const parsedCount = Number(count);
    if (!type.trim() || !count || isNaN(parsedCount)) return;
    onChange([...values, { type: type.trim(), count: parsedCount }]);
    setType("");
    setCount("");
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-700">
        Cabin Configuration
        <span className="text-red-500 ml-0.5">*</span>
      </label>

      {values.length > 0 && (
        <div className="space-y-2">
          {values.map((item, index) => (
            <div
              key={`${item.type}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex-1 min-w-0 grid grid-cols-2 gap-2 text-sm">
                <span className="font-medium text-gray-800">{item.type}</span>
                <span className="text-gray-600">{item.count} cabins</span>
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

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type (e.g. Double)"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Count"
          className="w-full sm:w-28 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

export default CabinConfigEditor;
