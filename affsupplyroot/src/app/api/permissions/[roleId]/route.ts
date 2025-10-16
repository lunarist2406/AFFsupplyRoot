import { type NextRequest, NextResponse } from "next/server"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ roleId: string }> } // 👈 kiểu mới
) {
  try {
    const { roleId } = await context.params // 👈 phải await ở đây
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json(
        { success: false, statusCode: 401, message: "Thiếu token xác thực" },
        { status: 401 }
      )
    }

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/permission/${roleId}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: authHeader,
      },
    })

    const data = await response.json()
    if (!response.ok) return NextResponse.json(data, { status: response.status })

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Error fetching permissions:", error)
    return NextResponse.json(
      { success: false, statusCode: 500, message: (error as Error)?.message || "Lỗi khi lấy danh sách quyền" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ roleId: string }> }
) {
  try {
    const { roleId } = await context.params
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json(
        { success: false, statusCode: 401, message: "Thiếu token xác thực" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/permission/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    if (!response.ok) return NextResponse.json(data, { status: response.status })

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Error updating permissions:", error)
    return NextResponse.json(
      { success: false, statusCode: 500, message: (error as Error)?.message || "Lỗi khi cập nhật quyền" },
      { status: 500 }
    )
  }
}
