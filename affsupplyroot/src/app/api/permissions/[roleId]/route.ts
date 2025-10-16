import { type NextRequest, NextResponse } from "next/server"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: NextRequest, { params }: { params: { roleId: string } }) {
  try {
    const roleId = params.roleId
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "Thiếu token xác thực",
        },
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

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Error fetching permissions:", error)
    const message = (error as Error)?.message || "Lỗi khi lấy danh sách quyền"
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message,
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { roleId: string } }) {
  try {
    const roleId = params.roleId
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "Thiếu token xác thực",
        },
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

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Error updating permissions:", error)
    const message = (error as Error)?.message || "Lỗi khi cập nhật quyền"
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message,
      },
      { status: 500 }
    )
  }
}
