// ==========================================
// 1. Core Entity Model
// ==========================================
export interface EventUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface EventItem {
  id: string;
  name: string;
  date_range: string;
  location: string;
  description: string;
  yacht: string;
  position: number;
  is_active: boolean;
  addedBy?: EventUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateEventRequest {
  name: string;
  date_range: string;
  location: string;
  description: string;
  yacht: string;
  position?: number;
  is_active?: boolean;
}

export interface UpdateEventRequest {
  id: string;
  data: Partial<CreateEventRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface EventQueryParams {
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

export interface SingleEventResponse extends BaseApiResponse {
  data: EventItem;
}

export interface EventPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: EventItem[];
}

export interface ActiveEventsResponse extends BaseApiResponse {
  data: EventItem[];
}
