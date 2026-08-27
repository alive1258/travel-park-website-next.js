import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  HeroItem,
  HeroPaginatedResponse,
  HeroQueryParams,
  UpdateHeroRequest,
} from "@/src/types/heroType";

const HERO_URL = "/hero";

export const heroApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE HERO
    createHero: builder.mutation<ApiResponse<HeroItem>, FormData>({
      query: (formData) => ({
        url: HERO_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.hero],
    }),

    // 2. GET ALL HERO ENTRIES (Paginated & Filtered)
    getAllHero: builder.query<HeroPaginatedResponse, HeroQueryParams | void>({
      query: (params) => ({
        url: HERO_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.hero],
    }),

    // 3. GET SINGLE HERO ENTRY BY ID
    getSingleHero: builder.query<ApiResponse<HeroItem>, string>({
      query: (id) => ({
        url: `${HERO_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.hero],
    }),

    // 4. UPDATE HERO
    updateHero: builder.mutation<ApiResponse<HeroItem>, UpdateHeroRequest>({
      query: ({ id, data }) => ({
        url: `${HERO_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.hero],
    }),

    // 5. DELETE HERO
    deleteHero: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${HERO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.hero],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateHeroMutation,
  useGetAllHeroQuery,
  useGetSingleHeroQuery,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi;
