import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveAboutStoryResponse,
  AboutStoryItem,
  AboutStoryPaginatedResponse,
  AboutStoryQueryParams,
  UpdateAboutStoryRequest,
} from "@/src/types/aboutStoryType";

const ABOUT_STORY_URL = "/about-story";

export const aboutStoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ABOUT STORY
    createAboutStory: builder.mutation<ApiResponse<AboutStoryItem>, FormData>({
      query: (formData) => ({
        url: ABOUT_STORY_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.about_story],
    }),

    // 2. GET ALL ABOUT STORY ENTRIES (Paginated & Filtered)
    getAllAboutStory: builder.query<
      AboutStoryPaginatedResponse,
      AboutStoryQueryParams | void
    >({
      query: (params) => ({
        url: ABOUT_STORY_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.about_story],
    }),

    // 3. GET ACTIVE ABOUT STORY (public about page)
    getActiveAboutStory: builder.query<ActiveAboutStoryResponse, void>({
      query: () => ({
        url: `${ABOUT_STORY_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_story],
    }),

    // 4. GET SINGLE ABOUT STORY BY ID
    getSingleAboutStory: builder.query<ApiResponse<AboutStoryItem>, string>({
      query: (id) => ({
        url: `${ABOUT_STORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_story],
    }),

    // 5. UPDATE ABOUT STORY
    updateAboutStory: builder.mutation<
      ApiResponse<AboutStoryItem>,
      UpdateAboutStoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${ABOUT_STORY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.about_story],
    }),

    // 6. DELETE ABOUT STORY
    deleteAboutStory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ABOUT_STORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about_story],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAboutStoryMutation,
  useGetAllAboutStoryQuery,
  useGetActiveAboutStoryQuery,
  useGetSingleAboutStoryQuery,
  useUpdateAboutStoryMutation,
  useDeleteAboutStoryMutation,
} = aboutStoryApi;
