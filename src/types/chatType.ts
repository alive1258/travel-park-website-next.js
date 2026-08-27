import { PaginationLinks, PaginationMeta } from "./yachtAdminType";

export type ChatSenderRole = "customer" | "staff";
export type ChatConversationStatus = "open" | "closed";

export interface ChatUserSummary {
  id: string;
  name?: string;
  email: string;
}

export interface ChatConversation {
  id: string;
  customer_id: string;
  customer?: ChatUserSummary;
  assigned_staff_id?: string;
  assignedStaff?: ChatUserSummary;
  status: ChatConversationStatus;
  last_message_at?: string;
  last_message_preview?: string;
  customer_unread_count: number;
  staff_unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: ChatUserSummary;
  sender_role: ChatSenderRole;
  body: string;
  read_at?: string;
  created_at: string;
}

export interface ChatQueryParams {
  page?: number;
  limit?: number;
}

export interface GetConversationsParams extends ChatQueryParams {
  status?: ChatConversationStatus;
}

export interface ChatConversationResponse {
  success: boolean;
  message: string;
  data: ChatConversation;
}

export interface ChatMessagePaginatedResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ChatMessage[];
}

export interface ChatConversationPaginatedResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ChatConversation[];
}
