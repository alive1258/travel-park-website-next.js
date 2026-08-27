"use client";

/* eslint-disable react-hooks/incompatible-library */

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateAboutStatMutation } from "@/src/redux/api/aboutStatApi";

interface AddAboutStatFormValues {
  value: string;
  label: string;
  position?: number;
  is_active: boolean;
}

const ALL_ABOUT_STATS_PATH = "/dashboard/about-stats/all-about-stats";

const AddAboutStat = () => {
  const router = useRouter();

  const [createAboutStat, { isLoading }] = useCreateAboutStatMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddAboutStatFormValues>({
    defaultValues: {
      value: "",
      label: "",
      position: 1,
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<AddAboutStatFormValues> = async (values) => {
    try {
      await createAboutStat({
        value: values.value,
        label: values.label,
        position:
          values.position !== undefined && !isNaN(values.position)
            ? values.position
            : undefined,
        is_active: values.is_active,
      }).unwrap();

      toast.success("Stat created successfully!");
      reset();
      router.push(ALL_ABOUT_STATS_PATH);
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
        title="Add About Stat"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "About Stats", link: ALL_ABOUT_STATS_PATH },
          { title: "Add Stat" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value */}
          <Input
            label="Value"
            text="value"
            placeholder="12+"
            register={register("value", { required: "Value is required" })}
            errors={errors}
          />

          {/* Label */}
          <Input
            label="Label"
            text="label"
            placeholder="Years Chartering"
            register={register("label", { required: "Label is required" })}
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
              Active (visible on About page)
            </label>
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
            text={isLoading ? "Saving..." : "Create Stat"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAboutStat;
