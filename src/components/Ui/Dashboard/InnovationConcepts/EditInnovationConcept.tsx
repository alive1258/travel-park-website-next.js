"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleInnovationConceptQuery,
  useUpdateInnovationConceptMutation,
} from "@/src/redux/api/innovationConceptApi";

interface EditInnovationConceptProps {
  id: string;
}

interface EditInnovationConceptFormValues {
  name: string;
  description: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_INNOVATION_CONCEPTS_PATH =
  "/dashboard/innovation-concepts/all-innovation-concepts";

const EditInnovationConcept: React.FC<EditInnovationConceptProps> = ({
  id,
}) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: conceptData, isLoading: isFetching } =
    useGetSingleInnovationConceptQuery(id);
  const [updateInnovationConcept, { isLoading: isUpdating }] =
    useUpdateInnovationConceptMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditInnovationConceptFormValues>();

  const imageFileList = watch("image");

  // Preview swaps to the newly chosen file; when the field is empty
  // (initial load, or no re-selection), the existing image URL set below
  // from `conceptData` stays put instead of being cleared.
  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  useEffect(() => {
    if (conceptData?.data) {
      const item = conceptData.data;
      reset({
        name: item.name || "",
        description: item.description || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [conceptData, reset]);

  const onSubmit: SubmitHandler<EditInnovationConceptFormValues> = async (
    values,
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("is_active", String(values.is_active));

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updateInnovationConcept({ id, data: formData }).unwrap();
      toast.success("Concept updated successfully!");
      router.push(ALL_INNOVATION_CONCEPTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update concept.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading concept details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Innovation Concept"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          {
            title: "Innovation Concepts",
            link: ALL_INNOVATION_CONCEPTS_PATH,
          },
          { title: "Edit Concept" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Concept Name"
            text="name"
            register={register("name", { required: "Name is required" })}
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
              Active (visible on Fleet page)
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

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Concept Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Concept Image Preview"
                    fill
                    className=""
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-28 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
                  <Upload size={24} />
                </div>
              )}

              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:font-semibold file:bg-emerald-50
                  file:text-emerald-700 hover:file:bg-emerald-100
                  cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Allowed formats: JPG, PNG, WEBP.
                </p>
              </div>
            </div>
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
            text={isUpdating ? "Updating..." : "Update Concept"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditInnovationConcept;
