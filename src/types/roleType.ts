// ==========================================
// 1. Core Entity Model
// ==========================================
export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_system: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

// One row per Menu item, for the permission-matrix editor
export interface RolePermissionMatrixRow {
  menu_id: string;
  menu_key: string;
  menu_label: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface UpdateRoleRequest {
  id: string;
  data: Partial<CreateRoleRequest>;
}

export interface RolePermissionGrant {
  menu_id: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

export interface UpsertRolePermissionsRequest {
  id: string;
  data: {
    grants: RolePermissionGrant[];
  };
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface RoleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
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

export interface SingleRoleResponse extends BaseApiResponse {
  data: Role;
}

export interface RolePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: Role[];
}

export interface RolePermissionMatrixResponse extends BaseApiResponse {
  data: RolePermissionMatrixRow[];
}
