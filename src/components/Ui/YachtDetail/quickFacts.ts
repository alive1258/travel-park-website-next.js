import { Anchor, BedDouble, Compass, Ruler, Ship, Users } from "lucide-react";
import type { Yacht } from "@/src/types/yachtType";

export function getQuickFacts(yacht: Yacht) {
  return [
    { icon: Ruler, label: "Length", value: yacht.length },
    { icon: Ship, label: "Built/Refit", value: yacht.builtRefit },
    { icon: Users, label: "Guests", value: String(yacht.guests) },
    { icon: BedDouble, label: "Cabins", value: String(yacht.cabins) },
    { icon: Anchor, label: "Crew", value: String(yacht.crew) },
    {
      icon: Compass,
      label: "Charter Rate",
      value: `From ${yacht.priceFrom}`,
    },
  ];
}
