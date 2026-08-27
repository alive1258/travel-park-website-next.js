// ==========================================
// 1. Core Entity Model
// ==========================================
export interface AboutUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AboutInfoItem {
  icon: string;
  label: string;
  value: string;
}

export interface AboutItem {
  id: string;
  eyebrow: string;
  name: string;
  title: string;
  specialty: string;
  bio?: string[];
  info?: AboutInfoItem[];
  registration?: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: AboutUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateAboutRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface AboutQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
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

export interface SingleAboutResponse extends BaseApiResponse {
  data: AboutItem;
}

export interface AboutPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: AboutItem[];
}
