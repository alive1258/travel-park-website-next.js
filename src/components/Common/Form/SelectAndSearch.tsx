"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

export interface SelectOption {
  id: string;
  name: string;
}

interface SelectAndSearchProps<T extends FieldValues> {
  label: string;
  options: SelectOption[];
  name: Path<T>;
  value?: string;
  setValue: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function SelectAndSearch<T extends FieldValues>({
  label,
  options,
  name,
  value,
  setValue,
  errors,
  placeholder = "Search...",
  required = true,
  disabled = false,
  className = "",
}: SelectAndSearchProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((option) => option.id === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const term = search.trim().toLowerCase();
    return options.filter((option) => option.name.toLowerCase().includes(term));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const error = errors?.[name as unknown as string];

  const handleSelect = (option: SelectOption) => {
    setValue(name, option.id as never, { shouldValidate: true });
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, "" as never, { shouldValidate: true });
    setSearch("");
  };

  return (
    <div className={`flex flex-col gap-1 relative ${className}`} ref={containerRef}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm text-left outline-none transition focus:ring-2 focus:ring-emerald-600 ${
          error ? "border-red-400" : "border-gray-300"
        } ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white cursor-pointer"}`}
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.name : placeholder}
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {selected && !disabled && (
            <X
              size={14}
              className="text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute z-20 top-full mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-3.5 py-2 text-sm hover:bg-emerald-50 transition ${
                    option.id === value
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {option.name}
                </button>
              ))
            ) : (
              <div className="px-3.5 py-3 text-sm text-gray-400">
                No results found.
              </div>
            )}
          </div>
        </div>
      )}

      {error?.message && (
        <span className="text-xs text-red-500">
          {String(error.message)}
        </span>
      )}
    </div>
  );
}

export default SelectAndSearch;
