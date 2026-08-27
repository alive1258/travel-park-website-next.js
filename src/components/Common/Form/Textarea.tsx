import React from "react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
  label: string;
  text: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<FieldValues>;
  required?: boolean;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  text,
  placeholder,
  register,
  errors,
  required = true,
  rows = 4,
  className = "",
}) => {
  const error = errors?.[text];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={text} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={text}
        rows={rows}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error?.message && (
        <span className="text-xs text-red-500">
          {String(error.message)}
        </span>
      )}
    </div>
  );
};

export default Textarea;
