import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  // Các route cần bảo vệ
  const protectedPaths = ["/dashboard", "/profile", "/orders"]

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/authentication", req.url))
    }
  }

  return NextResponse.next()
}
