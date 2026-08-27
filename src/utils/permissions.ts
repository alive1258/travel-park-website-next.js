// Thin lookup over the live per-menu permission matrix returned by
// GET /auth/get-me (stored in state.auth.permissions) and computed
// server-side from the caller's role. This exists purely to drive UI-level
// show/hide (nav items, Add/Edit/Delete buttons) so the dashboard doesn't
// dangle actions a role can't actually use. It is NOT the security
// boundary — the backend re-checks every one of these independently via
// PermissionsGuard, and remains authoritative regardless of what this file
// says. If the two drift apart, worst case is a button that 403s when
// clicked, not a hole.
import { MenuActionFlags } from "@/src/types/authType";

export type PermissionAction = "view" | "create" | "edit" | "delete";

export function hasPermission(
  permissions: Record<string, MenuActionFlags> | null | undefined,
  menuKey: string | null | undefined,
  action: PermissionAction,
): boolean {
  if (!permissions || !menuKey) return false;
  return !!permissions[menuKey]?.[action];
}
