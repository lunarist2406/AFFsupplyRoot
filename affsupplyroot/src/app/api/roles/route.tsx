import { NextResponse } from "next/server"

let roles = [
  {
    id: 1,
    name: "Admin",
    description: "Quản trị hệ thống",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 2,
    name: "Manager",
    description: "Quản lý cấp cao",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 3,
    name: "Staff",
    description: "Nhân viên",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 4,
    name: "Seller",
    description: "Người bán hàng",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 5,
    name: "ShopStaff",
    description: "Nhân viên cửa hàng",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
  {
    id: 6,
    name: "User",
    description: "Người dùng thông thường",
    createdAt: new Date(),
    createdBy: 0,
    updatedAt: new Date(),
    updatedBy: 0,
  },
]

// GET /api/roles → trả toàn bộ role
export async function GET() {
  return NextResponse.json(roles)
}

// POST /api/roles → thêm role mới
export async function POST(request:any) {
  const body = await request.json()
  const newRole = {
    id: roles.length + 1,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  roles.push(newRole)
  return NextResponse.json(newRole, { status: 201 })
}
