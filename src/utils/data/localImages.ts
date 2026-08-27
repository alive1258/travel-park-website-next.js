/**
 * Real photography shipped in `public/images`. Used in place of remote
 * stock URLs wherever a genuine local asset exists — hero banners,
 * destination fallbacks, and the fully-static Hotels/Transportation pages.
 * Team headshots have no local equivalent, so those still come from
 * `stockImages.ts`.
 */

export const HERO_BANNER = "/images/marina-yachts-hero-banner.jpg";

export const DISCOVER_IMAGES = {
  travelerWithSuitcase: "/images/traveler-woman-suitcase-beach.jpg",
  rovinjPier: "/images/rovinj-croatia-pier-girl.webp",
};

export const OFFER_BACKGROUND = "/images/nepal-everest-base-camp-trekker.jpg";
export const NEWSLETTER_BACKGROUND = "/images/istanbul-ferry-seagulls.jpg";
export const FAQ_IMAGE = "/images/abu-dhabi-skyline-aerial.jpg";
export const BLOG_FALLBACK = "/images/istanbul-galata-sunset.jpg";

export const PAGE_HERO_IMAGES = {
  tours: "/images/thailand-railay-beach-aerial-sunset.jpg",
  hotels: "/images/istanbul-bosphorus-skyline.webp",
  transportation: "/images/great-ocean-road-australia.jpg",
  destinations: "/images/lake-louise-canada.jpg",
  contact: "/images/tranquil-beach-loungers.webp",
  blog: "/images/istanbul-galata-sunset.jpg",
};

/** Rotated fallback pool for real (CMS-driven) destinations that have no
 * uploaded image — varied instead of repeating one generic photo. */
export const DESTINATION_FALLBACK_POOL = [
  "/images/lake-como-varenna-flowers.jpg",
  "/images/lake-como-varenna-aerial.jpg",
  "/images/lake-como-varenna-waterfront.jpg",
  "/images/thailand-maya-bay-boats.jpg",
  "/images/thailand-railay-beach-boats.jpg",
  "/images/thailand-islands-longtail-boats.jpg",
  "/images/thailand-railay-beach-aerial-sunset.jpg",
  "/images/thailand-karst-longtail-boat.jpg",
  "/images/lake-louise-canada.jpg",
  "/images/na-pali-coast-hawaii.jpg",
  "/images/na-pali-coast-hawaii-2.jpg",
  "/images/coastal-road-aerial.jpg",
  "/images/mediterranean-cove-boats.jpg",
  "/images/istanbul-galata-sunset.jpg",
  "/images/istanbul-mosque-ferries.jpg",
  "/images/istanbul-bosphorus-skyline.webp",
  "/images/abu-dhabi-skyline-aerial.jpg",
  "/images/italian-lakeside-town.jpg",
  "/images/ha-giang-vietnam-road.jpg",
];

/** Deterministic pick so the same destination always gets the same
 * fallback across renders/requests. */
export function pickDestinationFallback(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return DESTINATION_FALLBACK_POOL[hash % DESTINATION_FALLBACK_POOL.length];
}

export const TRANSPORT_LOCAL_IMAGES = {
  privateCarRoad: "/images/great-ocean-road-australia.jpg",
  scenicDrive: "/images/coastal-road-aerial.jpg",
  mountainRoad: "/images/ha-giang-vietnam-road.jpg",
  boatTransfer: "/images/thailand-karst-longtail-boat.jpg",
  ferryTransfer: "/images/istanbul-ferry-seagulls.jpg",
};

export const HOTEL_LOCAL_IMAGES = {
  lakeComoFlowers: "/images/lake-como-varenna-flowers.jpg",
  lakeComoWaterfront: "/images/lake-como-varenna-waterfront.jpg",
  istanbulSkyline: "/images/istanbul-bosphorus-skyline.webp",
  railayBeach: "/images/thailand-railay-beach-aerial-sunset.jpg",
  rovinjPier: "/images/rovinj-croatia-pier-girl.webp",
  abuDhabiSkyline: "/images/abu-dhabi-skyline-aerial.jpg",
  lakeLouise: "/images/lake-louise-canada.jpg",
  italianLakeside: "/images/italian-lakeside-town.jpg",
};
