"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { PORTFOLIO_ICONS, PortfolioIcon } from "@/src/types/portfolioType";
import { PORTFOLIO_ICON_MAP } from "@/src/utils/portfolioIcons";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreatePortfolioMutation } from "@/src/redux/api/portfolioApi";

interface AddPortfolioFormValues {
  title: string;
  description: string;
  icon: PortfolioIcon;
  href: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_PORTFOLIO_PATH = "/dashboard/portfolio/all-portfolio";

const AddPortfolio = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createPortfolio, { isLoading }] = useCreatePortfolioMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddPortfolioFormValues>({
    defaultValues: {
      title: "",
      description: "",
      icon: PORTFOLIO_ICONS[0],
      href: "",
      position: 1,
      is_active: true,
    },
  });

  const imageFileList = watch("image");
  const selectedIcon = watch("icon");
  const PreviewIcon = selectedIcon ? PORTFOLIO_ICON_MAP[selectedIcon] : null;

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

  const onSubmit: SubmitHandler<AddPortfolioFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("icon", values.icon);
      formData.append("href", values.href);
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

      await createPortfolio(formData).unwrap();
      toast.success("Portfolio card created successfully!");
      reset();
      setImagePreview(null);
      router.push(ALL_PORTFOLIO_PATH);
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
        title="Add Portfolio Card"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Luxury Charter Portfolio", link: ALL_PORTFOLIO_PATH },
          { title: "Add Card" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Input
            label="Title"
            text="title"
            placeholder="Family Charters"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Link (href) */}
          <Input
            label="Link"
            text="href"
            placeholder="/yachts"
            register={register("href", { required: "Link is required" })}
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
                {PORTFOLIO_ICONS.map((icon) => (
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
              Active (visible on Portfolio page)
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
              placeholder="Shallow-draft tenders, connecting cabins, and itineraries paced for guests of every age..."
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
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Card Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Portfolio Image Preview"
                  fill
                  className=""
                />
              </div>
            ) : (
              <div className="mb-4 h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <Upload size={24} />
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
            text={isLoading ? "Saving..." : "Create Card"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;
