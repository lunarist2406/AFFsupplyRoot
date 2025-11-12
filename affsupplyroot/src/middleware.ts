import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { roleAccessMap, roleMap } from "./variable/menuHeader"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("backendToken")?.value
  const roleId = parseInt(request.cookies.get("role")?.value || "0", 10)

  console.log("Middleware triggered:", pathname)
  console.log("Role ID:", roleId, "=>", roleMap[roleId] || "guest")

  const matchedRoute = roleAccessMap.find((r) => pathname.startsWith(r.path))

  // Nếu route không được bảo vệ thì bỏ qua
  if (!matchedRoute) {
    return NextResponse.next()
  }

  // Nếu chưa đăng nhập (không có token)
  if (!token) {
    console.warn(`Guest tried to access protected route (${pathname}) -> redirect /authentication`)
    const response = NextResponse.redirect(new URL("/authentication", request.url))
    response.cookies.delete("backendToken")
    response.cookies.delete("role")
    return response
  }

  // Nếu role không hợp lệ cho route
  if (!matchedRoute.roles.includes(roleId)) {
    console.warn(`Invalid role (${roleId}) for ${matchedRoute.path} -> redirect /403`)
    const response = NextResponse.redirect(new URL("/403", request.url))
    response.cookies.delete("backendToken")
    response.cookies.delete("role")
    return response
  }

  // Nếu hợp lệ
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
}
