// ==========================================
// 1. Core Entity Model
// ==========================================
export interface ClientVideoReviewUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ClientVideoReviewItem {
  id: string;
  name: string;
  designation?: string;
  image?: string;
  description: string;
  rating: number;
  video_url: string;
  position: number;
  is_active: boolean;
  addedBy?: ClientVideoReviewUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateClientVideoReviewRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ClientVideoReviewQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
  rating?: number;
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

export interface SingleClientVideoReviewResponse extends BaseApiResponse {
  data: ClientVideoReviewItem;
}

export interface ClientVideoReviewPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ClientVideoReviewItem[];
}

export interface ActiveClientVideoReviewsResponse extends BaseApiResponse {
  data: ClientVideoReviewItem[];
}
