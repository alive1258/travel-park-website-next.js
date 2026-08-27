// ==========================================
// 1. Core Entity Model
// ==========================================
export interface YachtCabinConfigItem {
  type: string;
  count: number;
}

export interface YachtAccommodation {
  guestsCruising: number;
  guestsSleeping: number;
  staterooms: number;
  cabinConfig: YachtCabinConfigItem[];
  crew: number;
}

export interface YachtConstruction {
  builtYear: number;
  refitYear: number;
  builder: string;
  hullMaterial: string;
  exteriorDesigner: string;
  interiorDesigner: string;
}

export interface YachtDimensions {
  length: string;
  beam: string;
  draft: string;
  grossTonnage: string;
}

export interface YachtPerformance {
  cruisingSpeed: string;
  maxSpeed: string;
  range: string;
  engines: string;
  generators: string;
}

export interface YachtClassificationInfo {
  classification: string;
  flag: string;
}

export interface YachtSpecificationsAdmin {
  accommodation: YachtAccommodation;
  construction: YachtConstruction;
  dimensions: YachtDimensions;
  performance: YachtPerformance;
  classification: YachtClassificationInfo;
  amenities: string[];
}

export interface YachtRateItem {
  season: string;
  dateRange: string;
  region: string;
  lowSeason: string;
  highSeason: string;
}

export interface YachtAdminUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface YachtAdminItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
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
  region: string;
  cruising_speed: number;
  max_speed: number;
  range_nm: number;
  engines: string;
  hull_material: string;
  builder: string;
  hero_image: string;
  gallery: string[];
  description: string[];
  special_features: string[];
  specifications: YachtSpecificationsAdmin;
  rates: YachtRateItem[];
  position: number;
  is_active: boolean;
  addedBy?: YachtAdminUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateYachtRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface YachtQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
  category?: string;
  region?: string;
  position?: number;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

// ==========================================
// 4. API Response Wrappers
// ==========================================
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationLinks {
  first?: string;
  last?: string;
  current?: string;
  next?: string;
  previous?: string;
}

export interface BaseApiResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
}

export interface SingleYachtResponse extends BaseApiResponse {
  data: YachtAdminItem;
}

export interface YachtPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: YachtAdminItem[];
}

export interface ActiveYachtsResponse extends BaseApiResponse {
  data: YachtAdminItem[];
}
