const ROLE_CONFIG = {
  user: {
    cookie: "user_token",
    login: "/user-login",
    home: "/profile",
    routes: ["/profile", "/my-events"],
  },
  organizer: {
    cookie: "organizer_token",
    login: "/organiser-login",
    home: "/dashboard",
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
    login: "/admin-login",
    home: "/admin",
    routes: ["/admin", "/admin/users", "/admin/events"],
  },
};

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // allow static & api
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Handle LOGIN pages → auto redirect if already logged in
  for (const role of Object.values(ROLE_CONFIG)) {
    if (pathname === role.login) {
      const token = request.cookies.get(role.cookie)?.value;
      if (token) {
        return NextResponse.redirect(
          new URL(role.home, request.url)
        );
      }
      return NextResponse.next();
    }
  }

  // Handle PROTECTED routes
  for (const role of Object.values(ROLE_CONFIG)) {
    const isProtected = role.routes.some((r) =>
      pathname.startsWith(r)
    );

    if (!isProtected) continue;

    const token = request.cookies.get(role.cookie)?.value;

    // not logged in → correct login
    if (!token) {
      return NextResponse.redirect(
        new URL(role.login, request.url)
      );
    }

    // logged in as wrong role → unauthorized
    const otherCookies = [
      "admin_token",
      "organizer_token",
      "user_token",
    ].filter((c) => c !== role.cookie);

    if (otherCookies.some((c) => request.cookies.get(c))) {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/events/:path*",
    "/participants/:path*",
    "/settings/:path*",
    "/payments/:path*",
    "/create-event/:path*",
    "/forms/:path*",
    "/templates/:path*",
    "/upload/:path*",
    "/profile/:path*",
    "/my-events/:path*",
    "/admin/:path*",
    "/organiser-login",
    "/user-login",
    "/admin-login",
  ],
};