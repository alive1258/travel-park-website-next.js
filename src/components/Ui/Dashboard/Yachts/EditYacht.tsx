"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload, ImageOff } from "lucide-react";
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
import {
  useGetSingleYachtQuery,
  useUpdateYachtMutation,
} from "@/src/redux/api/yachtAdminApi";

interface EditYachtProps {
  id: string;
}

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

const EditYacht: React.FC<EditYachtProps> = ({ id }) => {
  const router = useRouter();

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const [description, setDescription] = useState<string[]>([]);
  const [specialFeatures, setSpecialFeatures] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [cabinConfig, setCabinConfig] = useState<YachtCabinConfigItem[]>([]);
  const [rates, setRates] = useState<YachtRateItem[]>([]);

  const { data: yachtData, isLoading: isFetching } = useGetSingleYachtQuery(id);
  const [updateYacht, { isLoading: isUpdating }] = useUpdateYachtMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<YachtFormValues>();

  const heroFileList = watch("heroImage");
  const galleryFileList = watch("gallery");

  useEffect(() => {
    if (heroFileList && heroFileList.length > 0) {
      const objectUrl = URL.createObjectURL(heroFileList[0]);
      setHeroPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [heroFileList]);

  useEffect(() => {
    if (galleryFileList && galleryFileList.length > 0) {
      const urls = Array.from(galleryFileList).map((file) =>
        URL.createObjectURL(file),
      );
      setNewGalleryPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
    setNewGalleryPreviews([]);
  }, [galleryFileList]);

  useEffect(() => {
    if (yachtData?.data) {
      const y = yachtData.data;
      reset({
        slug: y.slug,
        name: y.name,
        tagline: y.tagline,
        category: y.category,
        region: y.region,
        length_ft: y.length_ft,
        length_m: y.length_m,
        built_year: y.built_year,
        refit_year: y.refit_year,
        guests: y.guests,
        cabins: y.cabins,
        crew: y.crew,
        price_per_night: y.price_per_night,
        currency: y.currency,
        price_unit: y.price_unit,
        cruising_speed: y.cruising_speed,
        max_speed: y.max_speed,
        range_nm: y.range_nm,
        engines: y.engines,
        hull_material: y.hull_material,
        builder: y.builder,
        position: y.position,
        is_active: y.is_active,
        spec_guestsCruising: y.specifications.accommodation.guestsCruising,
        spec_guestsSleeping: y.specifications.accommodation.guestsSleeping,
        spec_staterooms: y.specifications.accommodation.staterooms,
        spec_crew: y.specifications.accommodation.crew,
        spec_builtYear: y.specifications.construction.builtYear,
        spec_refitYear: y.specifications.construction.refitYear,
        spec_builder: y.specifications.construction.builder,
        spec_hullMaterial: y.specifications.construction.hullMaterial,
        spec_exteriorDesigner: y.specifications.construction.exteriorDesigner,
        spec_interiorDesigner: y.specifications.construction.interiorDesigner,
        spec_length: y.specifications.dimensions.length,
        spec_beam: y.specifications.dimensions.beam,
        spec_draft: y.specifications.dimensions.draft,
        spec_grossTonnage: y.specifications.dimensions.grossTonnage,
        spec_cruisingSpeed: y.specifications.performance.cruisingSpeed,
        spec_maxSpeed: y.specifications.performance.maxSpeed,
        spec_range: y.specifications.performance.range,
        spec_engines: y.specifications.performance.engines,
        spec_generators: y.specifications.performance.generators,
        spec_classification: y.specifications.classification.classification,
        spec_flag: y.specifications.classification.flag,
      });

      setDescription(y.description || []);
      setSpecialFeatures(y.special_features || []);
      setAmenities(y.specifications.amenities || []);
      setCabinConfig(y.specifications.accommodation.cabinConfig || []);
      setRates(y.rates || []);
      setExistingGallery(y.gallery || []);
      setHeroPreview(y.hero_image || null);
    }
  }, [yachtData, reset]);

  const onSubmit: SubmitHandler<YachtFormValues> = async (values) => {
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

      if (values.heroImage?.[0]) {
        formData.append("heroImage", values.heroImage[0]);
      }
      if (values.gallery && values.gallery.length > 0) {
        Array.from(values.gallery).forEach((file) => {
          formData.append("gallery", file);
        });
      }

      await updateYacht({ id, data: formData }).unwrap();
      toast.success("Yacht updated successfully!");
      router.push(ALL_YACHTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update yacht.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading yacht details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Yacht"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Yacht Fleet", link: ALL_YACHTS_PATH },
          { title: "Edit Yacht" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionHeading title="Identity" />

          <Input
            label="Name"
            text="name"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />
          <Input
            label="Slug"
            text="slug"
            register={register("slug")}
            errors={errors}
            required={false}
          />
          <Input
            label="Tagline"
            text="tagline"
            register={register("tagline", { required: "Tagline is required" })}
            errors={errors}
          />
          <Input
            label="Category"
            text="category"
            register={register("category", { required: "Category is required" })}
            errors={errors}
          />
          <Input
            label="Region"
            text="region"
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
            register={register("engines", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Hull Material"
            text="hull_material"
            register={register("hull_material", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Builder"
            text="builder"
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

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Hero Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {heroPreview ? (
                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image src={heroPreview} alt="Hero Preview" fill className="" unoptimized />
                </div>
              ) : (
                <div className="h-28 w-28 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
                  <Upload size={24} />
                </div>
              )}

              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  {...register("heroImage")}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Uploading a new image replaces the current hero image.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Gallery Images
            </label>

            {newGalleryPreviews.length > 0 ? (
              <div className="mb-3 flex flex-wrap gap-3">
                {newGalleryPreviews.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <Image src={src} alt={`New Gallery Preview ${i + 1}`} fill className="" />
                  </div>
                ))}
              </div>
            ) : existingGallery.length > 0 ? (
              <div className="mb-3 flex flex-wrap gap-3">
                {existingGallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className=""
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3 h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <ImageOff size={18} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              {...register("gallery")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-2">
              Uploading new images replaces the entire gallery set.
            </p>
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
            register={register("spec_length", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Beam"
            text="spec_beam"
            register={register("spec_beam", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Draft"
            text="spec_draft"
            register={register("spec_draft", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Gross Tonnage"
            text="spec_grossTonnage"
            register={register("spec_grossTonnage", { required: "Required" })}
            errors={errors}
          />

          <SectionHeading title="Specifications — Performance" />

          <Input
            label="Cruising Speed (Display)"
            text="spec_cruisingSpeed"
            register={register("spec_cruisingSpeed", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Max Speed (Display)"
            text="spec_maxSpeed"
            register={register("spec_maxSpeed", { required: "Required" })}
            errors={errors}
          />
          <Input
            label="Range (Display)"
            text="spec_range"
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
            text={isUpdating ? "Updating..." : "Update Yacht"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditYacht;
