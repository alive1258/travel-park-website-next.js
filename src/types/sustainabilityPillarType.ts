// ==========================================
// 1. Core Entity Model
// ==========================================
export const SUSTAINABILITY_PILLAR_ICONS = [
  "BatteryCharging",
  "Fish",
  "Recycle",
  "Sprout",
  "Leaf",
  "Droplets",
  "Zap",
  "Waves",
  "Sun",
  "Wind",
  "Anchor",
  "ShieldCheck",
] as const;

export type SustainabilityPillarIcon = (typeof SUSTAINABILITY_PILLAR_ICONS)[number];

export interface SustainabilityPillarUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface SustainabilityPillar {
  id: string;
  title: string;
  description: string;
  icon: SustainabilityPillarIcon;
  position: number;
  is_active: boolean;
  addedBy?: SustainabilityPillarUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateSustainabilityPillarRequest {
  title: string;
  description: string;
  icon: SustainabilityPillarIcon;
  position?: number;
  is_active?: boolean;
}

export interface UpdateSustainabilityPillarRequest {
  id: string;
  data: Partial<CreateSustainabilityPillarRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface SustainabilityPillarQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  title?: string;
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

export interface SingleSustainabilityPillarResponse extends BaseApiResponse {
  data: SustainabilityPillar;
}

export interface SustainabilityPillarPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: SustainabilityPillar[];
}

export interface ActiveSustainabilityPillarsResponse extends BaseApiResponse {
  data: SustainabilityPillar[];
}
