import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./hooks/verifyToken";

// Authentication pages
const authRoutes = [
  "/login",
  "/forget-password",
  "/otp",
  "/signup",
  "/verify-otp",
];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Safely decode and verify the token
  const decodedToken = token ? verifyToken(token) : null;

  // 1. Prevent authenticated users from visiting auth pages
  if (decodedToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. RESTRICT /dashboard TO STAFF-TIER ROLES.
  //
  // Gate on the `isStaff`/`isSuperAdmin` JWT claims, not a hardcoded list of
  // role slugs — Super Admin can create arbitrary custom roles (e.g. "CTO")
  // at runtime and grant them dashboard menu permissions, so any role slug
  // allow-list here would incorrectly lock those out. Per-menu visibility
  // within the dashboard (e.g. who can see "Employees") is handled by the
  // Sidebar filtering against the live permission matrix from
  // /auth/get-me, and enforced for real by the backend's PermissionsGuard
  // on every request — this middleware only needs the coarse staff/non-staff
  // boundary.
  if (pathname.startsWith("/dashboard")) {
    // If no valid token exists, redirect to login
    if (!decodedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Patients (role "user"/"premium_user") and any other non-staff role
    // have no dashboard access.
    if (!decodedToken.isStaff && !decodedToken.isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Set standard non-cache headers & continue
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/forget-password",
    "/otp",
    "/signup",
    "/verify-otp",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
