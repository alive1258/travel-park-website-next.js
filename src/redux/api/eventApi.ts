import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveEventsResponse,
  EventItem,
  EventPaginatedResponse,
  EventQueryParams,
  CreateEventRequest,
  UpdateEventRequest,
} from "@/src/types/eventType";

const EVENTS_URL = "/events";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE EVENT
    createEvent: builder.mutation<ApiResponse<EventItem>, CreateEventRequest>({
      query: (data) => ({
        url: EVENTS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.events],
    }),

    // 2. GET ALL EVENTS (Paginated & Filtered)
    getAllEvents: builder.query<EventPaginatedResponse, EventQueryParams | void>({
      query: (params) => ({
        url: EVENTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.events],
    }),

    // 3. GET ACTIVE EVENTS (public events page)
    getActiveEvents: builder.query<ActiveEventsResponse, void>({
      query: () => ({
        url: `${EVENTS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.events],
    }),

    // 4. GET SINGLE EVENT BY ID
    getSingleEvent: builder.query<ApiResponse<EventItem>, string>({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.events],
    }),

    // 5. UPDATE EVENT
    updateEvent: builder.mutation<ApiResponse<EventItem>, UpdateEventRequest>({
      query: ({ id, data }) => ({
        url: `${EVENTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.events],
    }),

    // 6. DELETE EVENT
    deleteEvent: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.events],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetActiveEventsQuery,
  useGetSingleEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
