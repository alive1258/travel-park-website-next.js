import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActivePortfolioResponse,
  PortfolioItem,
  PortfolioPaginatedResponse,
  PortfolioQueryParams,
  UpdatePortfolioRequest,
} from "@/src/types/portfolioType";

const PORTFOLIO_URL = "/portfolio";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PORTFOLIO ITEM
    createPortfolio: builder.mutation<ApiResponse<PortfolioItem>, FormData>({
      query: (formData) => ({
        url: PORTFOLIO_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),

    // 2. GET ALL PORTFOLIO ITEMS (Paginated & Filtered)
    getAllPortfolio: builder.query<
      PortfolioPaginatedResponse,
      PortfolioQueryParams | void
    >({
      query: (params) => ({
        url: PORTFOLIO_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.portfolio],
    }),

    // 3. GET ACTIVE PORTFOLIO ITEMS (public portfolio page)
    getActivePortfolio: builder.query<ActivePortfolioResponse, void>({
      query: () => ({
        url: `${PORTFOLIO_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio],
    }),

    // 4. GET SINGLE PORTFOLIO ITEM BY ID
    getSinglePortfolio: builder.query<ApiResponse<PortfolioItem>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio],
    }),

    // 5. UPDATE PORTFOLIO ITEM
    updatePortfolio: builder.mutation<
      ApiResponse<PortfolioItem>,
      UpdatePortfolioRequest
    >({
      query: ({ id, data }) => ({
        url: `${PORTFOLIO_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),

    // 6. DELETE PORTFOLIO ITEM
    deletePortfolio: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreatePortfolioMutation,
  useGetAllPortfolioQuery,
  useGetActivePortfolioQuery,
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
