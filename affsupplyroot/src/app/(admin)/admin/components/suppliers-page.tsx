"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Plus, Search, Filter, MoreVertical, MapPin, Phone, Mail } from "lucide-react"

// Fake supplier data
const suppliers = [
  {
    id: 1,
    name: "Công ty TNHH ABC",
    contact: "Nguyễn Văn A",
    phone: "0901234567",
    email: "abc@company.com",
    address: "Hà Nội",
    status: "active",
    products: 45,
  },
  {
    id: 2,
    name: "Công ty Cổ phần XYZ",
    contact: "Trần Thị B",
    phone: "0912345678",
    email: "xyz@company.com",
    address: "TP.HCM",
    status: "active",
    products: 32,
  },
  {
    id: 3,
    name: "Doanh nghiệp DEF",
    contact: "Lê Văn C",
    phone: "0923456789",
    email: "def@company.com",
    address: "Đà Nẵng",
    status: "pending",
    products: 18,
  },
  {
    id: 4,
    name: "Công ty GHI",
    contact: "Phạm Thị D",
    phone: "0934567890",
    email: "ghi@company.com",
    address: "Hải Phòng",
    status: "active",
    products: 56,
  },
  {
    id: 5,
    name: "Tập đoàn JKL",
    contact: "Hoàng Văn E",
    phone: "0945678901",
    email: "jkl@company.com",
    address: "Cần Thơ",
    status: "inactive",
    products: 12,
  },
]

export function SuppliersPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng nhà cung cấp</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">120</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Đang hoạt động</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">98</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Chờ duyệt</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">15</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng sản phẩm</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">2,450</div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Grid */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Danh sách nhà cung cấp</CardTitle>
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
                <Plus className="h-4 w-4" />
                Thêm nhà cung cấp
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-lg border border-border bg-card p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary/10">
                      <Building2 className="h-6 w-6 text-green-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{supplier.name}</h3>
                      <p className="text-xs text-muted-foreground">{supplier.contact}</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-1 hover:bg-accent">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {supplier.address}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">{supplier.products} sản phẩm</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      supplier.status === "active"
                        ? "bg-green-primary/10 text-green-primary"
                        : supplier.status === "inactive"
                          ? "bg-red-primary/10 text-red-primary"
                          : "bg-yellow-primary/10 text-yellow-secondary"
                    }`}
                  >
                    {supplier.status === "active"
                      ? "Hoạt động"
                      : supplier.status === "inactive"
                        ? "Không hoạt động"
                        : "Chờ duyệt"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
