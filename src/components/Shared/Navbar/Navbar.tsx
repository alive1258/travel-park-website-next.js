"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ChevronDown,
  Globe,
  Phone,
  Search,
  X,
} from "lucide-react";
import Logo from "../Logo/Logo";
import MessageWidget from "../MessageWidget/MessageWidget";
import MobileBottomNav from "../MobileBottomNav/MobileBottomNav";
import MobileMenuSheet from "../MobileMenuSheet/MobileMenuSheet";
import { useAppSelector } from "@/src/redux/hooks";
import { useChatSocket } from "@/src/hooks/useChatSocket";
import { useGetMyMessagesQuery } from "@/src/redux/api/chatApi";
import { useSignOutMutation, authApi } from "@/src/redux/api/authApi";
import { logout } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { CONTACT_PHONE, MENU_ITEMS } from "./menuItems";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();

  const { data: myMessagesRes, isLoading: isMessagesLoading } = useGetMyMessagesQuery(
    undefined,
    { skip: !user },
  );
  const chat = useChatSocket({
    enabled: Boolean(user),
    role: "customer",
    isActive: isChatOpen,
    initialMessages: myMessagesRes?.data,
  });

  /* close any open desktop dropdown / mobile drawer / chat panel whenever
   * the route changes */
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsOpen(false);
    setIsChatOpen(false);
  }

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* stop body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      toast.success("Successfully logged out!", { theme: "dark" });
      router.push("/");
    } catch {
      toast.error("Sign out failed. Please try again.", { theme: "dark" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    setIsSearchOpen(false);
    router.push(query ? `/destinations?q=${encodeURIComponent(query)}` : "/destinations");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        {/* TOP UTILITY BAR */}
        <div className="hidden lg:block bg-brand-900 text-white/80">
          <div className="container flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={13} className="text-brand-300" />
                Call Anytime {CONTACT_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-white/70">
                <Globe size={13} className="text-brand-300" />
                English
                <ChevronDown size={12} />
              </span>
              {user ? (
                <>
                  <Link href="/my-bookings" className="hover:text-white transition">
                    My Bookings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="hover:text-white transition disabled:opacity-50"
                  >
                    {isLoggingOut ? "Signing out..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-white transition">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-accent-500 text-white px-3.5 py-1 rounded-full font-semibold hover:bg-accent-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div
          className={`md:bg-transparent transition lg:border-b lg:border-brand-900/10 lg:bg-white ${
            isScrolled ? "lg:shadow-sm" : ""
          }`}
        >
          <div className="container flex items-center justify-between h-16">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hidden lg:block"
            >
              <Logo variant="dark" />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex gap-7">
              {MENU_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600"
                          : "text-brand-900 hover:text-brand-600"
                      }`}
                    >
                      {item.display}
                    </Link>
                  );
                }

                const isDropdownOpen = openDropdown === item.href;

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => setOpenDropdown(item.href)}
                      className={`flex items-center gap-1 text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600"
                          : "text-brand-900 hover:text-brand-600"
                      }`}
                    >
                      {item.display}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <div
                      className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition duration-200 ${
                        isDropdownOpen
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-xl border border-brand-900/10 bg-white py-2 shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            onFocus={() => setOpenDropdown(item.href)}
                            className="block px-4 py-2.5 text-sm text-brand-900/80 transition hover:bg-brand-50 hover:text-brand-700"
                          >
                            {child.display}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 rounded-full border border-brand-900/10 bg-brand-50/60 pl-4 pr-1.5 py-1.5"
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-48 bg-transparent text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white hover:bg-accent-600 transition"
                  >
                    <Search size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Close search"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-brand-900/50 hover:bg-brand-100 transition"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50 transition"
                >
                  <Search size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenuSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        openSubmenu={openSubmenu}
        onToggleSubmenu={(href) =>
          setOpenSubmenu((prev) => (prev === href ? null : href))
        }
      />

      {/* spacer — reserved only at lg+, where the navbar is solid white;
          on mobile the header is transparent and floats over the hero */}
      <div className="hidden lg:block lg:h-[100px]" />

      <MessageWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onClose={() => setIsChatOpen(false)}
        isLoggedIn={Boolean(user)}
        isHistoryLoading={isMessagesLoading}
        messages={chat.messages}
        connected={chat.connected}
        otherPartyTyping={chat.otherPartyTyping}
        unreadCount={chat.unreadCount}
        onSend={chat.sendMessage}
        onTyping={chat.notifyTyping}
      />
      <MobileBottomNav
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        isMenuOpen={isOpen}
        onToggleMenu={() => setIsOpen((prev) => !prev)}
        unreadChatCount={chat.unreadCount}
      />
    </>
  );
};

export default Navbar;
