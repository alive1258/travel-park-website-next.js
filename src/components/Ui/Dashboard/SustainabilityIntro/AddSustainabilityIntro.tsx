"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateSustainabilityIntroMutation } from "@/src/redux/api/sustainabilityIntroApi";

interface AddSustainabilityIntroFormValues {
  eyebrow?: string;
  heading: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_SUSTAINABILITY_INTRO_PATH =
  "/dashboard/sustainability-intro/all-sustainability-intro";

const AddSustainabilityIntro = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [paragraphInput, setParagraphInput] = useState("");

  const [createSustainabilityIntro, { isLoading }] =
    useCreateSustainabilityIntroMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddSustainabilityIntroFormValues>({
    defaultValues: {
      eyebrow: "Why It Matters",
      heading: "",
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

  const handleAddParagraph = () => {
    const value = paragraphInput.trim();
    if (!value) return;
    setParagraphs((prev) => [...prev, value]);
    setParagraphInput("");
  };

  const handleRemoveParagraph = (index: number) => {
    setParagraphs((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<AddSustainabilityIntroFormValues> = async (
    values,
  ) => {
    if (paragraphs.length === 0) {
      Swal.fire({
        title: "Missing Paragraphs",
        text: "Add at least one intro paragraph.",
        icon: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();

      formData.append("heading", values.heading);
      formData.append("is_active", String(values.is_active));
      formData.append("paragraphs", JSON.stringify(paragraphs));

      if (values.eyebrow) formData.append("eyebrow", values.eyebrow);

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

      await createSustainabilityIntro(formData).unwrap();
      toast.success("Sustainability Intro created successfully!");
      reset();
      setImagePreview(null);
      setParagraphs([]);
      router.push(ALL_SUSTAINABILITY_INTRO_PATH);
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
        title="Add Sustainability Intro"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          {
            title: "Sustainability Page Intro",
            link: ALL_SUSTAINABILITY_INTRO_PATH,
          },
          { title: "Add Intro" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="Why It Matters"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          {/* Heading */}
          <Input
            label="Heading"
            text="heading"
            placeholder="Sustainability Isn't an Add-On Here"
            register={register("heading", { required: "Heading is required" })}
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

          {/* Intro Paragraphs */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Intro Paragraphs
              <span className="text-red-500 ml-0.5">*</span>
            </label>

            {paragraphs.length > 0 && (
              <div className="space-y-2">
                {paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <p className="flex-1 text-sm text-gray-700">{paragraph}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(index)}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                value={paragraphInput}
                onChange={(e) => setParagraphInput(e.target.value)}
                placeholder="Add an intro paragraph..."
                rows={3}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddParagraph}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Section Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Sustainability Intro Image Preview"
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
            text={isLoading ? "Saving..." : "Create Intro"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddSustainabilityIntro;
