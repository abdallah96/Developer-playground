import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/demos/protected")) {
    const authToken = searchParams.get("token");
    const cookieToken = request.cookies.get("auth-token")?.value;

    if (!authToken && !cookieToken) {
      const loginUrl = new URL("/demos/auth-required", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (authToken === "demo-secret-token" || cookieToken === "demo-secret-token") {
      const response = NextResponse.next();
      response.headers.set("x-auth-status", "authenticated");
      return response;
    }

    const loginUrl = new URL("/demos/auth-required", request.url);
    loginUrl.searchParams.set("error", "invalid-token");
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/demos/locale")) {
    const locale = searchParams.get("lang") || "en";
    const response = NextResponse.next();
    response.headers.set("x-user-locale", locale);
    response.cookies.set("user-locale", locale, {
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("x-api-version", "1.0.0");
    response.headers.set("x-request-id", crypto.randomUUID());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/demos/protected/:path*",
    "/demos/locale/:path*",
    "/api/:path*",
  ],
};

