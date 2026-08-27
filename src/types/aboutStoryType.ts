// ==========================================
// 1. Core Entity Model
// ==========================================
export interface AboutStoryUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AboutStoryItem {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: AboutStoryUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateAboutStoryRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface AboutStoryQueryParams {
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

export interface SingleAboutStoryResponse extends BaseApiResponse {
  data: AboutStoryItem;
}

export interface AboutStoryPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: AboutStoryItem[];
}

export interface ActiveAboutStoryResponse extends BaseApiResponse {
  data: AboutStoryItem;
}
