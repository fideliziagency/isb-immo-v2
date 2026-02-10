import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const match = pathname.match(/^\/logements\/category\/([^\/]+)\/?$/)
  if (match) {
    const type = match[1]
    const url = req.nextUrl.clone()
    url.pathname = `/logements/${type}`
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/logements/category/:path*"],
}
