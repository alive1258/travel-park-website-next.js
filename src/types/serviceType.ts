// ==========================================
// 1. Core Entity Model
// ==========================================
export interface ServiceUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: ServiceUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateServiceRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ServiceQueryParams {
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

export interface SingleServiceResponse extends BaseApiResponse {
  data: ServiceItem;
}

export interface ServicePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ServiceItem[];
}

export interface ActiveServicesResponse extends BaseApiResponse {
  data: ServiceItem[];
}
