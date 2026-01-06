import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')
  const isRegisterPage = request.nextUrl.pathname.startsWith('/register')

  if (!username && !isLoginPage && !isRegisterPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (username && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}