import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveYachtsResponse,
  YachtAdminItem,
  YachtPaginatedResponse,
  YachtQueryParams,
  UpdateYachtRequest,
} from "@/src/types/yachtAdminType";

const YACHTS_URL = "/yachts";

export const yachtAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE YACHT
    createYacht: builder.mutation<ApiResponse<YachtAdminItem>, FormData>({
      query: (formData) => ({
        url: YACHTS_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for hero + gallery uploads
      }),
      invalidatesTags: [tagTypes.yachts],
    }),

    // 2. GET ALL YACHTS (Paginated & Filtered)
    getAllYachts: builder.query<YachtPaginatedResponse, YachtQueryParams | void>({
      query: (params) => ({
        url: YACHTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.yachts],
    }),

    // 3. GET ACTIVE YACHTS (public fleet page)
    getActiveYachts: builder.query<ActiveYachtsResponse, void>({
      query: () => ({
        url: `${YACHTS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.yachts],
    }),

    // 4. GET SINGLE YACHT BY SLUG (public detail page)
    getYachtBySlug: builder.query<ApiResponse<YachtAdminItem>, string>({
      query: (slug) => ({
        url: `${YACHTS_URL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.yachts],
    }),

    // 5. GET SINGLE YACHT BY ID (dashboard)
    getSingleYacht: builder.query<ApiResponse<YachtAdminItem>, string>({
      query: (id) => ({
        url: `${YACHTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.yachts],
    }),

    // 6. UPDATE YACHT
    updateYacht: builder.mutation<ApiResponse<YachtAdminItem>, UpdateYachtRequest>({
      query: ({ id, data }) => ({
        url: `${YACHTS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for hero + gallery updates
      }),
      invalidatesTags: [tagTypes.yachts],
    }),

    // 7. DELETE YACHT
    deleteYacht: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${YACHTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.yachts],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateYachtMutation,
  useGetAllYachtsQuery,
  useGetActiveYachtsQuery,
  useGetYachtBySlugQuery,
  useGetSingleYachtQuery,
  useUpdateYachtMutation,
  useDeleteYachtMutation,
} = yachtAdminApi;
