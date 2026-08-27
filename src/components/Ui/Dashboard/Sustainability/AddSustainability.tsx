"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { SustainabilityHighlight } from "@/src/types/sustainabilityType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateSustainabilityMutation } from "@/src/redux/api/sustainabilityApi";

interface AddSustainabilityFormValues {
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

const AddSustainability = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [highlights, setHighlights] = useState<SustainabilityHighlight[]>([]);
  const [highlightIcon, setHighlightIcon] = useState("");
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightDescription, setHighlightDescription] = useState("");
  const [highlightError, setHighlightError] = useState("");

  const [createSustainability, { isLoading }] =
    useCreateSustainabilityMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddSustainabilityFormValues>({
    defaultValues: {
      title: "",
      button_text: "Go Sustainable",
      button_link: "#experiences",
      badge_text: "Eco Certified",
      badge_icon: "ShieldCheck",
      position: 1,
      is_active: true,
    },
  });

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

  const onSubmit: SubmitHandler<AddSustainabilityFormValues> = async (
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

      if (highlights.length > 0) {
        formData.append("highlights", JSON.stringify(highlights));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createSustainability(formData).unwrap();
      toast.success("Sustainability section created successfully!");
      reset();
      setImagePreview(null);
      setHighlights([]);
      router.push(ALL_SUSTAINABILITY_PATH);
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
        title="Add Sustainability Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Sustainability Section", link: ALL_SUSTAINABILITY_PATH },
          { title: "Add Sustainability" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Label */}
          <Input
            label="Eyebrow Label (Optional)"
            text="label"
            placeholder="A Greener Way to Sail"
            register={register("label")}
            errors={errors}
            required={false}
          />

          {/* Title */}
          <Input
            label="Title"
            text="title"
            placeholder="Luxury that Cares for Our Planet"
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
            placeholder="Go Sustainable"
            register={register("button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Button Link"
            text="button_link"
            placeholder="#experiences"
            register={register("button_link")}
            errors={errors}
            required={false}
          />

          {/* Badge */}
          <Input
            label="Floating Badge Text (Optional)"
            text="badge_text"
            placeholder="Eco Certified"
            register={register("badge_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Floating Badge Icon (Optional)"
            text="badge_icon"
            placeholder="ShieldCheck"
            register={register("badge_icon")}
            errors={errors}
            required={false}
          />

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            placeholder="We believe unforgettable travel shouldn't cost the earth..."
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
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Feature Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-48 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Sustainability Feature Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mb-4 h-48 w-full max-w-md rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
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
            text={isLoading ? "Saving..." : "Create Section"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddSustainability;
