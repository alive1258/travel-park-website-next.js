import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  BookingPaginatedResponse,
  BookingQueryParams,
  CreateBookingPayload,
  SingleBookingResponse,
  UpdateBookingStatusPayload,
} from "@/src/types/bookingType";

const BOOKINGS_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE BOOKING (authenticated customer)
    createBooking: builder.mutation<SingleBookingResponse, CreateBookingPayload>({
      query: (data) => ({
        url: BOOKINGS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    // 2. GET MY BOOKINGS (authenticated customer's own history)
    getMyBookings: builder.query<BookingPaginatedResponse, BookingQueryParams | void>({
      query: (params) => ({
        url: `${BOOKINGS_URL}/mine`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.bookings],
    }),

    // 3. GET ALL BOOKINGS (admin, paginated & filtered)
    getAllBookings: builder.query<BookingPaginatedResponse, BookingQueryParams | void>({
      query: (params) => ({
        url: BOOKINGS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.bookings],
    }),

    // 4. GET SINGLE BOOKING (owner or admin)
    getBookingById: builder.query<SingleBookingResponse, string>({
      query: (id) => ({
        url: `${BOOKINGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bookings],
    }),

    // 5. UPDATE BOOKING STATUS (admin)
    updateBookingStatus: builder.mutation<
      SingleBookingResponse,
      UpdateBookingStatusPayload
    >({
      query: ({ id, status }) => ({
        url: `${BOOKINGS_URL}/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.bookings],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
