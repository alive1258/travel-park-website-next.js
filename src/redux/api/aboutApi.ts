import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  AboutItem,
  AboutPaginatedResponse,
  AboutQueryParams,
  UpdateAboutRequest,
} from "@/src/types/aboutType";

const ABOUT_URL = "/about";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ABOUT
    createAbout: builder.mutation<ApiResponse<AboutItem>, FormData>({
      query: (formData) => ({
        url: ABOUT_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.about],
    }),

    // 2. GET ALL ABOUT ENTRIES (Paginated & Filtered)
    getAllAbout: builder.query<AboutPaginatedResponse, AboutQueryParams | void>({
      query: (params) => ({
        url: ABOUT_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.about],
    }),

    // 3. GET SINGLE ABOUT ENTRY BY ID
    getSingleAbout: builder.query<ApiResponse<AboutItem>, string>({
      query: (id) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),

    // 4. UPDATE ABOUT
    updateAbout: builder.mutation<ApiResponse<AboutItem>, UpdateAboutRequest>({
      query: ({ id, data }) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.about],
    }),

    // 5. DELETE ABOUT
    deleteAbout: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAboutMutation,
  useGetAllAboutQuery,
  useGetSingleAboutQuery,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApi;
