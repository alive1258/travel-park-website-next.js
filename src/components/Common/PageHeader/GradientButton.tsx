import React from "react";
import type { LucideIcon } from "lucide-react";

interface GradientButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  icon?: LucideIcon;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  type = "button",
  icon: Icon,
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {Icon && <Icon size={18} />}
      {text}
    </button>
  );
};

export default GradientButton;
