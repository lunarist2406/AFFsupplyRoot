export interface PermissionItem {
  id: number
  code: string
  description: string
  isActive: boolean
}

export interface UpdateRolePermissionsPayload {
  permissions: Array<{
    id: number
    isActive: boolean
  }>
}

export interface GetPermissionsResponse {
  success?: boolean
  statusCode?: number
  message?: string
  data: {
    roleID?: number
    permissions: PermissionItem[]
  }
}
  