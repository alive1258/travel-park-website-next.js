"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Star } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateClientVideoReviewMutation } from "@/src/redux/api/clientVideoReviewApi";

interface AddClientVideoReviewFormValues {
  name: string;
  designation?: string;
  description: string;
  rating: number;
  video_url: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_PATH = "/dashboard/client-video-reviews/all-client-video-reviews";

const AddClientVideoReview = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const [createClientVideoReview, { isLoading }] =
    useCreateClientVideoReviewMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddClientVideoReviewFormValues>({
    defaultValues: {
      name: "",
      designation: "",
      description: "",
      rating: 5,
      video_url: "",
      position: 1,
      is_active: true,
    },
  });

  const ratingValue = watch("rating", 5);
  const imageFileList = watch("image");

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<AddClientVideoReviewFormValues> = async (
    values,
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rating", String(values.rating));
      formData.append("video_url", values.video_url);
      formData.append("is_active", String(values.is_active));

      if (values.designation)
        formData.append("designation", values.designation);

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

      await createClientVideoReview(formData).unwrap();
      toast.success("Client video review created successfully!");
      reset();
      setImagePreview(null);
      router.push(ALL_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Add Client Video Review"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Client Video Reviews", link: ALL_PATH },
          { title: "Add Video Review" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Name */}
          <Input
            label="Client Name"
            text="name"
            placeholder="Jasim"
            register={register("name", {
              required: "Client name is required",
            })}
            errors={errors}
          />

          {/* Designation */}
          <Input
            label="Designation (Optional)"
            text="designation"
            placeholder="Patient"
            register={register("designation")}
            errors={errors}
            required={false}
          />

          {/* Video URL */}
          <Input
            label="Video URL"
            text="video_url"
            placeholder="https://www.youtube.com/watch?v=..."
            register={register("video_url", {
              required: "Video URL is required",
            })}
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

          {/* Star Rating Selection */}
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

          {/* Quote */}
          <Textarea
            label="Short Quote"
            text="description"
            placeholder="He caught something two other doctors missed."
            register={register("description", {
              required: "Quote cannot be empty",
            })}
            errors={errors}
            required
            rows={4}
            className="col-span-full"
          />

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Client Photo (Optional)
            </label>

            {imagePreview && (
              <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Client Photo Preview"
                  fill
                  className=""
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-full
              file:border-0
              file:font-semibold
              file:bg-emerald-50
              file:text-emerald-700
              hover:file:bg-emerald-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Create Video Review"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddClientVideoReview;
