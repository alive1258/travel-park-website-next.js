// ==========================================
// 1. Core Entity Model
// ==========================================
export interface InnovationConceptUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface InnovationConceptItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: InnovationConceptUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateInnovationConceptRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface InnovationConceptQueryParams {
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

export interface SingleInnovationConceptResponse extends BaseApiResponse {
  data: InnovationConceptItem;
}

export interface InnovationConceptPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: InnovationConceptItem[];
}

export interface ActiveInnovationConceptsResponse extends BaseApiResponse {
  data: InnovationConceptItem[];
}
