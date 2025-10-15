"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { recentActivities, stats } from "./variable/inventory"
import useProducts from "@/hooks/useProducts"

import { toast } from "sonner"
import CreateProductModal from "./components/CreateProductModal"
import CategoryCard from "./components/CategoryCard"
import { ProductList } from "./components/product-list"

export default function InventoryView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const { products, loading } = useProducts()

  useEffect(() => {
    if (loading) {
      toast.loading("Đang tải dữ liệu sản phẩm...", { id: "loading-products" })
    } else {
      toast.dismiss("loading-products")
      if (!products || products.length === 0) {
        toast.info("Chưa có dữ liệu sản phẩm.", { id: "no-products", duration: 2000 })
      }
    }
  }, [loading, products])

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-950 via-gray-600 to-green-950 font-manuale px-5 sm:px-6 lg:px-25">
      <div className="border-b text-yellow-primary py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-yellow-primary">Quản lý kho</h1>
            <p className="text-xs sm:text-sm text-yellow-primary/80 mt-0.5">
              Nông Sản Sạch Việt - Hệ thống quản lý kho hàng
            </p>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="flex items-center bg-green-primary text-yellow-primary hover:bg-green-primary/80 transition w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-yellow-primary" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <CreateProductModal open={open} onClose={() => setOpen(false)} />

      <div className="p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Tổng sản phẩm</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg shrink-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Sắp hết hàng</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Sắp hết hạn</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.expiringSoon}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg shrink-0">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Giá trị kho</p>
                  <p className="text-xl sm:text-2xl font-bold">₫{(stats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4 lg:col-span-1">
            <CategoryCard />

            {/* Recent Activities */}
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <ScrollArea className="h-48 sm:h-64">
                  <div className="space-y-2 sm:space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="p-0.5 sm:p-1 bg-gray-100 rounded-full mt-0.5 sm:mt-1 shrink-0">
                          {activity.type === "stock_in" && (
                            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                          )}
                          {activity.type === "stock_out" && (
                            <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600" />
                          )}
                          {activity.type === "quality_check" && (
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                          )}
                          {activity.type === "expiry_alert" && (
                            <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.product}</p>
                          <p className="text-muted-foreground text-[10px] sm:text-xs break-words">
                            {activity.type === "stock_in" && `Nhập ${activity.quantity} ${activity.unit}`}
                            {activity.type === "stock_out" && `Xuất ${activity.quantity} ${activity.unit}`}
                            {activity.type === "quality_check" &&
                              `Kiểm tra chất lượng: ${activity.status === "passed" ? "Đạt" : "Không đạt"}`}
                            {activity.type === "expiry_alert" && `Còn ${activity.daysLeft} ngày hết hạn`}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <Input
                      placeholder="Tìm kiếm theo tên hoặc mã SKU..."
                      className="pl-8 sm:pl-10 h-9 sm:h-10 text-xs sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-40 h-9 sm:h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="in_stock">Còn hàng</SelectItem>
                        <SelectItem value="low_stock">Sắp hết</SelectItem>
                        <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm bg-transparent">
                      <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Lọc</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
