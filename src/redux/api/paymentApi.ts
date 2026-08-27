import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  BookingPaymentsResponse,
  CheckoutSessionResponse,
  CreateCheckoutSessionPayload,
  PaymentPaginatedResponse,
  PaymentQueryParams,
  VerifySessionResponse,
} from "@/src/types/paymentType";

const PAYMENTS_URL = "/payments";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE CHECKOUT SESSION (authenticated customer)
    createCheckoutSession: builder.mutation<
      CheckoutSessionResponse,
      CreateCheckoutSessionPayload
    >({
      query: (data) => ({
        url: `${PAYMENTS_URL}/checkout-session`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payments, tagTypes.bookings],
    }),

    // 2. GET MY PAYMENTS (authenticated customer's own history)
    getMyPayments: builder.query<PaymentPaginatedResponse, PaymentQueryParams | void>({
      query: (params) => ({
        url: `${PAYMENTS_URL}/mine`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.payments],
    }),

    // 3. GET PAYMENTS FOR A BOOKING (owner or admin)
    getPaymentsByBooking: builder.query<BookingPaymentsResponse, string>({
      query: (bookingId) => ({
        url: `${PAYMENTS_URL}/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payments],
    }),

    // 4. GET ALL PAYMENTS (admin, paginated & filtered)
    getAllPayments: builder.query<PaymentPaginatedResponse, PaymentQueryParams | void>({
      query: (params) => ({
        url: PAYMENTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.payments],
    }),

    // 5. VERIFY CHECKOUT SESSION (force-sync against Stripe — fallback for
    // when the webhook hasn't landed, e.g. local dev without a public URL)
    verifyCheckoutSession: builder.mutation<VerifySessionResponse, string>({
      query: (sessionId) => ({
        url: `${PAYMENTS_URL}/verify-session`,
        method: "GET",
        params: { session_id: sessionId },
      }),
      invalidatesTags: [tagTypes.payments, tagTypes.bookings],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetMyPaymentsQuery,
  useGetPaymentsByBookingQuery,
  useGetAllPaymentsQuery,
  useVerifyCheckoutSessionMutation,
} = paymentApi;
