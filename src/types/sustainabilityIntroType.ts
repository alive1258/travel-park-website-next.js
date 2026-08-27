// ==========================================
// 1. Core Entity Model
// ==========================================
export interface SustainabilityIntroUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface SustainabilityIntroItem {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: SustainabilityIntroUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateSustainabilityIntroRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface SustainabilityIntroQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  heading?: string;
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

export interface SingleSustainabilityIntroResponse extends BaseApiResponse {
  data: SustainabilityIntroItem;
}

export interface SustainabilityIntroPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: SustainabilityIntroItem[];
}

export interface ActiveSustainabilityIntroResponse extends BaseApiResponse {
  data: SustainabilityIntroItem;
}
