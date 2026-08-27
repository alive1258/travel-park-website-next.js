import { PaginationLinks, PaginationMeta } from "./yachtAdminType";
import { BookingUserSummary } from "./bookingType";

export type PaymentType = "deposit" | "balance";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface PaymentBookingSummary {
  id: string;
  check_in: string;
  check_out: string;
}

export interface PaymentItem {
  id: string;
  booking_id: string;
  user_id: string;
  stripe_checkout_session_id?: string;
  stripe_payment_intent_id?: string;
  type: PaymentType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  receipt_url?: string;
  booking?: PaymentBookingSummary;
  user?: BookingUserSummary;
  created_at: string;
  updated_at: string;
}

export interface CreateCheckoutSessionPayload {
  booking_id: string;
  type: PaymentType;
}

export interface CheckoutSessionResponse {
  success: boolean;
  message: string;
  data: { url: string };
}

export interface PaymentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: {
    status?: PaymentStatus;
    type?: PaymentType;
    booking_id?: string;
  };
}

export interface PaymentPaginatedResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: PaymentItem[];
}

export interface BookingPaymentsResponse {
  success: boolean;
  message: string;
  data: PaymentItem[];
}

export interface VerifySessionResponse {
  success: boolean;
  message: string;
  data: { status: PaymentStatus };
}
