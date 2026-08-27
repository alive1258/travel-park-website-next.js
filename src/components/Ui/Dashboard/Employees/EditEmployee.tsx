"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/src/redux/api/employeesApi";
import { ApiError } from "@/src/types/authType";

interface EditEmployeeFormValues {
  designation?: string;
  department?: string;
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA7FF] focus:border-[#2AA7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

interface Props {
  id: string;
}

const EditEmployee: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading: isLoadingEmployee } = useGetEmployeeQuery(id);
  const [updateEmployee, { isLoading: isSaving }] = useUpdateEmployeeMutation();

  const { register, handleSubmit, reset } = useForm<EditEmployeeFormValues>();

  const employee = data?.data;

  useEffect(() => {
    if (employee) {
      reset({
        designation: employee.designation ?? "",
        department: employee.department ?? "",
      });
    }
  }, [employee, reset]);

  const onSubmit: SubmitHandler<EditEmployeeFormValues> = async (values) => {
    try {
      await updateEmployee({ id, data: values }).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Employee updated",
        timer: 1200,
        showConfirmButton: false,
      });
      router.push("/dashboard/employees/all-employees");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Could not update employee",
        text: error.data?.message || error.message || "Something went wrong.",
      });
    }
  };

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
        Edit Employee
      </h1>

      {isLoadingEmployee ? (
        <div className="mt-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : !employee ? (
        <p className="mt-6 text-sm text-gray-500">Employee not found.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">
            {employee.user?.name} &middot; {employee.user?.email} &middot;{" "}
            {employee.staff_code}
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Role and account status changes are made from the user&apos;s
            profile — this form covers HR-profile fields only.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                className={inputClass}
                disabled={isSaving}
                placeholder="e.g. Front Desk Coordinator"
                {...register("designation")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                className={inputClass}
                disabled={isSaving}
                placeholder="e.g. Reception"
                {...register("department")}
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditEmployee;
