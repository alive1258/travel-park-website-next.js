import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveGalleryResponse,
  GalleryItem,
  GalleryPaginatedResponse,
  GalleryQueryParams,
  UpdateGalleryRequest,
} from "@/src/types/galleryType";

const GALLERY_URL = "/gallery";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE GALLERY ITEM
    createGalleryItem: builder.mutation<ApiResponse<GalleryItem>, FormData>({
      query: (formData) => ({
        url: GALLERY_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.gallery],
    }),

    // 2. GET ALL GALLERY ITEMS (Paginated & Filtered)
    getAllGalleryItems: builder.query<
      GalleryPaginatedResponse,
      GalleryQueryParams | void
    >({
      query: (params) => ({
        url: GALLERY_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.gallery],
    }),

    // 3. GET ACTIVE GALLERY ITEMS (public homepage)
    getActiveGalleryItems: builder.query<ActiveGalleryResponse, void>({
      query: () => ({
        url: `${GALLERY_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.gallery],
    }),

    // 4. GET SINGLE GALLERY ITEM BY ID
    getSingleGalleryItem: builder.query<ApiResponse<GalleryItem>, string>({
      query: (id) => ({
        url: `${GALLERY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.gallery],
    }),

    // 5. UPDATE GALLERY ITEM
    updateGalleryItem: builder.mutation<
      ApiResponse<GalleryItem>,
      UpdateGalleryRequest
    >({
      query: ({ id, data }) => ({
        url: `${GALLERY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.gallery],
    }),

    // 6. DELETE GALLERY ITEM
    deleteGalleryItem: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${GALLERY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.gallery],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateGalleryItemMutation,
  useGetAllGalleryItemsQuery,
  useGetActiveGalleryItemsQuery,
  useGetSingleGalleryItemQuery,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = galleryApi;
