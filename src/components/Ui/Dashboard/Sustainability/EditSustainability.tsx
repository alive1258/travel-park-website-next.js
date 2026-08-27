"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { SustainabilityHighlight } from "@/src/types/sustainabilityType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSingleSustainabilityQuery,
  useUpdateSustainabilityMutation,
} from "@/src/redux/api/sustainabilityApi";

interface EditSustainabilityProps {
  id: string;
}

interface EditSustainabilityFormValues {
  title: string;
  label?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  badge_text?: string;
  badge_icon?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_SUSTAINABILITY_PATH = "/dashboard/sustainability/all-sustainability";

const EditSustainability = ({ id }: EditSustainabilityProps) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [highlights, setHighlights] = useState<SustainabilityHighlight[]>([]);
  const [highlightIcon, setHighlightIcon] = useState("");
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightDescription, setHighlightDescription] = useState("");
  const [highlightError, setHighlightError] = useState("");

  const { data: sustainabilityData, isLoading: isFetching } =
    useGetSingleSustainabilityQuery(id);
  const [updateSustainability, { isLoading: isUpdating }] =
    useUpdateSustainabilityMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditSustainabilityFormValues>();

  const imageFileList = watch("image");

  // Preview swaps to the newly chosen file; when the field is empty
  // (initial load, or no re-selection), the existing image URL set below
  // from `sustainabilityData` stays put instead of being cleared.
  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  useEffect(() => {
    if (sustainabilityData?.data) {
      const item = sustainabilityData.data;
      reset({
        title: item.title || "",
        label: item.label || "",
        description: item.description || "",
        button_text: item.button_text || "",
        button_link: item.button_link || "",
        badge_text: item.badge_text || "",
        badge_icon: item.badge_icon || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setHighlights(item.highlights || []);

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [sustainabilityData, reset]);

  const handleAddHighlight = () => {
    const missing: string[] = [];
    if (!highlightIcon.trim()) missing.push("Icon");
    if (!highlightTitle.trim()) missing.push("Title");
    if (!highlightDescription.trim()) missing.push("Description");

    if (missing.length > 0) {
      setHighlightError(`${missing.join(", ")} ${missing.length > 1 ? "are" : "is"} required to add a highlight.`);
      return;
    }

    setHighlights((prev) => [
      ...prev,
      {
        icon: highlightIcon.trim(),
        title: highlightTitle.trim(),
        description: highlightDescription.trim(),
      },
    ]);
    setHighlightIcon("");
    setHighlightTitle("");
    setHighlightDescription("");
    setHighlightError("");
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHighlightKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleAddHighlight();
  };

  const onSubmit: SubmitHandler<EditSustainabilityFormValues> = async (
    values,
  ) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.label) formData.append("label", values.label);
      if (values.description)
        formData.append("description", values.description);
      if (values.button_text)
        formData.append("button_text", values.button_text);
      if (values.button_link)
        formData.append("button_link", values.button_link);
      if (values.badge_text)
        formData.append("badge_text", values.badge_text);
      if (values.badge_icon)
        formData.append("badge_icon", values.badge_icon);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      // Always send highlights so removals persist (an empty array still
      // needs to reach the backend to clear previously saved values).
      formData.append("highlights", JSON.stringify(highlights));

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updateSustainability({ id, data: formData }).unwrap();
      toast.success("Sustainability section updated successfully!");
      router.push(ALL_SUSTAINABILITY_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update sustainability section.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading sustainability details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Sustainability Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Sustainability Section", link: ALL_SUSTAINABILITY_PATH },
          { title: "Edit Sustainability" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Label */}
          <Input
            label="Eyebrow Label (Optional)"
            text="label"
            register={register("label")}
            errors={errors}
            required={false}
          />

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

          {/* CTA Button */}
          <Input
            label="Button Text"
            text="button_text"
            register={register("button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Button Link"
            text="button_link"
            register={register("button_link")}
            errors={errors}
            required={false}
          />

          {/* Badge */}
          <Input
            label="Floating Badge Text (Optional)"
            text="badge_text"
            register={register("badge_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Floating Badge Icon (Optional)"
            text="badge_icon"
            register={register("badge_icon")}
            errors={errors}
            required={false}
          />

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
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

          {/* Highlights */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Highlights (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Bullet points shown with the section (e.g. Hybrid & Electric
              Yachts). Icon name uses Lucide icon names, e.g.
              &quot;Zap&quot;, &quot;Recycle&quot;, &quot;HeartHandshake&quot;,
              &quot;Droplets&quot;.
            </p>

            {highlights.length > 0 && (
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={`${highlight.title}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-3 gap-2 text-sm">
                      <span className="text-gray-500">{highlight.icon}</span>
                      <span className="font-medium text-gray-800">
                        {highlight.title}
                      </span>
                      <span className="text-gray-600 truncate">
                        {highlight.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(index)}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={highlightIcon}
                onChange={(e) => {
                  setHighlightIcon(e.target.value);
                  setHighlightError("");
                }}
                onKeyDown={handleHighlightKeyDown}
                placeholder="Icon (e.g. Zap)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={highlightTitle}
                onChange={(e) => {
                  setHighlightTitle(e.target.value);
                  setHighlightError("");
                }}
                onKeyDown={handleHighlightKeyDown}
                placeholder="Title (e.g. Hybrid & Electric-Powered Yachts)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={highlightDescription}
                onChange={(e) => {
                  setHighlightDescription(e.target.value);
                  setHighlightError("");
                }}
                onKeyDown={handleHighlightKeyDown}
                placeholder="Description"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            {highlightError && (
              <p className="text-xs text-red-500">{highlightError}</p>
            )}
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Feature Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Sustainability Feature Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-full max-w-sm rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
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
            text={isUpdating ? "Updating..." : "Update Section"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSustainability;
