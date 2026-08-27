import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveInnovationConceptsResponse,
  InnovationConceptItem,
  InnovationConceptPaginatedResponse,
  InnovationConceptQueryParams,
  UpdateInnovationConceptRequest,
} from "@/src/types/innovationConceptType";

const INNOVATION_CONCEPTS_URL = "/innovation-concepts";

export const innovationConceptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE INNOVATION CONCEPT
    createInnovationConcept: builder.mutation<
      ApiResponse<InnovationConceptItem>,
      FormData
    >({
      query: (formData) => ({
        url: INNOVATION_CONCEPTS_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.innovation_concepts],
    }),

    // 2. GET ALL INNOVATION CONCEPTS (Paginated & Filtered)
    getAllInnovationConcepts: builder.query<
      InnovationConceptPaginatedResponse,
      InnovationConceptQueryParams | void
    >({
      query: (params) => ({
        url: INNOVATION_CONCEPTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.innovation_concepts],
    }),

    // 3. GET ACTIVE INNOVATION CONCEPTS (public fleet page)
    getActiveInnovationConcepts: builder.query<
      ActiveInnovationConceptsResponse,
      void
    >({
      query: () => ({
        url: `${INNOVATION_CONCEPTS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.innovation_concepts],
    }),

    // 4. GET SINGLE INNOVATION CONCEPT BY ID
    getSingleInnovationConcept: builder.query<
      ApiResponse<InnovationConceptItem>,
      string
    >({
      query: (id) => ({
        url: `${INNOVATION_CONCEPTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.innovation_concepts],
    }),

    // 5. UPDATE INNOVATION CONCEPT
    updateInnovationConcept: builder.mutation<
      ApiResponse<InnovationConceptItem>,
      UpdateInnovationConceptRequest
    >({
      query: ({ id, data }) => ({
        url: `${INNOVATION_CONCEPTS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.innovation_concepts],
    }),

    // 6. DELETE INNOVATION CONCEPT
    deleteInnovationConcept: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${INNOVATION_CONCEPTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.innovation_concepts],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateInnovationConceptMutation,
  useGetAllInnovationConceptsQuery,
  useGetActiveInnovationConceptsQuery,
  useGetSingleInnovationConceptQuery,
  useUpdateInnovationConceptMutation,
  useDeleteInnovationConceptMutation,
} = innovationConceptApi;
