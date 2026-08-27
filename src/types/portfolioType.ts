// ==========================================
// 1. Core Entity Model
// ==========================================
export const PORTFOLIO_ICONS = [
  "Users2",
  "PartyPopper",
  "Sailboat",
  "Gem",
  "Anchor",
  "Ship",
  "Compass",
  "Waves",
  "Star",
  "Heart",
  "Briefcase",
  "Camera",
] as const;

export type PortfolioIcon = (typeof PORTFOLIO_ICONS)[number];

export interface PortfolioUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  icon: PortfolioIcon;
  image?: string;
  href: string;
  position: number;
  is_active: boolean;
  addedBy?: PortfolioUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdatePortfolioRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface PortfolioQueryParams {
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

export interface SinglePortfolioResponse extends BaseApiResponse {
  data: PortfolioItem;
}

export interface PortfolioPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: PortfolioItem[];
}

export interface ActivePortfolioResponse extends BaseApiResponse {
  data: PortfolioItem[];
}
