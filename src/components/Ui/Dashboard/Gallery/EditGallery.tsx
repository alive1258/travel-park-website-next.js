"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleGalleryItemQuery,
  useUpdateGalleryItemMutation,
} from "@/src/redux/api/galleryApi";

interface EditGalleryProps {
  id: string;
}

interface EditGalleryFormValues {
  title: string;
  description: string;
  position?: number;
  is_active: boolean;
}

const ALL_GALLERY_PATH = "/dashboard/gallery/all-gallery";

const EditGallery: React.FC<EditGalleryProps> = ({ id }) => {
  const router = useRouter();

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const { data: galleryData, isLoading: isFetching } =
    useGetSingleGalleryItemQuery(id);
  const [updateGalleryItem, { isLoading: isUpdating }] =
    useUpdateGalleryItemMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditGalleryFormValues>();

  useEffect(() => {
    if (galleryData?.data) {
      const item = galleryData.data;
      reset({
        title: item.title || "",
        description: item.description || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setExistingImages(item.images || []);
    }
  }, [galleryData, reset]);

  useEffect(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setNewPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setNewImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<EditGalleryFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("is_active", String(values.is_active));

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      // Uploading new images replaces the entire existing set (backend
      // behavior) — if none were picked, existing images are left as-is.
      newImages.forEach((file) => formData.append("images", file));

      await updateGalleryItem({ id, data: formData }).unwrap();
      toast.success("Gallery item updated successfully!");
      router.push(ALL_GALLERY_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update gallery item.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading gallery item details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Gallery Item"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Gallery", link: ALL_GALLERY_PATH },
          { title: "Edit Gallery Item" },
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
              Active (visible on homepage)
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

          {/* Current Images */}
          {existingImages.length > 0 && (
            <div className="col-span-full flex flex-col gap-2">
              <label className="font-semibold text-sm text-gray-700">
                Current Images
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {existingImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <Image
                      src={src}
                      alt={`Existing image ${index + 1}`}
                      fill
                      className=""
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Replace Images
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Selecting new images here replaces{" "}
              <span className="font-medium">all</span> current images. Leave
              empty to keep the existing ones.
            </p>

            {newPreviews.length > 0 && (
              <div className="mb-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {newPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <Image
                      src={src}
                      alt={`New preview ${index + 1}`}
                      fill
                      className=""
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                      title="Remove"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {newPreviews.length === 0 && (
              <div className="mb-4 h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <Upload size={20} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImagesChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:font-semibold file:bg-emerald-50
              file:text-emerald-700 hover:file:bg-emerald-100
              cursor-pointer"
            />
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
            text={isUpdating ? "Updating..." : "Update Gallery Item"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditGallery;
