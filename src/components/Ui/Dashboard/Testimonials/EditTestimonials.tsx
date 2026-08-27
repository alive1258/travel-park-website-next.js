"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Star, Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} from "@/src/redux/api/testimonialApi";

interface EditTestimonialsProps {
  id: string;
}

interface EditTestimonialFormValues {
  name: string;
  designation?: string;
  description: string;
  rating: number;
  video_url?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_TESTIMONIALS_PATH = "/dashboard/testimonials/all-testimonials";

const EditTestimonials: React.FC<EditTestimonialsProps> = ({ id }) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const { data: testimonialData, isLoading: isFetching } =
    useGetSingleTestimonialQuery(id);
  const [updateTestimonial, { isLoading: isUpdating }] =
    useUpdateTestimonialMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditTestimonialFormValues>();

  const ratingValue = watch("rating", 5);
  const imageFileList = watch("image");

  useEffect(() => {
    if (testimonialData?.data) {
      const item = testimonialData.data;
      reset({
        name: item.name || "",
        designation: item.designation || "",
        description: item.description || "",
        rating: item.rating ?? 5,
        video_url: item.video_url || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [testimonialData, reset]);

  // Preview swaps to the newly chosen file; when the field is empty
  // (initial load, or no re-selection), the existing image URL set above
  // from `testimonialData` stays put instead of being cleared.
  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<EditTestimonialFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rating", String(values.rating));
      formData.append("is_active", String(values.is_active));

      if (values.designation)
        formData.append("designation", values.designation);
      if (values.video_url) formData.append("video_url", values.video_url);

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

      await updateTestimonial({ id, data: formData }).unwrap();
      toast.success("Testimonial updated successfully!");
      router.push(ALL_TESTIMONIALS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update testimonial.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading testimonial details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Testimonial"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Testimonials", link: ALL_TESTIMONIALS_PATH },
          { title: "Edit Testimonial" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Name */}
          <Input
            label="Patient Name"
            text="name"
            register={register("name", {
              required: "Patient name is required",
            })}
            errors={errors}
          />

          {/* Designation */}
          <Input
            label="Designation (Optional)"
            text="designation"
            register={register("designation")}
            errors={errors}
            required={false}
          />

          {/* Video URL */}
          <Input
            label="Video URL (Optional)"
            text="video_url"
            register={register("video_url")}
            errors={errors}
            required={false}
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

          {/* Interactive Star Rating */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm text-gray-700">
              Rating (1–5)
            </label>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue("rating", star, { shouldValidate: true })
                  }
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="p-1 focus:outline-none transition cursor-pointer"
                >
                  <Star
                    size={22}
                    className={`${
                      star <= (hoveredRating ?? ratingValue)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    } transition`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-700">
                {ratingValue} / 5
              </span>
            </div>
          </div>

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

          {/* Testimonial Message */}
          <Textarea
            label="Testimonial Message"
            text="description"
            placeholder="Write patient testimonial review here..."
            register={register("description", {
              required: "Testimonial description cannot be empty",
            })}
            errors={errors}
            required
            rows={5}
            className="col-span-full"
          />

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Patient Photo
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Patient Photo Preview"
                    fill
                    className=""
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
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
                  Allowed formats: JPG, PNG, WEBP. Recommended size: Square
                  profile picture.
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
            text={isUpdating ? "Updating..." : "Update Testimonial"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTestimonials;
