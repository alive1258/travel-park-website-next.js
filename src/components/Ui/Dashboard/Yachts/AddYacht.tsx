"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload, ImageOff } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import {
  YachtCabinConfigItem,
  YachtRateItem,
} from "@/src/types/yachtAdminType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import StringListEditor from "./StringListEditor";
import CabinConfigEditor from "./CabinConfigEditor";
import RatesEditor from "./RatesEditor";
import { useCreateYachtMutation } from "@/src/redux/api/yachtAdminApi";

interface YachtFormValues {
  slug?: string;
  name: string;
  tagline: string;
  category: string;
  region: string;
  length_ft: number;
  length_m: number;
  built_year: number;
  refit_year: number;
  guests: number;
  cabins: number;
  crew: number;
  price_per_night: number;
  currency: string;
  price_unit: string;
  cruising_speed: number;
  max_speed: number;
  range_nm: number;
  engines: string;
  hull_material: string;
  builder: string;
  position?: number;
  is_active: boolean;
  heroImage?: FileList;
  gallery?: FileList;
  spec_guestsCruising: number;
  spec_guestsSleeping: number;
  spec_staterooms: number;
  spec_crew: number;
  spec_builtYear: number;
  spec_refitYear: number;
  spec_builder: string;
  spec_hullMaterial: string;
  spec_exteriorDesigner: string;
  spec_interiorDesigner: string;
  spec_length: string;
  spec_beam: string;
  spec_draft: string;
  spec_grossTonnage: string;
  spec_cruisingSpeed: string;
  spec_maxSpeed: string;
  spec_range: string;
  spec_engines: string;
  spec_generators: string;
  spec_classification: string;
  spec_flag: string;
}

const ALL_YACHTS_PATH = "/dashboard/yachts/all-yachts";

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="col-span-full border-b border-gray-100 pb-2 pt-4 first:pt-0">
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
    {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
  </div>
);

const AddYacht = () => {
  const router = useRouter();

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [description, setDescription] = useState<string[]>([]);
  const [specialFeatures, setSpecialFeatures] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [cabinConfig, setCabinConfig] = useState<YachtCabinConfigItem[]>([]);
  const [rates, setRates] = useState<YachtRateItem[]>([]);

  const [createYacht, { isLoading }] = useCreateYachtMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<YachtFormValues>({
    defaultValues: {
      currency: "USD",
      price_unit: "per night",
      position: 1,
      is_active: true,
      spec_exteriorDesigner: "Eco Yachts Design Studio",
      spec_interiorDesigner: "Eco Yachts Design Studio",
      spec_generators: "2 x Hybrid-Ready Marine Generators",
      spec_classification: "Lloyd's Register / Green Passport",
      spec_flag: "Malta",
    },
  });

  const heroFileList = watch("heroImage");
  const galleryFileList = watch("gallery");

  useEffect(() => {
    if (heroFileList && heroFileList.length > 0) {
      const objectUrl = URL.createObjectURL(heroFileList[0]);
      setHeroPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setHeroPreview(null);
  }, [heroFileList]);

  useEffect(() => {
    if (galleryFileList && galleryFileList.length > 0) {
      const urls = Array.from(galleryFileList).map((file) =>
        URL.createObjectURL(file),
      );
      setGalleryPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
    setGalleryPreviews([]);
  }, [galleryFileList]);

  const onSubmit: SubmitHandler<YachtFormValues> = async (values) => {
    if (!values.heroImage?.[0]) {
      Swal.fire({
        title: "Missing Hero Image",
        text: "Please upload a hero image for this yacht.",
        icon: "warning",
      });
      return;
    }
    if (description.length === 0) {
      Swal.fire({
        title: "Missing Description",
        text: "Add at least one description paragraph.",
        icon: "warning",
      });
      return;
    }
    if (specialFeatures.length === 0) {
      Swal.fire({
        title: "Missing Special Features",
        text: "Add at least one special feature.",
        icon: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("tagline", values.tagline);
      formData.append("category", values.category);
      formData.append("region", values.region);
      formData.append("length_ft", String(values.length_ft));
      formData.append("length_m", String(values.length_m));
      formData.append("built_year", String(values.built_year));
      formData.append("refit_year", String(values.refit_year));
      formData.append("guests", String(values.guests));
      formData.append("cabins", String(values.cabins));
      formData.append("crew", String(values.crew));
      formData.append("price_per_night", String(values.price_per_night));
      formData.append("currency", values.currency);
      formData.append("price_unit", values.price_unit);
      formData.append("cruising_speed", String(values.cruising_speed));
      formData.append("max_speed", String(values.max_speed));
      formData.append("range_nm", String(values.range_nm));
      formData.append("engines", values.engines);
      formData.append("hull_material", values.hull_material);
      formData.append("builder", values.builder);
      formData.append("is_active", String(values.is_active));

      if (values.slug) formData.append("slug", values.slug);
      if (values.position !== undefined && !isNaN(values.position)) {
        formData.append("position", String(values.position));
      }

      formData.append("description", JSON.stringify(description));
      formData.append("special_features", JSON.stringify(specialFeatures));

      const specifications = {
        accommodation: {
          guestsCruising: values.spec_guestsCruising,
          guestsSleeping: values.spec_guestsSleeping,
          staterooms: values.spec_staterooms,
          cabinConfig,
          crew: values.spec_crew,
        },
        construction: {
          builtYear: values.spec_builtYear,
          refitYear: values.spec_refitYear,
          builder: values.spec_builder,
          hullMaterial: values.spec_hullMaterial,
          exteriorDesigner: values.spec_exteriorDesigner,
          interiorDesigner: values.spec_interiorDesigner,
        },
        dimensions: {
          length: values.spec_length,
          beam: values.spec_beam,
          draft: values.spec_draft,
          grossTonnage: values.spec_grossTonnage,
        },
        performance: {
          cruisingSpeed: values.spec_cruisingSpeed,
          maxSpeed: values.spec_maxSpeed,
          range: values.spec_range,
          engines: values.spec_engines,
          generators: values.spec_generators,
        },
        classification: {
          classification: values.spec_classification,
          flag: values.spec_flag,
        },
        amenities,
      };
      formData.append("specifications", JSON.stringify(specifications));
      formData.append("rates", JSON.stringify(rates));

      formData.append("heroImage", values.heroImage[0]);
      if (values.gallery && values.gallery.length > 0) {
        Array.from(values.gallery).forEach((file) => {
          formData.append("gallery", file);
        });
      }

      await createYacht(formData).unwrap();
      toast.success("Yacht created successfully!");
      reset();
      setDescription([]);
      setSpecialFeatures([]);
      setAmenities([]);
      setCabinConfig([]);
      setRates([]);
      router.push(ALL_YACHTS_PATH);
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
        title="Add Yacht"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Yacht Fleet", link: ALL_YACHTS_PATH },
          { title: "Add Yacht" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionHeading title="Identity" />

          <Input
            label="Name"
            text="name"
            placeholder="Eco Voyager"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />
          <Input
            label="Slug (Optional, auto-generated from name)"
            text="slug"
            placeholder="eco-voyager"
            register={register("slug")}
            errors={errors}
            required={false}
          />
          <Input
            label="Tagline"
            text="tagline"
            placeholder="The fleet flagship for extended, long-range charters"
            register={register("tagline", { required: "Tagline is required" })}
            errors={errors}
          />
          <Input
            label="Category"
            text="category"
            placeholder="Hybrid Motor Yacht"
            register={register("category", { required: "Category is required" })}
            errors={errors}
          />
          <Input
            label="Region"
            text="region"
            placeholder="Mediterranean"
            register={register("region", { required: "Region is required" })}
            errors={errors}
          />

          <SectionHeading title="Core Stats" />

          <Input
            label="Length (ft)"
            text="length_ft"
            type="number"
            register={register("length_ft", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Length (m)"
            text="length_m"
            type="number"
            register={register("length_m", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Built Year"
            text="built_year"
            type="number"
            register={register("built_year", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Refit Year"
            text="refit_year"
            type="number"
            register={register("refit_year", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Guests"
            text="guests"
            type="number"
            register={register("guests", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Cabins"
            text="cabins"
            type="number"
            register={register("cabins", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Crew"
            text="crew"
            type="number"
            register={register("crew", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Price per Night"
            text="price_per_night"
            type="number"
            register={register("price_per_night", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Currency"
            text="currency"
            register={register("currency", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Price Unit"
            text="price_unit"
            register={register("price_unit", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Cruising Speed (knots)"
            text="cruising_speed"
            type="number"
            register={register("cruising_speed", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Max Speed (knots)"
            text="max_speed"
            type="number"
            register={register("max_speed", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Range (nm)"
            text="range_nm"
            type="number"
            register={register("range_nm", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Engines"
            text="engines"
            placeholder="2 x Hybrid-Electric Diesel (1,200 hp)"
            register={register("engines", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Hull Material"
            text="hull_material"
            placeholder="Steel & Aluminium Composite"
            register={register("hull_material", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Builder"
            text="builder"
            placeholder="Eco Yachts Shipyard"
            register={register("builder", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible on Fleet page)
            </label>
          </div>

          <SectionHeading title="Content" />

          <StringListEditor
            label="Description Paragraphs"
            values={description}
            onChange={setDescription}
            placeholder="Add a description paragraph..."
            required
            multiline
          />
          <StringListEditor
            label="Special Features"
            values={specialFeatures}
            onChange={setSpecialFeatures}
            placeholder="Add a special feature..."
            required
          />

          <SectionHeading title="Images" />

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Hero Image
              <span className="text-red-500 ml-0.5">*</span>
            </label>

            {heroPreview ? (
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image src={heroPreview} alt="Hero Preview" fill className="" />
              </div>
            ) : (
              <div className="mb-4 h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <Upload size={24} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("heroImage")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Gallery Images (Optional)
            </label>

            {galleryPreviews.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-3">
                {galleryPreviews.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <Image src={src} alt={`Gallery Preview ${i + 1}`} fill className="" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <ImageOff size={20} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              {...register("gallery")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <SectionHeading
            title="Specifications — Accommodation"
            subtitle="Shown in the yacht's spec-sheet table"
          />

          <Input
            label="Guests (Cruising)"
            text="spec_guestsCruising"
            type="number"
            register={register("spec_guestsCruising", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Guests (Sleeping)"
            text="spec_guestsSleeping"
            type="number"
            register={register("spec_guestsSleeping", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Staterooms"
            text="spec_staterooms"
            type="number"
            register={register("spec_staterooms", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Crew (Spec Table)"
            text="spec_crew"
            type="number"
            register={register("spec_crew", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />

          <CabinConfigEditor values={cabinConfig} onChange={setCabinConfig} />

          <SectionHeading title="Specifications — Construction" />

          <Input
            label="Built Year (Spec Table)"
            text="spec_builtYear"
            type="number"
            register={register("spec_builtYear", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Refit Year (Spec Table)"
            text="spec_refitYear"
            type="number"
            register={register("spec_refitYear", {
              required: "Required",
              valueAsNumber: true,
            })}
            errors={errors}
          />
          <Input
            label="Builder (Spec Table)"
            text="spec_builder"
            register={register("spec_builder", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Hull Material (Spec Table)"
            text="spec_hullMaterial"
            register={register("spec_hullMaterial", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Exterior Designer"
            text="spec_exteriorDesigner"
            register={register("spec_exteriorDesigner", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Interior Designer"
            text="spec_interiorDesigner"
            register={register("spec_interiorDesigner", { required: "Required" })}
            errors={errors}
          />

          <SectionHeading title="Specifications — Dimensions" />

          <Input
            label="Length (Display)"
            text="spec_length"
            placeholder="29m (95')"
            register={register("spec_length", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Beam"
            text="spec_beam"
            placeholder="4.64m"
            register={register("spec_beam", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Draft"
            text="spec_draft"
            placeholder="1.74m"
            register={register("spec_draft", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Gross Tonnage"
            text="spec_grossTonnage"
            placeholder="757 GT"
            register={register("spec_grossTonnage", { required: "Required" })}
            errors={errors}
          />

          <SectionHeading title="Specifications — Performance" />

          <Input
            label="Cruising Speed (Display)"
            text="spec_cruisingSpeed"
            placeholder="11 Knots"
            register={register("spec_cruisingSpeed", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Max Speed (Display)"
            text="spec_maxSpeed"
            placeholder="16 Knots"
            register={register("spec_maxSpeed", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Range (Display)"
            text="spec_range"
            placeholder="3,600 nm"
            register={register("spec_range", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Engines (Display)"
            text="spec_engines"
            register={register("spec_engines", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Generators"
            text="spec_generators"
            register={register("spec_generators", { required: "Required" })}
            errors={errors}
          />

          <SectionHeading title="Specifications — Classification & Amenities" />

          <Input
            label="Classification"
            text="spec_classification"
            register={register("spec_classification", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Flag"
            text="spec_flag"
            register={register("spec_flag", { required: "Required" })}
            errors={errors}
          />

          <StringListEditor
            label="Amenities"
            values={amenities}
            onChange={setAmenities}
            placeholder="Add an amenity (e.g. WiFi)..."
          />

          <SectionHeading title="Rates" />

          <RatesEditor values={rates} onChange={setRates} />
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
            text={isLoading ? "Saving..." : "Create Yacht"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddYacht;
