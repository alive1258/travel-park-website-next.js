// ==========================================
// 1. Core Entity Model
// ==========================================
export interface LifeAboardPhotoUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface LifeAboardPhotoItem {
  id: string;
  image: string;
  position: number;
  is_active: boolean;
  addedBy?: LifeAboardPhotoUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateLifeAboardPhotoRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface LifeAboardPhotoQueryParams {
  page?: number;
  limit?: number;
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

export interface SingleLifeAboardPhotoResponse extends BaseApiResponse {
  data: LifeAboardPhotoItem;
}

export interface LifeAboardPhotoPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: LifeAboardPhotoItem[];
}

export interface ActiveLifeAboardPhotosResponse extends BaseApiResponse {
  data: LifeAboardPhotoItem[];
}
