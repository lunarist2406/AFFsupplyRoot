"use client"

import { useState } from "react"
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  MoreHorizontal,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MapPin,
  Thermometer,
  Droplets,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  BarChart3,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { categories, products, recentActivities, stats } from "./variable/inventory"
import CategoryCard from "./components/CategoryCard"

export default function InventoryView() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)


  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status:any) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status:any) => {
    switch (status) {
      case "in_stock":
        return "Còn hàng"
      case "low_stock":
        return "Sắp hết"
      case "out_of_stock":
        return "Hết hàng"
      default:
        return "Không xác định"
    }
  }

  const getQualityColor = (quality:any) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getQualityText = (quality:any) => {
    switch (quality) {
      case "excellent":
        return "Xuất sắc"
      case "good":
        return "Tốt"
      case "fair":
        return "Khá"
      case "poor":
        return "Kém"
      default:
        return "Chưa đánh giá"
    }
  }

  return (
    <div className="min-h-screen  bg-gradient-to-r from-green-950 via-gray-600 to-green-950 font-manuale px-25">
      {/* Header */}
      <div className=" border-b text-yellow-primary py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-yellow-primary">Quản lý kho</h1>
            <p className="text-yellow-primary/80">Nông Sản Sạch Việt - Hệ thống quản lý kho hàng</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center bg-green-primary text-yellow-primary hover:bg-green-primary/80 transition"
            >
              <Download className="w-4 h-4 mr-2 text-yellow-primary" />
              Xuất Excel
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center bg-green-primary text-yellow-primary hover:bg-green-primary/80 transition"
            >
              <Upload className="w-4 h-4 mr-2 text-yellow-primary" />
              Nhập Excel
            </Button>

            <Button className="flex items-center bg-green-primary text-yellow-primary hover:bg-green-primary/80 transition">
              <Plus className="w-4 h-4 mr-2 text-yellow-primary" />
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sắp hết hàng</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
                  <p className="text-2xl font-bold text-red-600">{stats.expiringSoon}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giá trị kho</p>
                  <p className="text-2xl font-bold">₫{(stats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="space-y-4">
            <CategoryCard />

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 text-sm">
                        <div className="p-1 bg-gray-100 rounded-full mt-1">
                          {activity.type === "stock_in" && <TrendingUp className="w-3 h-3 text-green-600" />}
                          {activity.type === "stock_out" && <TrendingDown className="w-3 h-3 text-red-600" />}
                          {activity.type === "quality_check" && <CheckCircle className="w-3 h-3 text-blue-600" />}
                          {activity.type === "expiry_alert" && <AlertCircle className="w-3 h-3 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.product}</p>
                          <p className="text-muted-foreground text-xs">
                            {activity.type === "stock_in" && `Nhập ${activity.quantity} ${activity.unit}`}
                            {activity.type === "stock_out" && `Xuất ${activity.quantity} ${activity.unit}`}
                            {activity.type === "quality_check" &&
                              `Kiểm tra chất lượng: ${activity.status === "passed" ? "Đạt" : "Không đạt"}`}
                            {activity.type === "expiry_alert" && `Còn ${activity.daysLeft} ngày hết hạn`}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm theo tên hoặc mã SKU..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="in_stock">Còn hàng</SelectItem>
                      <SelectItem value="low_stock">Sắp hết</SelectItem>
                      <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Danh sách sản phẩm ({filteredProducts.length})</CardTitle>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Làm mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {product.organic && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  🌱 Hữu cơ
                                </Badge>
                              )}
                              <Badge className={getStatusColor(product.status)}>{getStatusText(product.status)}</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Xem chi tiết
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Package className="w-4 h-4 mr-2" />
                                    Nhập/Xuất kho
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Tồn kho</p>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-lg">
                                  {product.currentStock} {product.unit}
                                </span>
                                {product.currentStock <= product.minStock && (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                )}
                              </div>
                              <Progress value={(product.currentStock / product.maxStock) * 100} className="h-2 mt-1" />
                            </div>

                            <div>
                              <p className="text-muted-foreground">Giá bán</p>
                              <p className="font-semibold">
                                ₫{product.sellPrice.toLocaleString()}/{product.unit}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Vốn: ₫{product.costPrice.toLocaleString()}
                              </p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">Chất lượng</p>
                              <p className={`font-medium ${getQualityColor(product.quality)}`}>
                                {getQualityText(product.quality)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Cập nhật: {new Date(product.lastUpdated).toLocaleDateString("vi-VN")}
                              </p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">Vị trí</p>
                              <p className="font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {product.location}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Thermometer className="w-3 h-3" />
                                  {product.temperature}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Droplets className="w-3 h-3" />
                                  {product.humidity}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Thu hoạch: {new Date(product.harvestDate).toLocaleDateString("vi-VN")}</span>
                              <span>Hết hạn: {new Date(product.expiryDate).toLocaleDateString("vi-VN")}</span>
                              <span>Nhà cung cấp: {product.supplier}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Nhập kho
                              </Button>
                              <Button variant="outline" size="sm">
                                Xuất kho
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
