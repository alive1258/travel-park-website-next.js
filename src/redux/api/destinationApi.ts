import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  DestinationItem,
  DestinationPaginatedResponse,
  DestinationQueryParams,
  UpdateDestinationRequest,
} from "@/src/types/destinationType";

const DESTINATION_URL = "/destinations";

export const destinationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE DESTINATION
    createDestination: builder.mutation<ApiResponse<DestinationItem>, FormData>({
      query: (formData) => ({
        url: DESTINATION_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.destinations],
    }),

    // 2. GET ALL DESTINATION ENTRIES (Paginated & Filtered)
    getAllDestinations: builder.query<
      DestinationPaginatedResponse,
      DestinationQueryParams | void
    >({
      query: (params) => ({
        url: DESTINATION_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.destinations],
    }),

    // 3. GET SINGLE DESTINATION ENTRY BY ID
    getSingleDestination: builder.query<ApiResponse<DestinationItem>, string>({
      query: (id) => ({
        url: `${DESTINATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.destinations],
    }),

    // 4. UPDATE DESTINATION
    updateDestination: builder.mutation<
      ApiResponse<DestinationItem>,
      UpdateDestinationRequest
    >({
      query: ({ id, data }) => ({
        url: `${DESTINATION_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.destinations],
    }),

    // 5. DELETE DESTINATION
    deleteDestination: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${DESTINATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.destinations],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateDestinationMutation,
  useGetAllDestinationsQuery,
  useGetSingleDestinationQuery,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} = destinationApi;
