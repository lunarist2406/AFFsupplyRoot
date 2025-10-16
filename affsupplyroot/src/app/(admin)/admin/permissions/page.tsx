/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { type ColDef, type ICellRendererParams, ModuleRegistry } from "@ag-grid-community/core"
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-quartz.css"
import "./permissions.css"
import {
  Shield,
  Save,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  CheckSquare,
  Square,
  Users,
  ShoppingCart,
  Package,
  Settings,
  FileText,
} from "lucide-react"
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

type PermissionItem = {
  id: number
  code: string
  description: string
  isActive: boolean
}

type UpdateRolePermissionsPayload = {
  permissions: Array<{
    id: number
    isActive: boolean
  }>
}

type GetPermissionsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    roleID: number
    permissions: PermissionItem[]
  }
}

type RoleOption = {
  value: number
  label: string
}

type PermissionChange = {
  permissionCode: string
  timestamp: Date
  action: "enabled" | "disabled"
}

async function getPermissionsByRole(roleID: number, token: string): Promise<GetPermissionsResponse> {
  try {
    const response = await fetch(`/api/v1/permission/${roleID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      try {
        const errJson = await response.json().catch(() => null)
        const msg = errJson?.message || response.statusText || "Fetch permissions failed"
        throw new Error(msg)
      } catch (e) {
        throw e
      }
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching permissions:", error)
    throw error
  }
}

async function updatePermissionsByRole(
  roleID: number,
  payload: UpdateRolePermissionsPayload,
  token: string,
): Promise<void> {
  try {
    const response = await fetch(`/api/permission/${roleID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      try {
        const errJson = await response.json().catch(() => null)
        const msg = errJson?.message || response.statusText || "Update permissions failed"
        throw new Error(msg)
      } catch (e) {
        throw e
      }
    }
  } catch (error) {
    console.error("[v0] Error updating permissions:", error)
    throw error
  }
}

function getPermissionCategory(code: string): { name: string; icon: React.ElementType; color: string } {
  const upperCode = code.toUpperCase()
  if (upperCode.includes("USER")) {
    return { name: "Quản lý người dùng", icon: Users, color: "text-blue-500" }
  }
  if (upperCode.includes("PRODUCT")) {
    return { name: "Quản lý sản phẩm", icon: Package, color: "text-green-500" }
  }
  if (upperCode.includes("ORDER") ) {
    return { name: "Quản lý đơn hàng", icon: ShoppingCart, color: "text-orange-500" }
  }
  if (upperCode.includes("REPORT")) {
    return { name: "Báo cáo & Thống kê", icon: FileText, color: "text-purple-500" }
  }
  if (upperCode.includes("SETTING")) {
    return { name: "Cài đặt hệ thống", icon: Settings, color: "text-gray-500" }
  }
  return { name: "Khác", icon: Shield, color: "text-slate-500" }
}

export default function AdminPermissionsPage() {
  ModuleRegistry.registerModules([ClientSideRowModelModule])

  const [roles] = useState<RoleOption[]>([
    { value: 1, label: "Admin" },
    { value: 2, label: "Manager" },
    { value: 3, label: "Staff" },
    { value: 4, label: "Seller" },
    { value: 5, label: "ShopStaff" },
    { value: 6, label: "User" },
  ])

  const [selectedRole, setSelectedRole] = useState<number | null>(1)
  const [permissions, setPermissions] = useState<PermissionItem[]>([])
  const [edited, setEdited] = useState<Map<number, boolean>>(new Map())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterMode, setFilterMode] = useState<"all" | "active" | "inactive">("all")
  const [originalPermissions, setOriginalPermissions] = useState<PermissionItem[]>([])
  const [recentChanges, setRecentChanges] = useState<PermissionChange[]>([])

  const permsGridRef = useRef<AgGridReact<PermissionItem>>(null)

  const onTogglePermission = useCallback((id: number, active: boolean) => {
    setPermissions((prev) => {
      const updated = prev.map((x) => {
        if (x.id === id) {
          setRecentChanges((changes) => [
            {
              permissionCode: x.code,
              timestamp: new Date(),
              action: active ? "enabled" : "disabled",
            },
            ...changes.slice(0, 9), 
          ])
          return { ...x, isActive: active }
        }
        return x
      })
      return updated
    })
    setEdited((prev) => new Map(prev).set(id, true))
  }, [])

  const permCols: ColDef<PermissionItem>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        editable: false,
        cellClass: "font-mono text-muted-foreground",
      },
      {
        field: "code",
        headerName: "Mã quyền",
        editable: false,
        flex: 1,
        minWidth: 250,
        cellClass: "font-mono",
      },
      {
        field: "description",
        headerName: "Mô tả",
        editable: false,
        flex: 2,
        minWidth: 350,
      },
      {
        field: "isActive",
        headerName: "Trạng thái",
        flex: 1,
        cellRenderer: (params: ICellRendererParams) => {
          if (!params.data) return null

          const checked = Boolean(params.value)
          const permId = params.data.id
          const isEdited = edited.has(permId)

          return (
            <div className="flex items-center gap-2 h-full">
              <Switch 
                checked={checked} 
                onCheckedChange={(newChecked: boolean) => onTogglePermission(permId, newChecked)} 
              />
              {checked ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground" />
              )}
              {isEdited && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
            </div>
          )
        },
      },
    ],
    [onTogglePermission, edited],
  )

  const filteredPermissions = useMemo(() => {
    let filtered = permissions

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) => p.code.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
    }

    if (filterMode === "active") {
      filtered = filtered.filter((p) => p.isActive)
    } else if (filterMode === "inactive") {
      filtered = filtered.filter((p) => !p.isActive)
    }

    return filtered
  }, [permissions, searchQuery, filterMode])

  const permissionsByCategory = useMemo(() => {
    const grouped = new Map<string, PermissionItem[]>()
    permissions.forEach((perm) => {
      const category = getPermissionCategory(perm.code)
      const existing = grouped.get(category.name) || []
      grouped.set(category.name, [...existing, perm])
    })
    return grouped
  }, [permissions])

  const handleEnableAll = useCallback(() => {
    setPermissions((prev) =>
      prev.map((p) => {
        if (!p.isActive) {
          setEdited((e) => new Map(e).set(p.id, true))
        }
        return { ...p, isActive: true }
      }),
    )
  }, [])

  const handleDisableAll = useCallback(() => {
    setPermissions((prev) =>
      prev.map((p) => {
        if (p.isActive) {
          setEdited((e) => new Map(e).set(p.id, true))
        }
        return { ...p, isActive: false }
      }),
    )
  }, [])

  const allActive = useMemo(() => {
    if (permissions.length === 0) return false
    return permissions.every((p) => p.isActive)
  }, [permissions])

  const handleToggleAll = useCallback(() => {
    if (allActive) {
      setPermissions((prev) =>
        prev.map((p) => {
          if (p.isActive) {
            setEdited((e) => new Map(e).set(p.id, true))
          }
          return { ...p, isActive: false }
        }),
      )
    } else {
      setPermissions((prev) =>
        prev.map((p) => {
          if (!p.isActive) {
            setEdited((e) => new Map(e).set(p.id, true))
          }
          return { ...p, isActive: true }
        }),
      )
    }
  }, [allActive])

  const handleReset = useCallback(() => {
    setPermissions(originalPermissions)
    setEdited(new Map())
    setRecentChanges([])
  }, [originalPermissions])

  const fetchAll = useCallback(async () => {
    if (selectedRole == null) return

    const token = localStorage.getItem("token") || ""
    if (!token.trim()) {
      setError("Vui lòng đăng nhập để tiếp tục")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await getPermissionsByRole(selectedRole, token)
      if (response.success) {
        const perms = Array.isArray(response.data?.permissions) ? response.data.permissions : []
        setPermissions(perms)
        setOriginalPermissions(perms)
        setEdited(new Map())
        setRecentChanges([])
        toast.success(response.message)
      } else {
        setError(response.message)
        toast.error(response.message)
      }
    } catch (err) {
      setError((err as Error)?.message)
      toast.error((err as Error)?.message)
    } finally {
      setLoading(false)
    }
  }, [selectedRole])

  const onSave = useCallback(async () => {
    if (selectedRole == null) return

    const token = localStorage.getItem("token") || ""
    if (!token.trim()) {
      setError("Vui lòng đăng nhập để tiếp tục")
      return
    }

    const payload: UpdateRolePermissionsPayload = {
      permissions: permissions.map((p) => ({ id: p.id, isActive: p.isActive })),
    }
    setLoading(true)
    setError("")
    try {
      await updatePermissionsByRole(selectedRole, payload, token)
      setEdited(new Map())
      setRecentChanges([])
      await fetchAll()
      toast.success("Lưu thay đổi phân quyền thành công")
    } catch (err) {
      setError((err as Error)?.message)
      toast.error((err as Error)?.message)
    } finally {
      setLoading(false)
    }
  }, [selectedRole, permissions, fetchAll])

  const stats = useMemo(() => {
    const total = permissions.length
    const active = permissions.filter((p) => p.isActive).length
    const inactive = total - active
    const percentage = total > 0 ? Math.round((active / total) * 100) : 0

    return { total, active, inactive, percentage }
  }, [permissions])

  const selectedRoleLabel = roles.find((r) => r.value === selectedRole)?.label || ""
  const onQuery = useCallback(() => {
    void fetchAll()
  }, [fetchAll])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 bg-muted/30 border border-border rounded-xl px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Quản lý phân quyền</h1>
                <p className="text-sm text-muted-foreground">Thiết lập quyền theo vai trò và đồng bộ hệ thống</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-destructive text-sm font-medium">{error}</p>
          </div>
        )}


        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="roleSelect" className="block text-sm font-semibold text-foreground mb-2">
                Chọn vai trò
              </label>
              <select
                id="roleSelect"
                value={selectedRole ?? ""}
                onChange={(e) => setSelectedRole(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-medium"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="searchInput" className="block text-sm font-semibold text-foreground mb-2">
                Tìm kiếm quyền
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Nhập mã quyền hoặc mô tả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Bộ lọc trạng thái
              </label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value as "all" | "active" | "inactive")}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-medium"
              >
                <option value="all">Tất cả</option>
                <option value="active">Đã kích hoạt</option>
                <option value="inactive">Chưa kích hoạt</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={onQuery}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ring-2 ring-primary/40 shadow-lg"
            >
              <Search className="w-4 h-4" />
              Truy vấn
            </button>

            <button
              onClick={handleToggleAll}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-background border border-input hover:bg-muted text-foreground font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {allActive ? (
                <>
                  <Square className="w-4 h-4" />
                  Vô hiệu tất cả
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4" />
                  Kích hoạt tất cả
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={loading || edited.size === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-background border border-input hover:bg-muted text-foreground font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Khôi phục
            </button>

            <button
              onClick={onSave}
              disabled={loading || edited.size === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Lưu thay đổi
              {edited.size > 0 && (
                <span className="px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs font-bold">
                  {edited.size}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Danh sách quyền</h2>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm text-muted-foreground">
                    {searchQuery || filterMode !== "all"
                      ? `Hiển thị ${filteredPermissions.length} / ${permissions.length} quyền`
                      : `Vai trò: ${selectedRoleLabel} - ${permissions.length} quyền`}
                  </p>
                  {permissions.length > 0 && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        {stats.active}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="w-4 h-4" />
                        {stats.inactive}
                      </span>
                      <span className="text-muted-foreground">
                        ({stats.percentage}% kích hoạt)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {edited.size > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-primary font-semibold">{edited.size} thay đổi chưa lưu</span>
                </div>
              )}
            </div>
          </div>

          <div className="ag-theme-quartz permissions-grid" style={{ height: 600, width: "100%" }}>
            <AgGridReact
              ref={permsGridRef}
              rowData={filteredPermissions}
              columnDefs={permCols}
              rowHeight={56}
              headerHeight={48}
              suppressCellFocus={true}
              loading={loading}
              overlayNoRowsTemplate='<span style="padding: 20px; color: #64748b; font-size: 15px;">Không có dữ liệu. Vui lòng nhấn "Truy vấn" để tải danh sách quyền.</span>'
            />
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 shadow-lg">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-foreground font-semibold">Đang tải dữ liệu...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
