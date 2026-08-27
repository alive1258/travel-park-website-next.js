"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ArrowLeft, Eye, EyeOff, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useCreateEmployeeMutation } from "@/src/redux/api/employeesApi";
import { useGetAllRolesQuery } from "@/src/redux/api/rolesApi";
import { ApiError } from "@/src/types/authType";
import { useAppSelector } from "@/src/redux/hooks";

interface AddEmployeeFormValues {
  name: string;
  mobile: string;
  email: string;
  password: string;
  role_id: string;
  designation?: string;
  department?: string;
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA7FF] focus:border-[#2AA7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

const AddEmployee: React.FC = () => {
  const router = useRouter();
  // Employee creation is Super-Admin-exclusive (matches backend's
  // @SuperAdminOnly()), not gated by the "employees" menu's create toggle.
  const isSuperAdmin = useAppSelector((state) => state.auth.roleInfo?.isSuperAdmin);
  const canCreate = !!isSuperAdmin;
  const [showPassword, setShowPassword] = useState(false);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const { data: rolesData, isLoading: isLoadingRoles } = useGetAllRolesQuery();
  // Mirrors the backend guard in employees.service.ts: only staff/dashboard
  // roles that aren't the built-in Super Admin can be assigned here.
  const assignableRoles = (rolesData?.data || []).filter(
    (r) => !r.is_system && r.is_staff,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEmployeeFormValues>();

  const onSubmit: SubmitHandler<AddEmployeeFormValues> = async (values) => {
    try {
      await createEmployee(values).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Employee created",
        text: `${values.name} can now sign in with the email and password you set.`,
        timer: 1800,
        showConfirmButton: false,
      });
      router.push("/dashboard/employees/all-employees");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Could not create employee",
        text: error.data?.message || error.message || "Something went wrong.",
      });
    }
  };

  // Belt-and-suspenders: the "Add Employee" link is already hidden for
  // non-super_admin on the list page, but this route is reachable directly
  // by URL — the backend rejects the request regardless, this just avoids a
  // form that can only ever end in a 403.
  if (!canCreate) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-2xl">
        <Link
          href="/dashboard/employees/all-employees"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to employees
        </Link>
        <div className="flex items-center gap-2 text-amber-600">
          <ShieldAlert className="h-5 w-5" />
          <p className="text-sm font-medium">
            Only super_admin can create employee accounts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-2xl">
      <Link
        href="/dashboard/employees/all-employees"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to employees
      </Link>

      <h1 className="text-lg font-semibold text-gray-900 mb-1">
        Add Employee
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Only super_admin can create staff accounts. New accounts are
        pre-verified and can sign in immediately.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              className={inputClass}
              disabled={isLoading}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </label>
            <input
              className={inputClass}
              disabled={isLoading}
              {...register("mobile", { required: "Mobile is required" })}
            />
            {errors.mobile && (
              <p className="mt-1 text-xs text-red-600">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={inputClass}
            disabled={isLoading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={inputClass + " pr-10"}
              disabled={isLoading}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Min 8 characters with uppercase, lowercase, number & special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className={inputClass}
              disabled={isLoading || isLoadingRoles}
              defaultValue=""
              {...register("role_id", { required: "Role is required" })}
            >
              <option value="" disabled>
                {isLoadingRoles ? "Loading roles..." : "Select a role"}
              </option>
              {assignableRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="mt-1 text-xs text-red-600">
                {errors.role_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              className={inputClass}
              disabled={isLoading}
              placeholder="e.g. Front Desk Coordinator"
              {...register("designation")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            className={inputClass}
            disabled={isLoading}
            placeholder="e.g. Reception"
            {...register("department")}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
