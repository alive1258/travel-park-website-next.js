"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import { useCreateRoleMutation } from "@/src/redux/api/rolesApi";
import { CreateRoleRequest } from "@/src/types/roleType";
import { ApiError } from "@/src/types/authType";

interface AddRoleFormValues {
  name: string;
  description?: string;
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA7FF] focus:border-[#2AA7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

const AddRole: React.FC = () => {
  const router = useRouter();
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRoleFormValues>();

  const onSubmit: SubmitHandler<AddRoleFormValues> = async (values) => {
    try {
      const payload: CreateRoleRequest = {
        name: values.name,
        description: values.description || undefined,
      };

      const res = await createRole(payload).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Role created",
        text: "Now set up its permissions below.",
        timer: 1500,
        showConfirmButton: false,
      });

      const newRoleId = res.data?.id;
      if (newRoleId) {
        router.push(`/dashboard/roles/edit-role/${newRoleId}`);
      } else {
        router.push("/dashboard/roles/all-roles");
      }
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Could not create role",
        text: error.data?.message || error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-2xl">
      <Link
        href="/dashboard/roles/all-roles"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to roles
      </Link>

      <h1 className="text-lg font-semibold text-gray-900 mb-1">Add Role</h1>
      <p className="text-sm text-gray-500 mb-6">
        After creating the role, you&apos;ll be taken to its permission
        matrix to configure access.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
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
            Description
          </label>
          <textarea
            rows={4}
            className={inputClass}
            disabled={isLoading}
            {...register("description")}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create Role"}
        </button>
      </form>
    </div>
  );
};

export default AddRole;
