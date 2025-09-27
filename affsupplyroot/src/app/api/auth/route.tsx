import { NextResponse } from "next/server"

// Fake database (nên tách ra file riêng lib/dbFake.js nhưng demo thì viết luôn)
let roles = [
  { id: 1, name: "Admin", description: "Quản trị hệ thống" },
  { id: 2, name: "supply", description: "nhà sản xuất" },
  { id: 2, name: "customer", description: "khách hàng" },

]

let users = [
  {
    id: 1,
    roleID: 1,
    name: "Nguyen Van A",
    email: "a@gmail.com",
    phone: "0123456789",
    password: "123",
    status: "ACTIVE",
    isDeleted: false,
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
    {
    id: 2,
    roleID: 2,
    name: "Nguyen Van B",
    email: "b@gmail.com",
    phone: "0123456789",
    password: "123",
    status: "ACTIVE",
    isDeleted: false,
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 3,
    roleID: 3,
    name: "Tran Thi B",
    email: "c@gmail.com",
    phone: "0987654321",
    password: "123",
    status: "INACTIVE",
    isDeleted: false,
    createdAt: new Date(),
    createdBy: 1,
    updatedAt: new Date(),
    updatedBy: 1,
  },
]

// POST /api/auth/login
export async function POST(request:any) {
  const body = await request.json()
  const { email, password } = body

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  const role = roles.find((r) => r.id === user.roleID)

  return NextResponse.json({
    message: "Login success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role ? role.name : null,
    },
  })
}
