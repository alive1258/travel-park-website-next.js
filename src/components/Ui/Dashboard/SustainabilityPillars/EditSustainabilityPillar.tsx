"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import {
  SUSTAINABILITY_PILLAR_ICONS,
  SustainabilityPillarIcon,
} from "@/src/types/sustainabilityPillarType";
import { SUSTAINABILITY_PILLAR_ICON_MAP } from "@/src/utils/sustainabilityPillarIcons";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleSustainabilityPillarQuery,
  useUpdateSustainabilityPillarMutation,
} from "@/src/redux/api/sustainabilityPillarApi";

interface EditSustainabilityPillarProps {
  id: string;
}

interface EditSustainabilityPillarFormValues {
  title: string;
  description: string;
  icon: SustainabilityPillarIcon;
  position?: number;
  is_active: boolean;
}

const ALL_SUSTAINABILITY_PILLARS_PATH =
  "/dashboard/sustainability-pillars/all-sustainability-pillars";

const EditSustainabilityPillar: React.FC<EditSustainabilityPillarProps> = ({
  id,
}) => {
  const router = useRouter();

  const { data: pillarData, isLoading: isFetching } =
    useGetSingleSustainabilityPillarQuery(id);
  const [updateSustainabilityPillar, { isLoading: isUpdating }] =
    useUpdateSustainabilityPillarMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditSustainabilityPillarFormValues>();

  const selectedIcon = watch("icon");
  const PreviewIcon = selectedIcon
    ? SUSTAINABILITY_PILLAR_ICON_MAP[selectedIcon]
    : null;

  useEffect(() => {
    if (pillarData?.data) {
      const item = pillarData.data;
      reset({
        title: item.title || "",
        description: item.description || "",
        icon: item.icon,
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });
    }
  }, [pillarData, reset]);

  const onSubmit: SubmitHandler<EditSustainabilityPillarFormValues> = async (
    values,
  ) => {
    try {
      await updateSustainabilityPillar({
        id,
        data: {
          title: values.title,
          description: values.description,
          icon: values.icon,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Pillar updated successfully!");
      router.push(ALL_SUSTAINABILITY_PILLARS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update pillar.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading pillar details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Sustainability Pillar"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          {
            title: "Sustainability Pillars",
            link: ALL_SUSTAINABILITY_PILLARS_PATH,
          },
          { title: "Edit Pillar" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Icon */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="icon"
              className="text-sm font-medium text-gray-700"
            >
              Icon
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center gap-3">
              <select
                id="icon"
                {...register("icon", { required: "Icon is required" })}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white ${
                  errors.icon ? "border-red-400" : "border-gray-300"
                }`}
              >
                {SUSTAINABILITY_PILLAR_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                {PreviewIcon && <PreviewIcon size={20} />}
              </div>
            </div>
            {errors.icon?.message && (
              <span className="text-xs text-red-500">
                {String(errors.icon.message)}
              </span>
            )}
          </div>

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

          {/* Description */}
          <div className="col-span-full flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white ${
                errors.description ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.description?.message && (
              <span className="text-xs text-red-500">
                {String(errors.description.message)}
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
            text={isUpdating ? "Updating..." : "Update Pillar"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSustainabilityPillar;
