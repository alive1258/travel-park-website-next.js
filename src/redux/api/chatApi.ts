import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ChatConversationPaginatedResponse,
  ChatConversationResponse,
  ChatConversationStatus,
  ChatMessagePaginatedResponse,
  ChatQueryParams,
  GetConversationsParams,
} from "@/src/types/chatType";

const CHAT_URL = "/chat";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET MY CONVERSATION (authenticated customer — created on first contact)
    getMyConversation: builder.query<ChatConversationResponse, void>({
      query: () => ({ url: `${CHAT_URL}/conversations/mine`, method: "GET" }),
      providesTags: [tagTypes.chat],
    }),

    // 2. GET MY MESSAGE HISTORY (authenticated customer)
    getMyMessages: builder.query<ChatMessagePaginatedResponse, ChatQueryParams | void>({
      query: (params) => ({
        url: `${CHAT_URL}/messages/mine`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.chat],
    }),

    // 3. GET ALL CONVERSATIONS (support inbox, staff)
    getConversations: builder.query<
      ChatConversationPaginatedResponse,
      GetConversationsParams | void
    >({
      query: (params) => ({
        url: `${CHAT_URL}/conversations`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.chat],
    }),

    // 4. GET MESSAGES FOR ONE CONVERSATION (owner or staff)
    getConversationMessages: builder.query<
      ChatMessagePaginatedResponse,
      { id: string; params?: ChatQueryParams }
    >({
      query: ({ id, params }) => ({
        url: `${CHAT_URL}/conversations/${id}/messages`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.chat],
    }),

    // 5. MARK CONVERSATION READ
    markConversationRead: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `${CHAT_URL}/conversations/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.chat],
    }),

    // 6. UPDATE CONVERSATION STATUS (staff — resolve/reopen)
    updateConversationStatus: builder.mutation<
      ChatConversationResponse,
      { id: string; status: ChatConversationStatus }
    >({
      query: ({ id, status }) => ({
        url: `${CHAT_URL}/conversations/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.chat],
    }),
  }),
});

export const {
  useGetMyConversationQuery,
  useGetMyMessagesQuery,
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useMarkConversationReadMutation,
  useUpdateConversationStatusMutation,
} = chatApi;
