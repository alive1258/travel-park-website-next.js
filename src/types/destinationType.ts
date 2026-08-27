// ==========================================
// 1. Core Entity Model
// ==========================================
export interface DestinationUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: DestinationUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateDestinationRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface DestinationQueryParams {
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

export interface SingleDestinationResponse extends BaseApiResponse {
  data: DestinationItem;
}

export interface DestinationPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: DestinationItem[];
}
