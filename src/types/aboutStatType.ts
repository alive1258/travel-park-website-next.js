// ==========================================
// 1. Core Entity Model
// ==========================================
export interface AboutStatUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  position: number;
  is_active: boolean;
  addedBy?: AboutStatUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateAboutStatRequest {
  value: string;
  label: string;
  position?: number;
  is_active?: boolean;
}

export interface UpdateAboutStatRequest {
  id: string;
  data: Partial<CreateAboutStatRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface AboutStatQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  label?: string;
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

export interface SingleAboutStatResponse extends BaseApiResponse {
  data: AboutStat;
}

export interface AboutStatPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: AboutStat[];
}

export interface ActiveAboutStatsResponse extends BaseApiResponse {
  data: AboutStat[];
}
