// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    // якщо немає токена - редірект
    return NextResponse.redirect(new URL('/login', req.url))
  }
  // не робити більше ніякої логіки — далі авторизацію на API або сторінках
  return NextResponse.next()
}


export const config = {
  matcher: ['/dashboard/:path*']
}

