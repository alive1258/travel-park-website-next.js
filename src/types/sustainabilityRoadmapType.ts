// ==========================================
// 1. Core Entity Model
// ==========================================
export interface SustainabilityRoadmapUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface SustainabilityRoadmapItem {
  id: string;
  year: string;
  milestone: string;
  position: number;
  is_active: boolean;
  addedBy?: SustainabilityRoadmapUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateSustainabilityRoadmapRequest {
  year: string;
  milestone: string;
  position?: number;
  is_active?: boolean;
}

export interface UpdateSustainabilityRoadmapRequest {
  id: string;
  data: Partial<CreateSustainabilityRoadmapRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface SustainabilityRoadmapQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  year?: string;
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

export interface SingleSustainabilityRoadmapResponse extends BaseApiResponse {
  data: SustainabilityRoadmapItem;
}

export interface SustainabilityRoadmapPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: SustainabilityRoadmapItem[];
}

export interface ActiveSustainabilityRoadmapResponse extends BaseApiResponse {
  data: SustainabilityRoadmapItem[];
}
