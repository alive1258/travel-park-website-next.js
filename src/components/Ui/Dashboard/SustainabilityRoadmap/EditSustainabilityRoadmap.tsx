"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleSustainabilityRoadmapQuery,
  useUpdateSustainabilityRoadmapMutation,
} from "@/src/redux/api/sustainabilityRoadmapApi";

interface EditSustainabilityRoadmapProps {
  id: string;
}

interface EditSustainabilityRoadmapFormValues {
  year: string;
  milestone: string;
  position?: number;
  is_active: boolean;
}

const ALL_SUSTAINABILITY_ROADMAP_PATH =
  "/dashboard/sustainability-roadmap/all-sustainability-roadmap";

const EditSustainabilityRoadmap: React.FC<EditSustainabilityRoadmapProps> = ({
  id,
}) => {
  const router = useRouter();

  const { data: itemData, isLoading: isFetching } =
    useGetSingleSustainabilityRoadmapQuery(id);
  const [updateSustainabilityRoadmap, { isLoading: isUpdating }] =
    useUpdateSustainabilityRoadmapMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSustainabilityRoadmapFormValues>();

  useEffect(() => {
    if (itemData?.data) {
      const item = itemData.data;
      reset({
        year: item.year || "",
        milestone: item.milestone || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });
    }
  }, [itemData, reset]);

  const onSubmit: SubmitHandler<EditSustainabilityRoadmapFormValues> = async (
    values,
  ) => {
    try {
      await updateSustainabilityRoadmap({
        id,
        data: {
          year: values.year,
          milestone: values.milestone,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Roadmap item updated successfully!");
      router.push(ALL_SUSTAINABILITY_ROADMAP_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update roadmap item.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading roadmap item...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Roadmap Item"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          {
            title: "Sustainability Roadmap",
            link: ALL_SUSTAINABILITY_ROADMAP_PATH,
          },
          { title: "Edit Item" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year */}
          <Input
            label="Year"
            text="year"
            register={register("year", { required: "Year is required" })}
            errors={errors}
          />

          {/* Position */}
          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-700"
            >
              Active (visible on Sustainability page)
            </label>
          </div>

          {/* Milestone */}
          <div className="col-span-full flex flex-col gap-1">
            <label
              htmlFor="milestone"
              className="text-sm font-medium text-gray-700"
            >
              Milestone
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              id="milestone"
              rows={3}
              {...register("milestone", {
                required: "Milestone is required",
              })}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white ${
                errors.milestone ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.milestone?.message && (
              <span className="text-xs text-red-500">
                {String(errors.milestone.message)}
              </span>
            )}
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Item"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSustainabilityRoadmap;
