"use client"

import { Eye, Edit, Trash2, MoreHorizontal, AlertTriangle, MapPin, Thermometer, Droplets } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Product {
  id: number
  name: string
  image: string
  sku: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPrice: number
  sellPrice: number
  supplier: string
  harvestDate: string
  expiryDate: string
  location: string
  temperature: string
  humidity: string
  status: string
  quality: string
  organic: boolean
  lastUpdated: string
}

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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

  const getQualityColor = (quality: string) => {
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

  const getQualityText = (quality: string) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Danh sách sản phẩm ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
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
                      <p className="text-xs text-muted-foreground">Vốn: ₫{product.costPrice.toLocaleString()}</p>
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
  )
}
