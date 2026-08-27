// ==========================================
// 1. Core Entity Model
// ==========================================
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  key: string;
  parent_id?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// Tree node returned by GET /menu/tree — same shape, with nested children
export interface MenuTreeItem extends MenuItem {
  children?: MenuTreeItem[];
}

// ==========================================
// 2. API Response Wrapper
// ==========================================
export interface MenuTreeResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
  data: MenuTreeItem[];
}
