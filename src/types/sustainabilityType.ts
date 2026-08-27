// ==========================================
// 1. Core Entity Model
// ==========================================
export interface SustainabilityUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface SustainabilityHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface SustainabilityItem {
  id: string;
  label?: string;
  title: string;
  description?: string;
  highlights?: SustainabilityHighlight[];
  button_text: string;
  button_link?: string;
  badge_text?: string;
  badge_icon?: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: SustainabilityUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateSustainabilityRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface SustainabilityQueryParams {
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

export interface SingleSustainabilityResponse extends BaseApiResponse {
  data: SustainabilityItem;
}

export interface SustainabilityPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: SustainabilityItem[];
}
