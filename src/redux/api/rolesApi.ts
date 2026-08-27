import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CreateRoleRequest,
  Role,
  RolePaginatedResponse,
  RolePermissionMatrixRow,
  RoleQueryParams,
  UpdateRoleRequest,
  UpsertRolePermissionsRequest,
} from "@/src/types/roleType";

const ROLES_URL = "/roles";

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ROLE
    createRole: builder.mutation<ApiResponse<Role>, CreateRoleRequest>({
      query: (data) => ({
        url: ROLES_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.roles],
    }),

    // 2. GET ALL ROLES (Paginated & Filtered, for admin management)
    getAllRoles: builder.query<RolePaginatedResponse, RoleQueryParams | void>({
      query: (params) => ({
        url: ROLES_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.roles],
    }),

    // 3. GET SINGLE ROLE BY ID
    getSingleRole: builder.query<ApiResponse<Role>, string>({
      query: (id) => ({
        url: `${ROLES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.roles],
    }),

    // 4. UPDATE ROLE
    updateRole: builder.mutation<ApiResponse<Role>, UpdateRoleRequest>({
      query: ({ id, data }) => ({
        url: `${ROLES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.roles],
    }),

    // 5. DELETE ROLE
    deleteRole: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ROLES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.roles],
    }),

    // 6. GET ROLE PERMISSION MATRIX
    getRolePermissionMatrix: builder.query<
      ApiResponse<RolePermissionMatrixRow[]>,
      string
    >({
      query: (id) => ({
        url: `${ROLES_URL}/${id}/permissions`,
        method: "GET",
      }),
      providesTags: [tagTypes.roles],
    }),

    // 7. UPSERT ROLE PERMISSION MATRIX (bulk)
    upsertRolePermissionMatrix: builder.mutation<
      ApiResponse<RolePermissionMatrixRow[]>,
      UpsertRolePermissionsRequest
    >({
      query: ({ id, data }) => ({
        url: `${ROLES_URL}/${id}/permissions`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.roles],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRolePermissionMatrixQuery,
  useUpsertRolePermissionMatrixMutation,
} = rolesApi;
