import {
  FileText,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LucideIcon,
  Newspaper,
  PanelTop,
  PlayCircle,
  Quote,
  ShieldCheck,
  Tags,
  UserCircle,
  Users,
  Video,
} from "lucide-react";

// Maps the `icon` string stored on each backend menu row to its Lucide
// component. Keep in sync with backend/src/modules/menu/data/default-menus.ts.
export const menuIconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Tags,
  Video,
  PlayCircle,
  Newspaper,
  FileText,
  Layers,
  Quote,
  HelpCircle,
  Users,
  ShieldCheck,
  UserCircle,
  PanelTop,
};

export const resolveMenuIcon = (icon?: string): LucideIcon | undefined =>
  icon ? menuIconMap[icon] : undefined;
