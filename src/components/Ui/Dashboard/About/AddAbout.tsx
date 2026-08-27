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
import { AboutInfoItem } from "@/src/types/aboutType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateAboutMutation } from "@/src/redux/api/aboutApi";

interface AddAboutFormValues {
  eyebrow?: string;
  name: string;
  title: string;
  specialty: string;
  registration?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_ABOUT_PATH = "/dashboard/about/all-about";

const AddAbout = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [bio, setBio] = useState<string[]>([]);
  const [bioInput, setBioInput] = useState("");

  const [info, setInfo] = useState<AboutInfoItem[]>([]);
  const [infoIcon, setInfoIcon] = useState("");
  const [infoLabel, setInfoLabel] = useState("");
  const [infoValue, setInfoValue] = useState("");

  const [createAbout, { isLoading }] = useCreateAboutMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddAboutFormValues>({
    defaultValues: {
      eyebrow: "About The Doctor",
      name: "",
      title: "",
      specialty: "",
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

  const handleAddBio = () => {
    const value = bioInput.trim();
    if (!value) return;
    setBio((prev) => [...prev, value]);
    setBioInput("");
  };

  const handleRemoveBio = (index: number) => {
    setBio((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInfo = () => {
    if (!infoIcon.trim() || !infoLabel.trim() || !infoValue.trim()) return;
    setInfo((prev) => [
      ...prev,
      {
        icon: infoIcon.trim(),
        label: infoLabel.trim(),
        value: infoValue.trim(),
      },
    ]);
    setInfoIcon("");
    setInfoLabel("");
    setInfoValue("");
  };

  const handleRemoveInfo = (index: number) => {
    setInfo((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<AddAboutFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("title", values.title);
      formData.append("specialty", values.specialty);
      formData.append("is_active", String(values.is_active));

      if (values.eyebrow) formData.append("eyebrow", values.eyebrow);
      if (values.registration)
        formData.append("registration", values.registration);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (bio.length > 0) {
        formData.append("bio", JSON.stringify(bio));
      }
      if (info.length > 0) {
        formData.append("info", JSON.stringify(info));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createAbout(formData).unwrap();
      toast.success("About section created successfully!");
      reset();
      setImagePreview(null);
      setBio([]);
      setInfo([]);
      router.push(ALL_ABOUT_PATH);
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
        title="Add About Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "About Section", link: ALL_ABOUT_PATH },
          { title: "Add About" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="About The Doctor"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          {/* Name */}
          <Input
            label="Name"
            text="name"
            placeholder="Dr. Anarul Islam"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          {/* Title */}
          <Input
            label="Title (Qualifications)"
            text="title"
            placeholder="MBBS (DU), MS Neurosurgery (Course)"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Specialty */}
          <Input
            label="Specialty"
            text="specialty"
            placeholder="Neurosurgery & General Medicine"
            register={register("specialty", {
              required: "Specialty is required",
            })}
            errors={errors}
          />

          {/* Registration */}
          <Input
            label="Registration (Optional)"
            text="registration"
            placeholder="BMDC Reg. No. — 12345"
            register={register("registration")}
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

          {/* Bio Paragraphs */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Bio Paragraphs (Optional)
            </label>

            {bio.length > 0 && (
              <div className="space-y-2">
                {bio.map((paragraph, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <p className="flex-1 text-sm text-gray-700">{paragraph}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveBio(index)}
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
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Add a bio paragraph..."
                rows={2}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddBio}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Info Grid (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Icon name uses Lucide icon names, e.g. &quot;GraduationCap&quot;,
              &quot;Briefcase&quot;, &quot;Languages&quot;.
            </p>

            {info.length > 0 && (
              <div className="space-y-2">
                {info.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-3 gap-2 text-sm">
                      <span className="text-gray-500">{item.icon}</span>
                      <span className="font-medium text-gray-800">
                        {item.label}
                      </span>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInfo(index)}
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
                value={infoIcon}
                onChange={(e) => setInfoIcon(e.target.value)}
                placeholder="Icon (e.g. GraduationCap)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={infoLabel}
                onChange={(e) => setInfoLabel(e.target.value)}
                placeholder="Label (e.g. Qualifications)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={infoValue}
                onChange={(e) => setInfoValue(e.target.value)}
                placeholder="Value (e.g. MBBS (DU), CMU)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddInfo}
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
              Doctor Photo
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="About Photo Preview"
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
            text={isLoading ? "Saving..." : "Create About"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAbout;
