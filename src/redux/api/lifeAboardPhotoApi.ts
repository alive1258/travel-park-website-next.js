import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveLifeAboardPhotosResponse,
  LifeAboardPhotoItem,
  LifeAboardPhotoPaginatedResponse,
  LifeAboardPhotoQueryParams,
  UpdateLifeAboardPhotoRequest,
} from "@/src/types/lifeAboardPhotoType";

const LIFE_ABOARD_PHOTOS_URL = "/life-aboard-photos";

export const lifeAboardPhotoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE LIFE ABOARD PHOTO
    createLifeAboardPhoto: builder.mutation<
      ApiResponse<LifeAboardPhotoItem>,
      FormData
    >({
      query: (formData) => ({
        url: LIFE_ABOARD_PHOTOS_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.life_aboard_photos],
    }),

    // 2. GET ALL LIFE ABOARD PHOTOS (Paginated & Filtered)
    getAllLifeAboardPhotos: builder.query<
      LifeAboardPhotoPaginatedResponse,
      LifeAboardPhotoQueryParams | void
    >({
      query: (params) => ({
        url: LIFE_ABOARD_PHOTOS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.life_aboard_photos],
    }),

    // 3. GET ACTIVE LIFE ABOARD PHOTOS (public fleet page)
    getActiveLifeAboardPhotos: builder.query<
      ActiveLifeAboardPhotosResponse,
      void
    >({
      query: () => ({
        url: `${LIFE_ABOARD_PHOTOS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.life_aboard_photos],
    }),

    // 4. GET SINGLE LIFE ABOARD PHOTO BY ID
    getSingleLifeAboardPhoto: builder.query<
      ApiResponse<LifeAboardPhotoItem>,
      string
    >({
      query: (id) => ({
        url: `${LIFE_ABOARD_PHOTOS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.life_aboard_photos],
    }),

    // 5. UPDATE LIFE ABOARD PHOTO
    updateLifeAboardPhoto: builder.mutation<
      ApiResponse<LifeAboardPhotoItem>,
      UpdateLifeAboardPhotoRequest
    >({
      query: ({ id, data }) => ({
        url: `${LIFE_ABOARD_PHOTOS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.life_aboard_photos],
    }),

    // 6. DELETE LIFE ABOARD PHOTO
    deleteLifeAboardPhoto: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${LIFE_ABOARD_PHOTOS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.life_aboard_photos],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateLifeAboardPhotoMutation,
  useGetAllLifeAboardPhotosQuery,
  useGetActiveLifeAboardPhotosQuery,
  useGetSingleLifeAboardPhotoQuery,
  useUpdateLifeAboardPhotoMutation,
  useDeleteLifeAboardPhotoMutation,
} = lifeAboardPhotoApi;
