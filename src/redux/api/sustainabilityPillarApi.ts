import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveSustainabilityPillarsResponse,
  SustainabilityPillar,
  SustainabilityPillarPaginatedResponse,
  SustainabilityPillarQueryParams,
  CreateSustainabilityPillarRequest,
  UpdateSustainabilityPillarRequest,
} from "@/src/types/sustainabilityPillarType";

const SUSTAINABILITY_PILLARS_URL = "/sustainability-pillars";

export const sustainabilityPillarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SUSTAINABILITY PILLAR
    createSustainabilityPillar: builder.mutation<
      ApiResponse<SustainabilityPillar>,
      CreateSustainabilityPillarRequest
    >({
      query: (data) => ({
        url: SUSTAINABILITY_PILLARS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.sustainability_pillars],
    }),

    // 2. GET ALL SUSTAINABILITY PILLARS (Paginated & Filtered)
    getAllSustainabilityPillars: builder.query<
      SustainabilityPillarPaginatedResponse,
      SustainabilityPillarQueryParams | void
    >({
      query: (params) => ({
        url: SUSTAINABILITY_PILLARS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.sustainability_pillars],
    }),

    // 3. GET ACTIVE SUSTAINABILITY PILLARS (public sustainability page)
    getActiveSustainabilityPillars: builder.query<
      ActiveSustainabilityPillarsResponse,
      void
    >({
      query: () => ({
        url: `${SUSTAINABILITY_PILLARS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_pillars],
    }),

    // 4. GET SINGLE SUSTAINABILITY PILLAR BY ID
    getSingleSustainabilityPillar: builder.query<
      ApiResponse<SustainabilityPillar>,
      string
    >({
      query: (id) => ({
        url: `${SUSTAINABILITY_PILLARS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sustainability_pillars],
    }),

    // 5. UPDATE SUSTAINABILITY PILLAR
    updateSustainabilityPillar: builder.mutation<
      ApiResponse<SustainabilityPillar>,
      UpdateSustainabilityPillarRequest
    >({
      query: ({ id, data }) => ({
        url: `${SUSTAINABILITY_PILLARS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.sustainability_pillars],
    }),

    // 6. DELETE SUSTAINABILITY PILLAR
    deleteSustainabilityPillar: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SUSTAINABILITY_PILLARS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sustainability_pillars],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateSustainabilityPillarMutation,
  useGetAllSustainabilityPillarsQuery,
  useGetActiveSustainabilityPillarsQuery,
  useGetSingleSustainabilityPillarQuery,
  useUpdateSustainabilityPillarMutation,
  useDeleteSustainabilityPillarMutation,
} = sustainabilityPillarApi;
