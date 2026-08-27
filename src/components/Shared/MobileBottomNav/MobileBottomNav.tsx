"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";

type NavEntry =
  | {
      type: "link";
      key: string;
      label: string;
      href: string;
      icon: (active: boolean) => React.JSX.Element;
    }
  | {
      type: "button";
      key: string;
      label: string;
      icon: (active: boolean) => React.JSX.Element;
    };

const NAV_LINKS: NavEntry[] = [
  {
    type: "link",
    key: "home",
    label: "Home",
    href: "/",
    icon: (active) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke={active ? "#ffffff" : "#a1a1aa"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9a1 1 0 0 0 1 1h4v-5h2v5h4a1 1 0 0 0 1-1v-9" />
      </svg>
    ),
  },
  {
    type: "link",
    key: "yachts",
    label: "Yachts",
    href: "/yachts",
    icon: (active) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke={active ? "#ffffff" : "#a1a1aa"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 16h16l-2 3H6l-2-3Z" />
        <path d="M12 4v10M12 4l4 6h-8" />
      </svg>
    ),
  },
  {
    type: "link",
    key: "destinations",
    label: "Destinations",
    href: "/destinations",
    icon: (active) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke={active ? "#ffffff" : "#a1a1aa"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.2" />
      </svg>
    ),
  },
  {
    type: "button",
    key: "menu",
    label: "Menu",
    icon: (active) =>
      active ? (
        <X className="h-6 w-6" stroke="#ffffff" strokeWidth={1.6} />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="#a1a1aa"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      ),
  },
];

interface MobileBottomNavProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  unreadChatCount?: number;
}

const MobileBottomNav = ({
  isChatOpen,
  onToggleChat,
  isMenuOpen,
  onToggleMenu,
  unreadChatCount = 0,
}: MobileBottomNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-96 block lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="relative mx-auto max-w-md">
        {/* Floating chat bubble button */}
        <button
          type="button"
          onClick={onToggleChat}
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
          aria-expanded={isChatOpen}
          className="absolute  left-1/2 -top-6 z-50 flex h-14 w-14 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-accent-500 text-white shadow-xl transition hover:scale-105 hover:bg-accent-600 ring- ring-white  hover:brightness-110"
        >
          {isChatOpen ? (
            <X className="text-white" size={22} fill="none" />
          ) : (
            <>
              <MessageCircle size={22} className="text-white" fill="none" />
              {unreadChatCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-neutral-900">
                  {unreadChatCount > 9 ? "9+" : unreadChatCount}
                </span>
              )}
            </>
          )}
        </button>

        <div
          className="relative flex items-center justify-around rounded-t-3xl border-t-2 border-lime-400/60 bg-neutral-900/95 px-2 pb-2.5 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.35)] backdrop-blur"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 50% 3%, transparent 33px, black 35px)",
            maskImage:
              "radial-gradient(circle at 50% 3%, transparent 33px, black 35px)",
          }}
        >
          {NAV_LINKS.map((entry, idx) => {
            const isActive =
              entry.type === "link"
                ? entry.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(entry.href)
                : isMenuOpen;
            const isCenterGap = idx === Math.floor(NAV_LINKS.length / 2);

            const content = (
              <>
                {entry.icon(isActive)}
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {entry.label}
                </span>
              </>
            );

            return (
              <div key={entry.key} className="flex items-center">
                {isCenterGap && (
                  <div className="w-10 shrink-0" aria-hidden="true" />
                )}
                {entry.type === "link" ? (
                  <Link
                    href={entry.href}
                    className="flex flex-col items-center gap-1 px-3 py-1"
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onToggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    className="flex flex-col items-center gap-1 px-3 py-1"
                  >
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
