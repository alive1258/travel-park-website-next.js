import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveAboutStatsResponse,
  AboutStat,
  AboutStatPaginatedResponse,
  AboutStatQueryParams,
  CreateAboutStatRequest,
  UpdateAboutStatRequest,
} from "@/src/types/aboutStatType";

const ABOUT_STATS_URL = "/about-stats";

export const aboutStatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ABOUT STAT
    createAboutStat: builder.mutation<
      ApiResponse<AboutStat>,
      CreateAboutStatRequest
    >({
      query: (data) => ({
        url: ABOUT_STATS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.about_stats],
    }),

    // 2. GET ALL ABOUT STATS (Paginated & Filtered)
    getAllAboutStats: builder.query<
      AboutStatPaginatedResponse,
      AboutStatQueryParams | void
    >({
      query: (params) => ({
        url: ABOUT_STATS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.about_stats],
    }),

    // 3. GET ACTIVE ABOUT STATS (public about page)
    getActiveAboutStats: builder.query<ActiveAboutStatsResponse, void>({
      query: () => ({
        url: `${ABOUT_STATS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_stats],
    }),

    // 4. GET SINGLE ABOUT STAT BY ID
    getSingleAboutStat: builder.query<ApiResponse<AboutStat>, string>({
      query: (id) => ({
        url: `${ABOUT_STATS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_stats],
    }),

    // 5. UPDATE ABOUT STAT
    updateAboutStat: builder.mutation<
      ApiResponse<AboutStat>,
      UpdateAboutStatRequest
    >({
      query: ({ id, data }) => ({
        url: `${ABOUT_STATS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.about_stats],
    }),

    // 6. DELETE ABOUT STAT
    deleteAboutStat: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ABOUT_STATS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about_stats],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAboutStatMutation,
  useGetAllAboutStatsQuery,
  useGetActiveAboutStatsQuery,
  useGetSingleAboutStatQuery,
  useUpdateAboutStatMutation,
  useDeleteAboutStatMutation,
} = aboutStatApi;
