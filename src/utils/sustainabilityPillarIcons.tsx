import {
  Anchor,
  BatteryCharging,
  Droplets,
  Fish,
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
import type { SustainabilityPillarIcon } from "@/src/types/sustainabilityPillarType";

export const SUSTAINABILITY_PILLAR_ICON_MAP: Record<
  SustainabilityPillarIcon,
  LucideIcon
> = {
  BatteryCharging,
  Fish,
  Recycle,
  Sprout,
  Leaf,
  Droplets,
  Zap,
  Waves,
  Sun,
  Wind,
  Anchor,
  ShieldCheck,
};
