import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];
export const LOGIN_ROUTE = "/login";
const ROOT = "/";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // TODO: should validate the token

  // If the user is logged in and tries to access the login page, redirect to dashboard
  if ((pathname.startsWith(LOGIN_ROUTE) || pathname === ROOT) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user tries to access an unprotected route, allow
  if (!PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && pathname !== ROOT) {
    return NextResponse.next();
  }

  // If the user is not logged in and tries to access a protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }
}
