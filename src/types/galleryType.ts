// ==========================================
// 1. Core Entity Model
// ==========================================
export interface GalleryUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images?: string[];
  position: number;
  is_active: boolean;
  addedBy?: GalleryUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateGalleryRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface GalleryQueryParams {
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

export interface SingleGalleryResponse extends BaseApiResponse {
  data: GalleryItem;
}

export interface GalleryPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: GalleryItem[];
}

export interface ActiveGalleryResponse extends BaseApiResponse {
  data: GalleryItem[];
}
