"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, CheckCheck, CheckCircle2, Inbox, RotateCcw, Send } from "lucide-react";
import {
  useGetConversationMessagesQuery,
  useGetConversationsQuery,
  useUpdateConversationStatusMutation,
} from "@/src/redux/api/chatApi";
import { useChatSocket } from "@/src/hooks/useChatSocket";
import type {
  ChatConversation,
  ChatConversationStatus,
  ChatMessage,
} from "@/src/types/chatType";
import Pagination from "@/src/utils/Pagination";

const LIST_LIMIT = 20;
const LIST_POLL_MS = 15000;

function formatRelativeTime(iso?: string): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function customerLabel(conversation: ChatConversation): string {
  return conversation.customer?.name || conversation.customer?.email || "Customer";
}

function senderLabel(message: ChatMessage, conversation: ChatConversation | null): string {
  if (message.sender_role === "customer") {
    return conversation ? customerLabel(conversation) : "Customer";
  }
  return message.sender?.name || message.sender?.email?.split("@")[0] || "Support Agent";
}

const initialOf = (label: string) => label.trim().charAt(0).toUpperCase() || "?";

const SupportChatInbox: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ChatConversationStatus>("open");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: listRes,
    isLoading: isListLoading,
    isFetching: isListFetching,
    refetch: refetchConversations,
  } = useGetConversationsQuery(
    { page, limit: LIST_LIMIT, status: statusFilter },
    { pollingInterval: LIST_POLL_MS },
  );
  const conversations = listRes?.data ?? [];
  const totalPages = listRes?.meta?.totalPages ?? 1;
  const totalResults = listRes?.meta?.total ?? 0;

  // Land on the most recent thread by default — a direct render-time state
  // adjustment (not an effect), since it only ever fires once the list
  // first arrives and settles immediately after.
  if (!selectedId && conversations.length > 0) {
    setSelectedId(conversations[0].id);
  }

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null;

  const { data: messagesRes, isLoading: isMessagesLoading } =
    useGetConversationMessagesQuery(
      { id: selectedId ?? "", params: { limit: 50 } },
      { skip: !selectedId },
    );
  const initialMessages = useMemo(
    () => (messagesRes ? [...messagesRes.data].reverse() : undefined),
    [messagesRes],
  );

  const chat = useChatSocket({
    // Connect as soon as the inbox is open, not only once a thread is
    // selected — otherwise the very first conversation of the day (or any
    // new one arriving while nothing is selected) never shows up live.
    enabled: true,
    role: "staff",
    conversationId: selectedId ?? undefined,
    isActive: true,
    initialMessages,
    onConversationEvent: refetchConversations,
  });

  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateConversationStatusMutation();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [chat.messages.length, chat.otherPartyTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    chat.sendMessage(draft);
    setDraft("");
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setDraft("");
  };

  const handleToggleStatus = () => {
    if (!selectedConversation) return;
    const nextStatus: ChatConversationStatus =
      selectedConversation.status === "open" ? "closed" : "open";
    updateStatus({ id: selectedConversation.id, status: nextStatus });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* CONVERSATION LIST */}
      <div className="flex w-full max-w-xs shrink-0 flex-col border-r border-gray-100">
        <div className="flex items-center gap-2 border-b border-gray-100 p-4">
          {(["open", "closed"] as ChatConversationStatus[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatusFilter(tab);
                setPage(1);
                setSelectedId(null);
              }}
              className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                statusFilter === tab
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {isListLoading ? (
            <div className="space-y-2 p-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-50" />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
              <Inbox size={26} className="text-gray-300" />
              <p className="text-sm font-bold text-gray-700">No {statusFilter} threads</p>
            </div>
          ) : (
            conversations.map((conversation) => {
              const isSelected = conversation.id === selectedId;
              const hasUnread = conversation.staff_unread_count > 0;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => handleSelect(conversation.id)}
                  className={`flex w-full flex-col gap-0.5 border-b border-gray-50 px-4 py-3 text-left transition ${
                    isSelected ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-gray-900">
                      {customerLabel(conversation)}
                    </span>
                    <span className="shrink-0 text-[11px] text-gray-400">
                      {formatRelativeTime(conversation.last_message_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-gray-500">
                      {conversation.last_message_preview || "No messages yet"}
                    </span>
                    {hasUnread && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-bold text-white">
                        {conversation.staff_unread_count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="border-t border-gray-100 p-2">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalResults={totalResults}
            limit={LIST_LIMIT}
            isFetching={isListFetching}
          />
        </div>
      </div>

      {/* THREAD */}
      <div className="flex flex-1 flex-col">
        {!selectedConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Inbox size={32} className="text-gray-300" />
            <p className="text-sm font-bold text-gray-700">Select a conversation</p>
            <p className="text-xs text-gray-500">
              Pick a thread from the list to read and reply.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {customerLabel(selectedConversation)}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedConversation.customer?.email}
                  {chat.connected ? " · Live" : " · Connecting…"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleStatus}
                disabled={isUpdatingStatus}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                  selectedConversation.status === "open"
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {selectedConversation.status === "open" ? (
                  <>
                    <CheckCircle2 size={14} /> Mark resolved
                  </>
                ) : (
                  <>
                    <RotateCcw size={14} /> Reopen
                  </>
                )}
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-1.5 overflow-y-auto px-5 py-4"
              style={{
                backgroundColor: "#f0f2f5",
                backgroundImage:
                  "radial-gradient(circle, rgba(15,45,35,0.05) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              {isMessagesLoading ? (
                <div className="space-y-2.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-2/3 animate-pulse rounded-2xl bg-gray-100" />
                  ))}
                </div>
              ) : (
                chat.messages.map((message, index) => {
                  const isMine = message.sender_role === "staff";
                  const prev = chat.messages[index - 1];
                  // Group only when the exact same person (not just the same
                  // side) sent the previous message — a shared inbox can
                  // have several staff replying in one thread.
                  const isGrouped = prev && prev.sender_id === message.sender_id;
                  const name = senderLabel(message, selectedConversation);

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
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-500 text-[11px] font-bold text-white">
                            {initialOf(name)}
                          </div>
                        ))}

                      <div
                        className={`flex max-w-[70%] flex-col ${
                          isMine ? "items-end" : "items-start"
                        }`}
                      >
                        {!isGrouped && (
                          <span
                            className={`mb-0.5 text-[11px] font-semibold text-gray-500 ${
                              isMine ? "mr-1" : "ml-1"
                            }`}
                          >
                            {name}
                          </span>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                            isMine
                              ? "rounded-br-sm bg-emerald-600 text-white"
                              : "rounded-bl-sm bg-white text-gray-900"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">{message.body}</p>
                          <p
                            className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                              isMine ? "text-white/60" : "text-gray-400"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
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
              {chat.otherPartyTyping && (
                <div className="mt-3 flex items-end justify-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-500 text-[11px] font-bold text-white">
                    {selectedConversation ? initialOf(customerLabel(selectedConversation)) : "?"}
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-gray-100 p-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  chat.notifyTyping();
                }}
                placeholder="Type a reply…"
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send reply"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SupportChatInbox;
