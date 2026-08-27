export interface YachtCabinConfig {
  type: string;
  count: number;
}

export interface YachtSpecifications {
  accommodation: {
    guestsCruising: number;
    guestsSleeping: number;
    staterooms: number;
    cabinConfig: YachtCabinConfig[];
    crew: number;
  };
  construction: {
    builtYear: number;
    refitYear: number;
    builder: string;
    hullMaterial: string;
    exteriorDesigner: string;
    interiorDesigner: string;
  };
  dimensions: {
    length: string;
    beam: string;
    draft: string;
    grossTonnage: string;
  };
  performance: {
    cruisingSpeed: string;
    maxSpeed: string;
    range: string;
    engines: string;
    generators: string;
  };
  classification: {
    classification: string;
    flag: string;
  };
  amenities: string[];
}

export interface YachtRate {
  season: string;
  dateRange: string;
  region: string;
  lowSeason: string;
  highSeason: string;
}

export interface Yacht {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  length: string;
  builtRefit: string;
  guests: number;
  cabins: number;
  crew: number;
  priceFrom: string;
  priceUnit: string;
  pricePerNight: number;
  currency: string;
  heroImage: string;
  gallery: string[];
  description: string[];
  specialFeatures: string[];
  specifications: YachtSpecifications;
  rates: YachtRate[];
}

/** Lightweight shape used by card grids (fleet listing, featured section). */
export interface YachtSummary {
  slug: string;
  name: string;
  length: string;
  guests: string;
  price: string;
  image: string;
}
