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
  useGetSingleAboutStatQuery,
  useUpdateAboutStatMutation,
} from "@/src/redux/api/aboutStatApi";

interface EditAboutStatProps {
  id: string;
}

interface EditAboutStatFormValues {
  value: string;
  label: string;
  position?: number;
  is_active: boolean;
}

const ALL_ABOUT_STATS_PATH = "/dashboard/about-stats/all-about-stats";

const EditAboutStat: React.FC<EditAboutStatProps> = ({ id }) => {
  const router = useRouter();

  const { data: statData, isLoading: isFetching } =
    useGetSingleAboutStatQuery(id);
  const [updateAboutStat, { isLoading: isUpdating }] =
    useUpdateAboutStatMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAboutStatFormValues>();

  useEffect(() => {
    if (statData?.data) {
      const item = statData.data;
      reset({
        value: item.value || "",
        label: item.label || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });
    }
  }, [statData, reset]);

  const onSubmit: SubmitHandler<EditAboutStatFormValues> = async (values) => {
    try {
      await updateAboutStat({
        id,
        data: {
          value: values.value,
          label: values.label,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Stat updated successfully!");
      router.push(ALL_ABOUT_STATS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update stat.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading stat details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit About Stat"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "About Stats", link: ALL_ABOUT_STATS_PATH },
          { title: "Edit Stat" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value */}
          <Input
            label="Value"
            text="value"
            register={register("value", { required: "Value is required" })}
            errors={errors}
          />

          {/* Label */}
          <Input
            label="Label"
            text="label"
            register={register("label", { required: "Label is required" })}
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
              Active (visible on About page)
            </label>
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
            text={isUpdating ? "Updating..." : "Update Stat"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAboutStat;
