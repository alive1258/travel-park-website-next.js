import type { YachtAdminItem } from "@/src/types/yachtAdminType";
import type { Yacht, YachtSummary } from "@/src/types/yachtType";

// Postgres `numeric` columns are serialized as strings (e.g. "4600.00") to
// avoid precision loss, so these fields must be coerced before formatting.
function toNumber(value: number | string): number {
  return typeof value === "number" ? value : parseFloat(value);
}

function formatPrice(amount: number | string, currency: string): string {
  const value = toNumber(amount).toLocaleString("en-US");
  return currency === "USD" ? `$${value}` : `${currency} ${value}`;
}

export function mapYachtAdminItemToYacht(item: YachtAdminItem): Yacht {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    tagline: item.tagline,
    category: item.category,
    length: `${item.length_ft} ft / ${toNumber(item.length_m)}m`,
    builtRefit: `${item.built_year}/${item.refit_year}`,
    guests: item.guests,
    cabins: item.cabins,
    crew: item.crew,
    priceFrom: formatPrice(item.price_per_night, item.currency),
    priceUnit: item.price_unit,
    pricePerNight: toNumber(item.price_per_night),
    currency: item.currency,
    heroImage: item.hero_image,
    gallery: item.gallery,
    description: item.description,
    specialFeatures: item.special_features,
    specifications: item.specifications,
    rates: item.rates,
  };
}

export function mapYachtAdminItemToSummary(item: YachtAdminItem): YachtSummary {
  return {
    slug: item.slug,
    name: item.name,
    length: `${item.length_ft} ft`,
    guests: `${item.guests} Guests`,
    price: formatPrice(item.price_per_night, item.currency),
    image: item.hero_image,
  };
}
