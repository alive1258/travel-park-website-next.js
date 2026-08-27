import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  SustainabilityItem,
  SustainabilityPaginatedResponse,
  SustainabilityQueryParams,
  UpdateSustainabilityRequest,
} from "@/src/types/sustainabilityType";

const SUSTAINABILITY_URL = "/sustainability";

export const sustainabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SUSTAINABILITY
    createSustainability: builder.mutation<
      ApiResponse<SustainabilityItem>,
      FormData
    >({
      query: (formData) => ({
        url: SUSTAINABILITY_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.sustainability],
    }),

    // 2. GET ALL SUSTAINABILITY ENTRIES (Paginated & Filtered)
    getAllSustainability: builder.query<
      SustainabilityPaginatedResponse,
      SustainabilityQueryParams | void
    >({
      query: (params) => ({
        url: SUSTAINABILITY_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.sustainability],
    }),

    // 3. GET SINGLE SUSTAINABILITY ENTRY BY ID
    getSingleSustainability: builder.query<
      ApiResponse<SustainabilityItem>,
      string
    >({
      query: (id) => ({
        url: `${SUSTAINABILITY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability],
    }),

    // 4. UPDATE SUSTAINABILITY
    updateSustainability: builder.mutation<
      ApiResponse<SustainabilityItem>,
      UpdateSustainabilityRequest
    >({
      query: ({ id, data }) => ({
        url: `${SUSTAINABILITY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.sustainability],
    }),

    // 5. DELETE SUSTAINABILITY
    deleteSustainability: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SUSTAINABILITY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sustainability],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateSustainabilityMutation,
  useGetAllSustainabilityQuery,
  useGetSingleSustainabilityQuery,
  useUpdateSustainabilityMutation,
  useDeleteSustainabilityMutation,
} = sustainabilityApi;
