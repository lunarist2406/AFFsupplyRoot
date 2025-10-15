"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, UserCheck, UserX, Search, Filter, MoreVertical } from "lucide-react"

// Fake user data
const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    role: "Admin",
    status: "active",
    joinDate: "15/01/2024",
  },
  { id: 2, name: "Trần Thị B", email: "tranthib@email.com", role: "User", status: "active", joinDate: "20/01/2024" },
  { id: 3, name: "Lê Văn C", email: "levanc@email.com", role: "User", status: "inactive", joinDate: "25/01/2024" },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    role: "Moderator",
    status: "active",
    joinDate: "01/02/2024",
  },
  { id: 5, name: "Hoàng Văn E", email: "hoangvane@email.com", role: "User", status: "active", joinDate: "05/02/2024" },
  { id: 6, name: "Đặng Thị F", email: "dangthif@email.com", role: "User", status: "pending", joinDate: "10/02/2024" },
  { id: 7, name: "Vũ Văn G", email: "vuvang@email.com", role: "User", status: "active", joinDate: "15/02/2024" },
  { id: 8, name: "Bùi Thị H", email: "buithih@email.com", role: "User", status: "active", joinDate: "20/02/2024" },
]

export function UsersPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">4,500</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Người dùng mới</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">245</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Đang hoạt động</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">3,240</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Không hoạt động</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">1,260</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Danh sách người dùng</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>
              <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent">
                <Filter className="h-4 w-4" />
                Lọc
              </button>
              <button className="flex h-9 items-center gap-2 rounded-lg bg-green-primary px-4 text-sm font-medium text-white hover:bg-green-primary/90">
                <UserPlus className="h-4 w-4" />
                Thêm người dùng
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Tên</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Vai trò</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Ngày tham gia</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0">
                    <td className="py-4 text-sm font-medium text-card-foreground">{user.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-4 text-sm text-muted-foreground">{user.role}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-primary/10 text-green-primary"
                            : user.status === "inactive"
                              ? "bg-red-primary/10 text-red-primary"
                              : "bg-yellow-primary/10 text-yellow-secondary"
                        }`}
                      >
                        {user.status === "active"
                          ? "Hoạt động"
                          : user.status === "inactive"
                            ? "Không hoạt động"
                            : "Chờ duyệt"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                    <td className="py-4">
                      <button className="rounded-lg p-1 hover:bg-accent">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
