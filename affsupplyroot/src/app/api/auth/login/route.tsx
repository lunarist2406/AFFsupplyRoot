import { NextResponse } from "next/server"

// Fake database
let roles = [
  { id: 1, name: "admin", description: "Quản trị hệ thống" },
  { id: 2, name: "supply", description: "Nhà sản xuất" },
  { id: 3, name: "customer", description: "Khách hàng" },
]

let users = [
  {
    id: 1,
    roleID: 1,
    name: "Nguyen Van A",
    email: "a@gmail.com",
    phone: "0123456789",
    password: "123",
  },
  {
    id: 2,
    roleID: 2,
    name: "Nguyen Van B",
    email: "b@gmail.com",
    phone: "0123456789",
    password: "123",
  },
  {
    id: 3,
    roleID: 3,
    name: "Tran Thi C",
    email: "c@gmail.com",
    phone: "0987654321",
    password: "123",
  },
]

// POST /api/auth/login
export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ message: "Sai tài khoản hoặc mật khẩu" }, { status: 401 })
  }

  const role = roles.find((r) => r.id === user.roleID)

  // 🔑 tạo token fake (thực tế bạn nên dùng JWT)
  const token = `token-${user.id}-${Date.now()}`

  // Response + set cookie
  const res = NextResponse.json({
    message: "Login success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role ? role.name : null,
    },
  })

  // set cookie token cho client
  res.cookies.set("token", token, {
    httpOnly: true, // bảo mật
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // áp dụng toàn bộ site
    maxAge: 60 * 60 * 24, // 1 ngày
  })

  return res
}
