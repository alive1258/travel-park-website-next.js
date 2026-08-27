"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCheck, Lock, MessageCircle, Send, X } from "lucide-react";
import type { ChatMessage } from "@/src/types/chatType";

interface MessageWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isLoggedIn: boolean;
  isHistoryLoading: boolean;
  messages: ChatMessage[];
  connected: boolean;
  otherPartyTyping: boolean;
  unreadCount: number;
  onSend: (body: string) => void;
  onTyping: () => void;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

const STAFF_FALLBACK_NAME = "Eco Yachts Support";

const staffDisplayName = (message: ChatMessage) =>
  message.sender?.name || message.sender?.email?.split("@")[0] || STAFF_FALLBACK_NAME;

const initialOf = (label: string) => label.trim().charAt(0).toUpperCase() || "?";

const MessageWidget = ({
  isOpen,
  onToggle,
  onClose,
  isLoggedIn,
  isHistoryLoading,
  messages,
  connected,
  otherPartyTyping,
  unreadCount,
  onSend,
  onTyping,
}: MessageWidgetProps) => {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [isOpen, messages.length, otherPartyTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };

  const goToLogin = () => {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    onClose();
    router.push("/login");
  };

  return (
    <>
      {/* PANEL */}
      <div
        className={`fixed bottom-24 right-4 z-90 flex w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition duration-200 sm:right-6 ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
        style={{ maxHeight: "min(32rem, calc(100vh - 8rem))" }}
      >
        <div className="flex items-start justify-between gap-3 bg-brand-900 p-5">
          <div>
            <p className="font-bold text-white">Chat with Eco Yachts</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-100/70">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  connected ? "bg-emerald-400" : "bg-white/30"
                }`}
              />
              {isLoggedIn
                ? connected
                  ? "We typically reply within a few hours."
                  : "Connecting…"
                : "Sign in to start a conversation."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close message panel"
            className="flex cursor-pointer h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-2.5 px-5 py-10 text-center">
            <Lock size={28} className="text-brand-600" />
            <p className="text-sm font-bold text-brand-900">Log In to Chat</p>
            <p className="text-xs text-brand-900/60">
              Sign in so our team can reply to you directly.
            </p>
            <button
              type="button"
              onClick={goToLogin}
              className="mt-2 rounded-lg bg-accent-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent-600"
            >
              Log In / Sign Up
            </button>
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              className="flex-1 space-y-1.5 overflow-y-auto px-4 py-4"
              style={{
                minHeight: "16rem",
                backgroundColor: "#eaf2ed",
                backgroundImage:
                  "radial-gradient(circle, rgba(15,45,35,0.05) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              {isHistoryLoading ? (
                <div className="space-y-2.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-2/3 animate-pulse rounded-2xl bg-brand-50"
                    />
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <p className="pt-8 text-center text-xs text-brand-900/50">
                  Say hello — a member of our team will get back to you shortly.
                </p>
              ) : (
                messages.map((message, index) => {
                  const isMine = message.sender_role === "customer";
                  const prev = messages[index - 1];
                  const isGrouped = prev && prev.sender_role === message.sender_role;
                  const name = isMine ? null : staffDisplayName(message);

                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 ${
                        isMine ? "justify-end" : "justify-start"
                      } ${isGrouped ? "" : "mt-3"}`}
                    >
                      {!isMine &&
                        (isGrouped ? (
                          <div className="w-7 shrink-0" />
                        ) : (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                            {initialOf(name!)}
                          </div>
                        ))}

                      <div
                        className={`flex max-w-[76%] flex-col ${
                          isMine ? "items-end" : "items-start"
                        }`}
                      >
                        {!isMine && !isGrouped && (
                          <span className="mb-0.5 ml-1 text-[11px] font-semibold text-brand-700">
                            {name}
                          </span>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                            isMine
                              ? "rounded-br-sm bg-brand-600 text-white"
                              : "rounded-bl-sm bg-white text-brand-900"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">{message.body}</p>
                          <p
                            className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                              isMine ? "text-white/60" : "text-brand-900/40"
                            }`}
                          >
                            {formatTime(message.created_at)}
                            {isMine &&
                              (message.read_at ? (
                                <CheckCheck size={13} className="text-sky-300" />
                              ) : (
                                <Check size={13} />
                              ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {otherPartyTyping && (
                <div className="mt-3 flex items-end justify-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                    {initialOf(STAFF_FALLBACK_NAME)}
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-900/40 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-900/40 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-900/40" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-brand-900/10 p-3"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  onTyping();
                }}
                placeholder="Type a message…"
                className="flex-1 rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </>
        )}
      </div>

      {/* LAUNCHER BUTTON — desktop/tablet only; the mobile bottom nav's
          center chat bubble controls this same panel on small screens */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close message panel" : "Open message panel"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-90 hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent-500 text-white shadow-xl transition hover:scale-105 hover:bg-accent-600 lg:flex"
      >
        {isOpen ? (
          <X className="text-red-600" size={22} />
        ) : (
          <>
            <MessageCircle size={22} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </>
        )}
      </button>
    </>
  );
};

export default MessageWidget;
