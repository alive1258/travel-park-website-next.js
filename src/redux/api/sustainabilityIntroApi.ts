import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveSustainabilityIntroResponse,
  SustainabilityIntroItem,
  SustainabilityIntroPaginatedResponse,
  SustainabilityIntroQueryParams,
  UpdateSustainabilityIntroRequest,
} from "@/src/types/sustainabilityIntroType";

const SUSTAINABILITY_INTRO_URL = "/sustainability-intro";

export const sustainabilityIntroApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SUSTAINABILITY INTRO
    createSustainabilityIntro: builder.mutation<
      ApiResponse<SustainabilityIntroItem>,
      FormData
    >({
      query: (formData) => ({
        url: SUSTAINABILITY_INTRO_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.sustainability_intro],
    }),

    // 2. GET ALL SUSTAINABILITY INTRO ENTRIES (Paginated & Filtered)
    getAllSustainabilityIntro: builder.query<
      SustainabilityIntroPaginatedResponse,
      SustainabilityIntroQueryParams | void
    >({
      query: (params) => ({
        url: SUSTAINABILITY_INTRO_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.sustainability_intro],
    }),

    // 3. GET ACTIVE SUSTAINABILITY INTRO (public sustainability page)
    getActiveSustainabilityIntro: builder.query<
      ActiveSustainabilityIntroResponse,
      void
    >({
      query: () => ({
        url: `${SUSTAINABILITY_INTRO_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_intro],
    }),

    // 4. GET SINGLE SUSTAINABILITY INTRO BY ID
    getSingleSustainabilityIntro: builder.query<
      ApiResponse<SustainabilityIntroItem>,
      string
    >({
      query: (id) => ({
        url: `${SUSTAINABILITY_INTRO_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_intro],
    }),

    // 5. UPDATE SUSTAINABILITY INTRO
    updateSustainabilityIntro: builder.mutation<
      ApiResponse<SustainabilityIntroItem>,
      UpdateSustainabilityIntroRequest
    >({
      query: ({ id, data }) => ({
        url: `${SUSTAINABILITY_INTRO_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.sustainability_intro],
    }),

    // 6. DELETE SUSTAINABILITY INTRO
    deleteSustainabilityIntro: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SUSTAINABILITY_INTRO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sustainability_intro],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateSustainabilityIntroMutation,
  useGetAllSustainabilityIntroQuery,
  useGetActiveSustainabilityIntroQuery,
  useGetSingleSustainabilityIntroQuery,
  useUpdateSustainabilityIntroMutation,
  useDeleteSustainabilityIntroMutation,
} = sustainabilityIntroApi;
