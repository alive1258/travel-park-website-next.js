import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveSustainabilityRoadmapResponse,
  SustainabilityRoadmapItem,
  SustainabilityRoadmapPaginatedResponse,
  SustainabilityRoadmapQueryParams,
  CreateSustainabilityRoadmapRequest,
  UpdateSustainabilityRoadmapRequest,
} from "@/src/types/sustainabilityRoadmapType";

const SUSTAINABILITY_ROADMAP_URL = "/sustainability-roadmap";

export const sustainabilityRoadmapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SUSTAINABILITY ROADMAP ITEM
    createSustainabilityRoadmap: builder.mutation<
      ApiResponse<SustainabilityRoadmapItem>,
      CreateSustainabilityRoadmapRequest
    >({
      query: (data) => ({
        url: SUSTAINABILITY_ROADMAP_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.sustainability_roadmap],
    }),

    // 2. GET ALL SUSTAINABILITY ROADMAP ITEMS (Paginated & Filtered)
    getAllSustainabilityRoadmap: builder.query<
      SustainabilityRoadmapPaginatedResponse,
      SustainabilityRoadmapQueryParams | void
    >({
      query: (params) => ({
        url: SUSTAINABILITY_ROADMAP_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.sustainability_roadmap],
    }),

    // 3. GET ACTIVE SUSTAINABILITY ROADMAP ITEMS (public sustainability page)
    getActiveSustainabilityRoadmap: builder.query<
      ActiveSustainabilityRoadmapResponse,
      void
    >({
      query: () => ({
        url: `${SUSTAINABILITY_ROADMAP_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_roadmap],
    }),

    // 4. GET SINGLE SUSTAINABILITY ROADMAP ITEM BY ID
    getSingleSustainabilityRoadmap: builder.query<
      ApiResponse<SustainabilityRoadmapItem>,
      string
    >({
      query: (id) => ({
        url: `${SUSTAINABILITY_ROADMAP_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_roadmap],
    }),

    // 5. UPDATE SUSTAINABILITY ROADMAP ITEM
    updateSustainabilityRoadmap: builder.mutation<
      ApiResponse<SustainabilityRoadmapItem>,
      UpdateSustainabilityRoadmapRequest
    >({
      query: ({ id, data }) => ({
        url: `${SUSTAINABILITY_ROADMAP_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.sustainability_roadmap],
    }),

    // 6. DELETE SUSTAINABILITY ROADMAP ITEM
    deleteSustainabilityRoadmap: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SUSTAINABILITY_ROADMAP_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sustainability_roadmap],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateSustainabilityRoadmapMutation,
  useGetAllSustainabilityRoadmapQuery,
  useGetActiveSustainabilityRoadmapQuery,
  useGetSingleSustainabilityRoadmapQuery,
  useUpdateSustainabilityRoadmapMutation,
  useDeleteSustainabilityRoadmapMutation,
} = sustainabilityRoadmapApi;
