"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/src/redux/api/eventApi";

interface EditEventProps {
  id: string;
}

interface EditEventFormValues {
  name: string;
  date_range: string;
  location: string;
  description: string;
  yacht: string;
  position?: number;
  is_active: boolean;
}

const ALL_EVENTS_PATH = "/dashboard/events/all-events";

const EditEvent: React.FC<EditEventProps> = ({ id }) => {
  const router = useRouter();

  const { data: eventData, isLoading: isFetching } = useGetSingleEventQuery(id);
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditEventFormValues>();

  useEffect(() => {
    if (eventData?.data) {
      const item = eventData.data;
      reset({
        name: item.name || "",
        date_range: item.date_range || "",
        location: item.location || "",
        description: item.description || "",
        yacht: item.yacht || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });
    }
  }, [eventData, reset]);

  const onSubmit: SubmitHandler<EditEventFormValues> = async (values) => {
    try {
      await updateEvent({
        id,
        data: {
          name: values.name,
          date_range: values.date_range,
          location: values.location,
          description: values.description,
          yacht: values.yacht,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Event updated successfully!");
      router.push(ALL_EVENTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update event.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading event details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Event"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Events & Boat Shows", link: ALL_EVENTS_PATH },
          { title: "Edit Event" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Event Name"
            text="name"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          {/* Date Range */}
          <Input
            label="Date Range"
            text="date_range"
            register={register("date_range", {
              required: "Date range is required",
            })}
            errors={errors}
          />

          {/* Location */}
          <Input
            label="Location"
            text="location"
            register={register("location", {
              required: "Location is required",
            })}
            errors={errors}
          />

          {/* Yacht */}
          <Input
            label="Yacht(s)"
            text="yacht"
            register={register("yacht", { required: "Yacht is required" })}
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
              Active (visible on Events page)
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
            text={isUpdating ? "Updating..." : "Update Event"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
