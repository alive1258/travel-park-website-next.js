// ==========================================
// 1. Core Entity Model
// ==========================================
export const ABOUT_EXPLORE_ICONS = [
  "Building2",
  "Leaf",
  "Users",
  "Handshake",
  "Newspaper",
  "Compass",
  "ShieldCheck",
  "Anchor",
  "Globe",
  "Award",
  "MapPin",
  "Star",
] as const;

export type AboutExploreIcon = (typeof ABOUT_EXPLORE_ICONS)[number];

export interface AboutExploreUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AboutExploreCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: AboutExploreIcon;
  position: number;
  is_active: boolean;
  addedBy?: AboutExploreUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateAboutExploreRequest {
  title: string;
  description: string;
  href: string;
  icon: AboutExploreIcon;
  position?: number;
  is_active?: boolean;
}

export interface UpdateAboutExploreRequest {
  id: string;
  data: Partial<CreateAboutExploreRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface AboutExploreQueryParams {
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

export interface SingleAboutExploreResponse extends BaseApiResponse {
  data: AboutExploreCard;
}

export interface AboutExplorePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: AboutExploreCard[];
}

export interface ActiveAboutExploreResponse extends BaseApiResponse {
  data: AboutExploreCard[];
}
