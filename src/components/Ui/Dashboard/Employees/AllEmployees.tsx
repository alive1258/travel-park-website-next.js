"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Pencil, ShieldCheck } from "lucide-react";
import Pagination from "@/src/utils/Pagination";
import { useAppSelector } from "@/src/redux/hooks";
import { ApiError } from "@/src/types/authType";
import { hasPermission } from "@/src/utils/permissions";
import {
  useDeactivateEmployeeMutation,
  useReactivateEmployeeMutation,
  useGetEmployeesQuery,
} from "@/src/redux/api/employeesApi";

const LIMIT = 10;

const AllEmployees: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const permissions = useAppSelector((state) => state.auth.permissions);
  const roleInfo = useAppSelector((state) => state.auth.roleInfo);
  // Create/activate/deactivate are Super-Admin-exclusive (provisioning
  // system access is not a delegable permission, matches backend's
  // @SuperAdminOnly()) — not gated by the "employees" menu's toggles.
  const canCreate = !!roleInfo?.isSuperAdmin;
  const canToggleStatus = !!roleInfo?.isSuperAdmin;
  const canUpdate = hasPermission(permissions, "employees", "edit");
  const showActionsColumn = canUpdate;

  const { data, isLoading, isFetching, refetch } = useGetEmployeesQuery({
    page: currentPage,
    limit: LIMIT,
  });

  const [deactivateEmployee, { isLoading: isDeactivating }] =
    useDeactivateEmployeeMutation();
  const [reactivateEmployee, { isLoading: isReactivating }] =
    useReactivateEmployeeMutation();
  const isTogglingStatus = isDeactivating || isReactivating;

  const employees = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);

  const handleToggleStatus = async (
    employeeName: string,
    id: string,
    currentlyActive: boolean,
  ) => {
    if (currentlyActive) {
      const result = await Swal.fire({
        title: "Deactivate this staff account?",
        text: `${employeeName} will no longer be able to sign in.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate",
        cancelButtonText: "Cancel",
      });
      if (!result.isConfirmed) return;

      try {
        await deactivateEmployee(id).unwrap();
        await Swal.fire({
          icon: "success",
          title: "Deactivated",
          timer: 1200,
          showConfirmButton: false,
        });
        refetch();
      } catch (err) {
        const error = err as ApiError;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.data?.message || error.message || "Deactivation failed",
        });
      }
      return;
    }

    try {
      await reactivateEmployee(id).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Reactivated",
        text: `${employeeName} can sign in again.`,
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.data?.message || error.message || "Reactivation failed",
      });
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">
            Staff accounts with dashboard access
          </p>
        </div>
        {canCreate && (
          <Link
            href="/dashboard/employees/add-employee"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-500">
          No employees yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Staff Code</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Designation</th>
                <th className="px-6 py-3 font-medium">Status</th>
                {showActionsColumn && (
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const isActive = employee.user?.is_active !== false;
                return (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">
                      {employee.staff_code}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {employee.user?.name || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {employee.user?.email}
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <ShieldCheck className="h-3 w-3" />
                        {employee.user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {employee.designation || "—"}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isActive}
                          disabled={!canToggleStatus || isTogglingStatus}
                          onClick={() =>
                            handleToggleStatus(
                              employee.user?.name || employee.user?.email,
                              employee.id,
                              isActive,
                            )
                          }
                          title={
                            canToggleStatus
                              ? isActive
                                ? "Click to deactivate"
                                : "Click to reactivate"
                              : "Only Super Admin can change account status"
                          }
                          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                            isActive ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                              isActive ? "translate-x-4" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-xs font-medium ${
                            isActive ? "text-emerald-700" : "text-red-600"
                          }`}
                        >
                          {isActive ? "Active" : "Deactivated"}
                        </span>
                      </div>
                    </td>
                    {showActionsColumn && (
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-3">
                          {canUpdate && (
                            <Link
                              href={`/dashboard/employees/edit-employee/${employee.id}`}
                              className="inline-flex items-center gap-1 text-[#2AA7FF] hover:text-[#1c8fe0] text-xs font-medium"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={total}
          limit={LIMIT}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default AllEmployees;
