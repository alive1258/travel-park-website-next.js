import {
  Anchor,
  Award,
  Compass,
  Globe,
  Leaf,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const HERO_ICON_MAP: Record<string, LucideIcon> = {
  Anchor,
  Award,
  Compass,
  Globe,
  Leaf,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Waves,
};

export const HERO_ICON_FALLBACK: LucideIcon = Star;

export const getHeroIcon = (icon?: string): LucideIcon =>
  (icon && HERO_ICON_MAP[icon]) || HERO_ICON_FALLBACK;
