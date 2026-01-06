import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value
  const { pathname } = request.nextUrl

  // Verify token
  let isValidToken = false
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      isValidToken = true
    } catch (err) {
      isValidToken = false
    }
  }

  // Define protected routes
  const protectedRoutes = ['/library', '/home', '/store']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route)) || pathname === '/'

  if (isProtectedRoute) {
    if (!isValidToken) {
      // Redirect to login page if accessing a protected route without a valid token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Define auth routes (login/register)
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isAuthRoute && isValidToken) {
    // Redirect to home if accessing login/register while already authenticated
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}