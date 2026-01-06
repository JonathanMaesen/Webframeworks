import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_do_not_use_in_prod";

export async function proxy(request: NextRequest) {
  // 1. Get Cookie
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // 2. Verify Token
  let isAuthenticated = false;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // 3. Define Protected Routes
  // Add any routes that require login here
  const protectedRoutes = ["/home", "/library", "/store"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Optional: Add redirect param to return after login
    // loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Redirect if already logged in (Inverse Auth)
  // Prevent logged-in users from seeing login/register pages
  if ((pathname === "/login" || pathname === "/register" || pathname === "/") && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  
  // Redirect root to login if not authenticated
  if (pathname === "/" && !isAuthenticated) {
     return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 5. Configuration (Global Matcher)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
