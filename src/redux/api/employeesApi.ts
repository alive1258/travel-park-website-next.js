import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EMPLOYEES_URL = "/employees";

export interface EmployeeUser {
  id: string;
  name?: string;
  email: string;
  mobile?: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
}

export interface Employee {
  id: string;
  user_id: string;
  staff_code: string;
  designation?: string;
  department?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  user: EmployeeUser;
}

export interface EmployeeListResponse {
  success: boolean;
  message: string;
  data: {
    data: Employee[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data: Employee;
}

export interface CreateEmployeeRequest {
  name: string;
  mobile: string;
  email: string;
  password: string;
  role_id: string;
  designation?: string;
  department?: string;
}

export interface UpdateEmployeeRequest {
  designation?: string;
  department?: string;
}

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeeListResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: EMPLOYEES_URL,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: [tagTypes.employees],
    }),

    getEmployee: builder.query<EmployeeResponse, string>({
      query: (id) => ({
        url: `${EMPLOYEES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.employees],
    }),

    createEmployee: builder.mutation<EmployeeResponse, CreateEmployeeRequest>({
      query: (data) => ({
        url: EMPLOYEES_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.employees],
    }),

    updateEmployee: builder.mutation<
      EmployeeResponse,
      { id: string; data: UpdateEmployeeRequest }
    >({
      query: ({ id, data }) => ({
        url: `${EMPLOYEES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.employees],
    }),

    deactivateEmployee: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${EMPLOYEES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.employees],
    }),

    reactivateEmployee: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${EMPLOYEES_URL}/${id}/reactivate`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.employees],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeactivateEmployeeMutation,
  useReactivateEmployeeMutation,
} = employeesApi;
