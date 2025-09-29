import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách route cần bảo vệ
const protectedPaths = ["/dashboard", "/profile", "/orders"];

export function middleware(req: NextRequest) {
  // Lấy token từ cookie
  const token = req.cookies.get("token")?.value;
  console.log("🔥 Middleware chạy | Token:", token);
  
  // Lấy path hiện tại
  const pathname = req.nextUrl.pathname;

  // Kiểm tra nếu path hiện tại nằm trong protectedPaths
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    // Redirect về trang login nếu chưa có token
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  // Nếu có token hoặc không phải route bảo vệ, tiếp tục
  return NextResponse.next();
}

// Matcher để middleware chỉ chạy với các route này
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/orders",
    "/orders/:path*",
  ],
};
