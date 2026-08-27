import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveClientVideoReviewsResponse,
  ClientVideoReviewItem,
  ClientVideoReviewPaginatedResponse,
  ClientVideoReviewQueryParams,
  UpdateClientVideoReviewRequest,
} from "@/src/types/clientVideoReviewType";

const CLIENT_VIDEO_REVIEWS_URL = "/client-video-reviews";

export const clientVideoReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE CLIENT VIDEO REVIEW
    createClientVideoReview: builder.mutation<
      ApiResponse<ClientVideoReviewItem>,
      FormData
    >({
      query: (formData) => ({
        url: CLIENT_VIDEO_REVIEWS_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.client_video_reviews],
    }),

    // 2. GET ALL CLIENT VIDEO REVIEWS (Paginated & Filtered)
    getAllClientVideoReviews: builder.query<
      ClientVideoReviewPaginatedResponse,
      ClientVideoReviewQueryParams | void
    >({
      query: (params) => ({
        url: CLIENT_VIDEO_REVIEWS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.client_video_reviews],
    }),

    // 3. GET ACTIVE CLIENT VIDEO REVIEWS (public homepage)
    getActiveClientVideoReviews: builder.query<
      ActiveClientVideoReviewsResponse,
      void
    >({
      query: () => ({
        url: `${CLIENT_VIDEO_REVIEWS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.client_video_reviews],
    }),

    // 4. GET SINGLE CLIENT VIDEO REVIEW BY ID
    getSingleClientVideoReview: builder.query<
      ApiResponse<ClientVideoReviewItem>,
      string
    >({
      query: (id) => ({
        url: `${CLIENT_VIDEO_REVIEWS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client_video_reviews],
    }),

    // 5. UPDATE CLIENT VIDEO REVIEW
    updateClientVideoReview: builder.mutation<
      ApiResponse<ClientVideoReviewItem>,
      UpdateClientVideoReviewRequest
    >({
      query: ({ id, data }) => ({
        url: `${CLIENT_VIDEO_REVIEWS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.client_video_reviews],
    }),

    // 6. DELETE CLIENT VIDEO REVIEW
    deleteClientVideoReview: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${CLIENT_VIDEO_REVIEWS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.client_video_reviews],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateClientVideoReviewMutation,
  useGetAllClientVideoReviewsQuery,
  useGetActiveClientVideoReviewsQuery,
  useGetSingleClientVideoReviewQuery,
  useUpdateClientVideoReviewMutation,
  useDeleteClientVideoReviewMutation,
} = clientVideoReviewApi;
