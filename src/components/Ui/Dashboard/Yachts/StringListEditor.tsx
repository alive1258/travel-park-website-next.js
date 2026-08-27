"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface StringListEditorProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}

const StringListEditor: React.FC<StringListEditorProps> = ({
  label,
  values,
  onChange,
  placeholder = "Add an item...",
  required = false,
  multiline = false,
}) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const value = input.trim();
    if (!value) return;
    onChange([...values, value]);
    setInput("");
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {values.length > 0 && (
        <div className="space-y-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <p className="flex-1 text-sm text-gray-700">{value}</p>
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
        {multiline ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        )}
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

export default StringListEditor;
