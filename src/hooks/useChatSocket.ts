"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type { ChatMessage, ChatSenderRole } from "@/src/types/chatType";

// The API base already ends in /api/v1 — Socket.IO connects to the bare
// origin and reaches the gateway via its own namespace path instead.
const SOCKET_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "").replace(
  /\/api\/v1\/?$/,
  "",
);

const TYPING_IDLE_MS = 3000;

interface TypingPayload {
  conversationId: string;
  role: ChatSenderRole;
  isTyping: boolean;
}

interface UseChatSocketOptions {
  /** Connect only once we know we should — e.g. the user is logged in, or staff is on the inbox page. */
  enabled: boolean;
  role: ChatSenderRole;
  /** Required for staff (which thread); ignored for customers (server resolves their own). */
  conversationId?: string;
  /** Whether this thread is currently in view — gates live unread counting/read receipts. */
  isActive: boolean;
  /** Seeds the thread from REST history once it loads. Only applied while the socket has delivered nothing yet for this conversation. */
  initialMessages?: ChatMessage[];
  /** Staff inbox only — fires whenever any conversation's last message changes, so the list can refetch. */
  onConversationEvent?: () => void;
}

interface UseChatSocketResult {
  connected: boolean;
  messages: ChatMessage[];
  sendMessage: (body: string) => void;
  notifyTyping: () => void;
  otherPartyTyping: boolean;
  unreadCount: number;
}

export function useChatSocket({
  enabled,
  role,
  conversationId,
  isActive,
  initialMessages,
  onConversationEvent,
}: UseChatSocketOptions): UseChatSocketResult {
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);
  const hasLiveMessageRef = useRef(false);
  const isActiveRef = useRef(isActive);
  const conversationIdRef = useRef(conversationId);
  const prevConversationIdRef = useRef(conversationId);
  const onConversationEventRef = useRef(onConversationEvent);

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [otherPartyTyping, setOtherPartyTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    onConversationEventRef.current = onConversationEvent;
  }, [onConversationEvent]);

  // Hydrate from REST history once, before any live message has arrived for
  // the currently open thread — avoids clobbering messages the socket
  // already delivered while the history request was still in flight.
  useEffect(() => {
    if (initialMessages && !hasLiveMessageRef.current) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const markReadIfActive = useCallback(
    (socket: Socket, targetConversationId: string | undefined) => {
      if (!isActiveRef.current) return;
      socket.emit("conversation:read", { conversationId: targetConversationId });
      setUnreadCount(0);
    },
    [],
  );

  // The connection itself is independent of which conversation is
  // selected — a staff socket must connect (and join the shared 'staff'
  // room) the moment the inbox opens, not only after a thread is picked,
  // otherwise the very first conversation of the day never shows up live.
  useEffect(() => {
    if (!enabled) return;

    const socket = io(`${SOCKET_ORIGIN}/chat`, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      if (role === "staff" && conversationIdRef.current) {
        socket.emit("conversation:join", { conversationId: conversationIdRef.current });
      }
      markReadIfActive(socket, conversationIdRef.current);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("message:new", (message: ChatMessage) => {
      const activeId = conversationIdRef.current;
      if (activeId && message.conversation_id !== activeId) {
        // Not the thread currently open — still bumps the inbox list.
        onConversationEventRef.current?.();
        return;
      }
      if (!activeId && role === "staff") {
        // Staff with no thread open yet — just refresh the list.
        onConversationEventRef.current?.();
        return;
      }

      hasLiveMessageRef.current = true;
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message],
      );

      if (message.sender_role === role) return; // echo of our own send
      if (isActiveRef.current) {
        socket.emit("conversation:read", { conversationId: message.conversation_id });
      } else {
        setUnreadCount((count) => count + 1);
      }
    });

    socket.on("conversation:updated", () => {
      onConversationEventRef.current?.();
    });

    socket.on("typing", (payload: TypingPayload) => {
      if (conversationIdRef.current && payload.conversationId !== conversationIdRef.current)
        return;
      if (payload.role === role) return;
      setOtherPartyTyping(payload.isTyping);
    });

    socket.on("conversation:read", (payload: { readBy: ChatSenderRole }) => {
      if (payload.readBy === role) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.sender_role === role && !m.read_at
            ? { ...m, read_at: new Date().toISOString() }
            : m,
        ),
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, role]);

  // Joining a specific thread (staff switching conversations) rides the
  // same long-lived connection above instead of tearing it down.
  useEffect(() => {
    conversationIdRef.current = conversationId;
    const socket = socketRef.current;
    if (!socket || !connected) return;

    const switchedThread =
      prevConversationIdRef.current !== undefined &&
      prevConversationIdRef.current !== conversationId;
    prevConversationIdRef.current = conversationId;

    if (role === "staff" && conversationId) {
      socket.emit("conversation:join", { conversationId });
    }

    if (switchedThread) {
      setMessages([]);
      setUnreadCount(0);
      setOtherPartyTyping(false);
      hasLiveMessageRef.current = false;
    }
  }, [conversationId, connected, role]);

  // Opening/focusing the thread marks it read immediately.
  useEffect(() => {
    if (isActive && connected && socketRef.current) {
      markReadIfActive(socketRef.current, conversationId);
    }
  }, [isActive, connected, conversationId, markReadIfActive]);

  const sendMessage = useCallback(
    (body: string) => {
      const trimmed = body.trim();
      if (!trimmed || !socketRef.current) return;
      socketRef.current.emit("message:send", { conversationId, body: trimmed });
    },
    [conversationId],
  );

  const notifyTyping = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("typing:start", { conversationId });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit("typing:stop", { conversationId });
    }, TYPING_IDLE_MS);
  }, [conversationId]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return { connected, messages, sendMessage, notifyTyping, otherPartyTyping, unreadCount };
}
