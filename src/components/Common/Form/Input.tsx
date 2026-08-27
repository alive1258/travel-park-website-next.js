import React from "react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  text: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<FieldValues>;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  text,
  type = "text",
  placeholder,
  register,
  errors,
  required = true,
  readOnly = false,
  disabled = false,
  className = "",
}) => {
  const error = errors?.[text];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={text} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={text}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        {...register}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent ${
          error ? "border-red-400" : "border-gray-300"
        } ${readOnly || disabled ? "bg-gray-50 text-gray-500" : "bg-white"}`}
      />
      {error?.message && (
        <span className="text-xs text-red-500">
          {String(error.message)}
        </span>
      )}
    </div>
  );
};

export default Input;
