import { NextResponse } from "next/server"

// Fake "database"
let roles = [
  { id: 1, name: "Admin", description: "Quản trị hệ thống" },
  { id: 2, name: "User", description: "Người dùng thường" },
]

let users = [
  {
    id: 1,
    roleID: 1,
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
    password: "123456",
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
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
    password: "654321",
    status: "INACTIVE",
    isDeleted: false,
    createdAt: new Date(),
    createdBy: 1,
    updatedAt: new Date(),
    updatedBy: 1,
  },
]

// GET /api/users → trả user + role name
export async function GET() {
  const data = users.map((u) => ({
    ...u,
    role: roles.find((r) => r.id === u.roleID) || null,
  }))
  return NextResponse.json(data)
}

// POST /api/users → thêm user mới
export async function POST(request:any) {
  const body = await request.json()
  const newUser = {
    id: users.length + 1,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}
