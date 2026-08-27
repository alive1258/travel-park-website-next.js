import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ExperienceItem,
  ExperiencePaginatedResponse,
  ExperienceQueryParams,
  UpdateExperienceRequest,
} from "@/src/types/experienceType";

const EXPERIENCE_URL = "/experiences";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE EXPERIENCE
    createExperience: builder.mutation<ApiResponse<ExperienceItem>, FormData>({
      query: (formData) => ({
        url: EXPERIENCE_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.experiences],
    }),

    // 2. GET ALL EXPERIENCE ENTRIES (Paginated & Filtered)
    getAllExperiences: builder.query<
      ExperiencePaginatedResponse,
      ExperienceQueryParams | void
    >({
      query: (params) => ({
        url: EXPERIENCE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.experiences],
    }),

    // 3. GET SINGLE EXPERIENCE ENTRY BY ID
    getSingleExperience: builder.query<ApiResponse<ExperienceItem>, string>({
      query: (id) => ({
        url: `${EXPERIENCE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.experiences],
    }),

    // 4. UPDATE EXPERIENCE
    updateExperience: builder.mutation<
      ApiResponse<ExperienceItem>,
      UpdateExperienceRequest
    >({
      query: ({ id, data }) => ({
        url: `${EXPERIENCE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.experiences],
    }),

    // 5. DELETE EXPERIENCE
    deleteExperience: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${EXPERIENCE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.experiences],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateExperienceMutation,
  useGetAllExperiencesQuery,
  useGetSingleExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
