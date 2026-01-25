import { NextResponse } from "next/server";

const ROLE_CONFIG = {
  user: {
    cookie: "user_token",
    routes: ["/profile", "/my-events"],
  },

  organizer: {
    cookie: "organizer_token",
    routes: [
      "/dashboard",
      "/events",
      "/participants",
      "/settings",
      "/payments",
      "/create-event",
      "/forms",
      "/templates",
      "/upload",
    ],
  },

  admin: {
    cookie: "admin_token",
    routes: ["/admin", "/admin/users", "/admin/events"],
  },
};

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  const cookies = request.cookies;

  for (const role of Object.values(ROLE_CONFIG)) {
    const isProtectedRoute = role.routes.some((route) =>
      pathname.startsWith(route),
    );

    if (isProtectedRoute) {
      const token = cookies.get(role.cookie);

      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const otherRoleCookies = [
        "admin_token",
        "organizer_token",
        "user_token",
      ].filter((c) => c !== role.cookie);

      if (otherRoleCookies.some((c) => cookies.get(c))) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
