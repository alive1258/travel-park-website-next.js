"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Clapperboard,
  ChevronDown,
  Compass,
  CreditCard,
  FileText,
  GalleryHorizontal,
  Gem,
  HelpCircle,
  Images,
  Layers,
  LayoutDashboard,
  Leaf,
  MapPin,
  MessageCircle,
  Milestone,
  Newspaper,
  PanelTop,
  PlayCircle,
  Quote,
  ShieldCheck,
  Ship,
  Sparkles,
  Stethoscope,
  Tags,
  UserCircle,
  UserRound,
  Users,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { hasPermission } from "@/src/utils/permissions";
import { MenuActionFlags } from "@/src/types/authType";

interface MenuItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  // Omit to allow any authenticated staff role that reached /dashboard at
  // all. Gates on the *view* permission for this menu key — a UX
  // convenience so nothing dangles to a 403; the backend enforces the same
  // boundary independently regardless of what's shown here.
  menuKey?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hardcoded to mirror frontend/src/app/(dashboardLayout)/dashboard's actual
// routes — no longer fetched from GET /menu/tree, so a new page shows up
// here the moment it's added, without needing a matching row seeded into
// the backend `menus` table first. `menuKey` still has to match the `key`
// column on that table (see backend/src/modules/menu/data/default-menus.ts)
// since that's what RBAC permission checks are keyed on.
const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    menuKey: "dashboard",
  },
  {
    label: "Yacht Fleet",
    href: "/dashboard/yachts/all-yachts",
    icon: Ship,
    menuKey: "yachts",
  },
  {
    // Self-service booking history — visible to any authenticated user,
    // not admin-gated (no menuKey), same treatment as Account below.
    label: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings/all-bookings",
    icon: CalendarDays,
    menuKey: "bookings",
  },
  {
    label: "Payments",
    href: "/dashboard/payments/all-payments",
    icon: CreditCard,
    menuKey: "payments",
  },
  {
    label: "Support Chat",
    href: "/dashboard/support-chat",
    icon: MessageCircle,
    menuKey: "support-chat",
  },
  {
    label: "Video Gallary",
    icon: Video,
    children: [
      {
        label: "Video Gallary Category",
        href: "/dashboard/video-gallary-category/all-video-gallary-categories",
        icon: Tags,
        menuKey: "video-gallery-category",
      },
      {
        label: "Video Gallaries",
        href: "/dashboard/video-gallaries/all-video-gallaries",
        icon: PlayCircle,
        menuKey: "video-gallery",
      },
    ],
  },
  {
    label: "Blog",
    icon: Newspaper,
    children: [
      {
        label: "Blog Category",
        href: "/dashboard/blog/blog-category/all-blog-category",
        icon: Tags,
        menuKey: "blog-category",
      },
      {
        label: "Blog Posts",
        href: "/dashboard/blog/blog-posts/all-blog-posts",
        icon: FileText,
        menuKey: "blog",
      },
      {
        label: "Blog Details",
        href: "/dashboard/blog/blog-details/all-blog-details",
        icon: Layers,
        menuKey: "blog-details",
      },
    ],
  },
  {
    label: "Portfolio Website",
    icon: Newspaper,
    children: [
      {
        label: "Testimonials",
        href: "/dashboard/testimonials/all-testimonials",
        icon: Quote,
        menuKey: "testimonials",
      },
      {
        label: "Client Video Reviews",
        href: "/dashboard/client-video-reviews/all-client-video-reviews",
        icon: Clapperboard,
        menuKey: "client-video-reviews",
      },
      {
        label: "Hero Section",
        href: "/dashboard/hero/all-hero",
        icon: PanelTop,
        menuKey: "hero",
      },
      {
        label: "Sustainability Section",
        href: "/dashboard/sustainability/all-sustainability",
        icon: Leaf,
        menuKey: "sustainability",
      },
      {
        label: "Sustainability Page Intro",
        href: "/dashboard/sustainability-intro/all-sustainability-intro",
        icon: BookOpen,
        menuKey: "sustainability-intro",
      },
      {
        label: "Sustainability Pillars",
        href: "/dashboard/sustainability-pillars/all-sustainability-pillars",
        icon: Leaf,
        menuKey: "sustainability-pillars",
      },
      {
        label: "Sustainability Roadmap",
        href: "/dashboard/sustainability-roadmap/all-sustainability-roadmap",
        icon: Milestone,
        menuKey: "sustainability-roadmap",
      },
      {
        label: "Events & Boat Shows",
        href: "/dashboard/events/all-events",
        icon: CalendarDays,
        menuKey: "events",
      },
      {
        label: "Luxury Charter Portfolio",
        href: "/dashboard/portfolio/all-portfolio",
        icon: Gem,
        menuKey: "portfolio",
      },
      {
        label: "Innovation Concepts",
        href: "/dashboard/innovation-concepts/all-innovation-concepts",
        icon: Sparkles,
        menuKey: "innovation-concepts",
      },
      {
        label: "Life Aboard Photos",
        href: "/dashboard/life-aboard-photos/all-life-aboard-photos",
        icon: Images,
        menuKey: "life-aboard-photos",
      },
      {
        label: "Destinations",
        href: "/dashboard/destinations/all-destinations",
        icon: MapPin,
        menuKey: "destinations",
      },
      {
        label: "Experiences",
        href: "/dashboard/experiences/all-experiences",
        icon: Compass,
        menuKey: "experiences",
      },
      {
        label: "About Section",
        href: "/dashboard/about/all-about",
        icon: UserRound,
        menuKey: "about",
      },
      {
        label: "About Explore Cards",
        href: "/dashboard/about-explore/all-about-explore",
        icon: Compass,
        menuKey: "about-explore",
      },
      {
        label: "About Stats",
        href: "/dashboard/about-stats/all-about-stats",
        icon: BarChart3,
        menuKey: "about-stats",
      },
      {
        label: "About Story",
        href: "/dashboard/about-story/all-about-story",
        icon: BookOpen,
        menuKey: "about-story",
      },
      {
        label: "Our Services",
        href: "/dashboard/services/all-services",
        icon: Stethoscope,
        menuKey: "services",
      },
      {
        label: "Gallery",
        href: "/dashboard/gallery/all-gallery",
        icon: GalleryHorizontal,
        menuKey: "gallery",
      },
      {
        label: "question-answers",
        href: "/dashboard/question-answers/all-question-answers",
        icon: HelpCircle,
        menuKey: "question-answer",
      },
    ],
  },

  {
    label: "Employees",
    href: "/dashboard/employees/all-employees",
    icon: Users,
    menuKey: "employees",
  },
  {
    label: "Roles",
    href: "/dashboard/roles/all-roles",
    icon: ShieldCheck,
    menuKey: "roles",
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: UserCircle,
    menuKey: "account",
  },
];

// Keeps a parent whose own gate passes, or that still has at least one
// visible child after filtering; drops it entirely otherwise.
function filterByPermission(
  items: MenuItem[],
  permissions: Record<string, MenuActionFlags> | null,
): MenuItem[] {
  return items.reduce<MenuItem[]>((visible, item) => {
    const children = item.children
      ? filterByPermission(item.children, permissions)
      : undefined;

    const selfAllowed =
      !item.menuKey || hasPermission(permissions, item.menuKey, "view");

    if (children) {
      if (children.length > 0) visible.push({ ...item, children });
    } else if (selfAllowed) {
      visible.push(item);
    }

    return visible;
  }, []);
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const permissions = useAppSelector((state) => state.auth.permissions);

  // Items/sections the current role can't view simply don't render — a UX
  // convenience, not the security boundary (see filterByPermission above).
  const visibleMenuItems = useMemo(
    () => filterByPermission(MENU_ITEMS, permissions),
    [permissions],
  );

  // Stores explicit user toggle actions (true = opened, false = closed)
  const [userToggles, setUserToggles] = useState<Record<string, boolean>>({});

  const toggleDropdown = (label: string) => {
    setUserToggles((prev) => {
      const item = visibleMenuItems.find((m) => m.label === label);
      const isChildActive = item?.children?.some(
        (child) => child.href === pathname,
      );
      const currentlyOpen = prev[label] ?? isChildActive ?? false;

      // Accordion effect: Close all other dropdowns when opening a new one
      return {
        [label]: !currentlyOpen,
      };
    });
  };

  const isActive = (href?: string) => href === pathname;

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <span className="md:font-bold md:text-xl text-base font-semibold text-emerald-600">
          Yachts Dashboard
        </span>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-md focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleMenuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isChildActive =
            hasChildren && item.children?.some((child) => isActive(child.href));

          // Derive open state: user toggle takes precedence; otherwise auto-open if child active
          const isDropdownOpen =
            userToggles[item.label] ?? isChildActive ?? false;
          const ParentIcon = item.icon;

          if (hasChildren) {
            return (
              <div key={item.label} className="space-y-1">
                {/* Parent Button */}
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.label)}
                  className={`w-full cursor-pointer flex items-center justify-between px-1.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isChildActive
                      ? "bg-gray-100 text-emerald-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ParentIcon && (
                      <ParentIcon className="w-5 h-5 text-gray-500" />
                    )}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Submenu Container with CSS Grid Height Transition */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isDropdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-6 pt-1 space-y-1">
                      {item.children?.map((child) => {
                        const childActive = isActive(child.href);
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href || "#"}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-1.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                              childActive
                                ? "bg-emerald-50 text-emerald-700 font-semibold"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {ChildIcon && (
                              <ChildIcon
                                className={`w-4 h-4 transition-colors ${
                                  childActive
                                    ? "text-emerald-600"
                                    : "text-gray-400"
                                }`}
                              />
                            )}
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Single Link Items
          const singleActive = isActive(item.href);
          return (
            <Link
              key={item.href || item.label}
              href={item.href || "#"}
              onClick={() => {
                setUserToggles({}); // Close all dropdowns when clicking a single menu item
                onClose();
              }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                singleActive
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {ParentIcon && (
                <ParentIcon
                  className={`w-5 h-5 transition-colors ${
                    singleActive ? "text-emerald-600" : "text-gray-500"
                  }`}
                />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
