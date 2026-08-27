import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { MenuTreeResponse } from "@/src/types/menuType";

const MENU_URL = "/menu";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Nested, active only — drives the sidebar
    getMenuTree: builder.query<MenuTreeResponse, void>({
      query: () => ({
        url: `${MENU_URL}/tree`,
        method: "GET",
      }),
      providesTags: [tagTypes.menu],
    }),
  }),
});

// Auto-generated hooks for components
export const { useGetMenuTreeQuery } = menuApi;
