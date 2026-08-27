// ==========================================
// 1. Core Entity Model
// ==========================================
export interface HeroUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface HeroStat {
  icon: string;
  value: string;
  label: string;
}

export interface HeroItem {
  id: string;
  badge?: string;
  affiliation?: string;
  title: string;
  description?: string;
  specialties?: string[];
  primary_button_text: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  stats?: HeroStat[];
  rating_value?: string;
  rating_label?: string;
  floating_badge?: string;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: HeroUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateHeroRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface HeroQueryParams {
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

export interface SingleHeroResponse extends BaseApiResponse {
  data: HeroItem;
}

export interface HeroPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: HeroItem[];
}
