import type { GetPermissionsResponse, UpdateRolePermissionsPayload } from "@/types/permission"

const API_BASE_URL = "/api/v1/permissions"

function getAuthHeader(): HeadersInit {
  if (typeof window === "undefined") return {}
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getPermissionsByRole(roleId: number): Promise<GetPermissionsResponse> {
  const response = await fetch(`${API_BASE_URL}/${roleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch permissions: ${response.statusText}`)
  }

  return await response.json()
}

export async function updatePermissionsByRole(roleId: number, payload: UpdateRolePermissionsPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${roleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Failed to update permissions: ${response.statusText}`)
  }
}
