import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/", "/auth/signin", "/auth/signup", "/api/auth/login", "/api/auth/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Check JWT from cookies
  const token = req.cookies.get("session")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/signin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/auth/signin", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Run middleware on these paths
export const config = {
  matcher: ["/books/:path*", "/api/books/:path*"],
};
