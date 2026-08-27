import { HOTEL_LOCAL_IMAGES } from "./localImages";

// TODO: placeholder listings — replace with real partner-hotel data once
// accommodation partnerships are onboarded onto the platform.
export interface HotelListing {
  slug: string;
  name: string;
  location: string;
  category: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  image: string;
}

export const HOTEL_CATEGORIES = [
  "Beach Resorts",
  "City Hotels",
  "Boutique Stays",
  "Mountain Lodges",
];

export const FEATURED_HOTELS: HotelListing[] = [
  {
    slug: "railay-beach-resort",
    name: "Railay Beach Resort",
    location: "Railay Beach, Thailand",
    category: "Beach Resorts",
    pricePerNight: 249,
    rating: 4.8,
    reviewCount: 612,
    image: HOTEL_LOCAL_IMAGES.railayBeach,
  },
  {
    slug: "maya-bay-cove-resort",
    name: "Maya Bay Cove Resort",
    location: "Maya Bay, Thailand",
    category: "Beach Resorts",
    pricePerNight: 199,
    rating: 4.7,
    reviewCount: 342,
    image: "/images/thailand-maya-bay-boats.jpg",
  },
  {
    slug: "bosphorus-grand-hotel",
    name: "Bosphorus Grand Hotel",
    location: "Istanbul, Turkey",
    category: "City Hotels",
    pricePerNight: 179,
    rating: 4.6,
    reviewCount: 421,
    image: HOTEL_LOCAL_IMAGES.istanbulSkyline,
  },
  {
    slug: "skyline-marina-hotel",
    name: "Skyline Marina Hotel",
    location: "Abu Dhabi, UAE",
    category: "City Hotels",
    pricePerNight: 229,
    rating: 4.7,
    reviewCount: 388,
    image: HOTEL_LOCAL_IMAGES.abuDhabiSkyline,
  },
  {
    slug: "varenna-lakeview-stay",
    name: "Varenna Lakeview Stay",
    location: "Lake Como, Italy",
    category: "Boutique Stays",
    pricePerNight: 219,
    rating: 4.9,
    reviewCount: 274,
    image: HOTEL_LOCAL_IMAGES.lakeComoFlowers,
  },
  {
    slug: "rovinj-harbour-suites",
    name: "Rovinj Harbour Suites",
    location: "Rovinj, Croatia",
    category: "Boutique Stays",
    pricePerNight: 189,
    rating: 4.8,
    reviewCount: 158,
    image: HOTEL_LOCAL_IMAGES.rovinjPier,
  },
  {
    slug: "lake-louise-lodge",
    name: "Lake Louise Lodge",
    location: "Banff, Canada",
    category: "Mountain Lodges",
    pricePerNight: 259,
    rating: 4.9,
    reviewCount: 267,
    image: HOTEL_LOCAL_IMAGES.lakeLouise,
  },
  {
    slug: "lakeside-italian-retreat",
    name: "Lakeside Italian Retreat",
    location: "Lake Garda, Italy",
    category: "Mountain Lodges",
    pricePerNight: 209,
    rating: 4.6,
    reviewCount: 195,
    image: HOTEL_LOCAL_IMAGES.italianLakeside,
  },
];
