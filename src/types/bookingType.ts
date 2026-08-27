import { PaginationLinks, PaginationMeta } from "./yachtAdminType";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type BookingPaymentStatus =
  | "unpaid"
  | "deposit_paid"
  | "paid_in_full"
  | "refunded";

export interface BookingYachtSummary {
  id: string;
  name: string;
  slug: string;
  hero_image: string;
}

export interface BookingUserSummary {
  id: string;
  name?: string;
  email: string;
}

export interface BookingItem {
  id: string;
  yacht_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  message?: string;
  currency: string;
  price_per_night: number;
  subtotal_amount: number;
  deposit_percentage: number;
  deposit_amount: number;
  balance_amount: number;
  status: BookingStatus;
  payment_status: BookingPaymentStatus;
  yacht?: BookingYachtSummary;
  user?: BookingUserSummary;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingPayload {
  yacht_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  message?: string;
}

export interface UpdateBookingStatusPayload {
  id: string;
  status: BookingStatus;
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: {
    status?: BookingStatus;
    payment_status?: BookingPaymentStatus;
    yacht_id?: string;
  };
}

export interface BookingPaginatedResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: BookingItem[];
}

export interface SingleBookingResponse {
  success: boolean;
  message: string;
  data: BookingItem;
}
