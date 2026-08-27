import {
  Droplets,
  HeartHandshake,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  Sun,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const SUSTAINABILITY_ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  HeartHandshake,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  Sun,
  Waves,
  Wind,
  Zap,
};

export const SUSTAINABILITY_ICON_FALLBACK: LucideIcon = Leaf;

export const getSustainabilityIcon = (icon?: string): LucideIcon =>
  (icon && SUSTAINABILITY_ICON_MAP[icon]) || SUSTAINABILITY_ICON_FALLBACK;
