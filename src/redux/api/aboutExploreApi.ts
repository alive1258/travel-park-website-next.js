import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveAboutExploreResponse,
  AboutExploreCard,
  AboutExplorePaginatedResponse,
  AboutExploreQueryParams,
  CreateAboutExploreRequest,
  UpdateAboutExploreRequest,
} from "@/src/types/aboutExploreType";

const ABOUT_EXPLORE_URL = "/about-explore";

export const aboutExploreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ABOUT EXPLORE CARD
    createAboutExplore: builder.mutation<
      ApiResponse<AboutExploreCard>,
      CreateAboutExploreRequest
    >({
      query: (data) => ({
        url: ABOUT_EXPLORE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.about_explore],
    }),

    // 2. GET ALL ABOUT EXPLORE CARDS (Paginated & Filtered)
    getAllAboutExplore: builder.query<
      AboutExplorePaginatedResponse,
      AboutExploreQueryParams | void
    >({
      query: (params) => ({
        url: ABOUT_EXPLORE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.about_explore],
    }),

    // 3. GET ACTIVE ABOUT EXPLORE CARDS (public about page)
    getActiveAboutExplore: builder.query<ActiveAboutExploreResponse, void>({
      query: () => ({
        url: `${ABOUT_EXPLORE_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_explore],
    }),

    // 4. GET SINGLE ABOUT EXPLORE CARD BY ID
    getSingleAboutExplore: builder.query<ApiResponse<AboutExploreCard>, string>({
      query: (id) => ({
        url: `${ABOUT_EXPLORE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_explore],
    }),

    // 5. UPDATE ABOUT EXPLORE CARD
    updateAboutExplore: builder.mutation<
      ApiResponse<AboutExploreCard>,
      UpdateAboutExploreRequest
    >({
      query: ({ id, data }) => ({
        url: `${ABOUT_EXPLORE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.about_explore],
    }),

    // 6. DELETE ABOUT EXPLORE CARD
    deleteAboutExplore: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ABOUT_EXPLORE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about_explore],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAboutExploreMutation,
  useGetAllAboutExploreQuery,
  useGetActiveAboutExploreQuery,
  useGetSingleAboutExploreQuery,
  useUpdateAboutExploreMutation,
  useDeleteAboutExploreMutation,
} = aboutExploreApi;
