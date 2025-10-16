/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProductCardItem.tsx
"use client"

import Image from "next/image"
import { Eye, Edit, Trash2, AlertTriangle } from "lucide-react"
import { getStatusColor, getStatusText } from "../variable/inventory"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import useProducts from "@/hooks/useProducts"

export default function ProductCardItem({ onView, onEdit, onDelete }: any) {
  const { products } = useProducts()

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <Image
              src={product?.image || "/placeholder.svg"}
              alt={product?.name || "Không có tên"}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />

            <div className="flex-1 space-y-2">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{product?.name}</h3>
                  <p className="text-sm text-muted-foreground">SKU: {product?.sku}</p>
                </div>
                <div className="flex items-center gap-3">
                  {product?.organic && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      🌱 Hữu cơ
                    </Badge>
                  )}
                  <Badge className={getStatusColor(product?.status)}>{getStatusText(product?.status)}</Badge>

                  {/* 🔧 Action Icons */}
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => onView?.(product)}>
                            <Eye className="w-4 h-4 text-gray-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Xem</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => onEdit?.(product)}>
                            <Edit className="w-4 h-4 text-blue-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Chỉnh sửa</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => onDelete?.(product.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Xóa</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tồn kho</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      {product?.currentStock} {product?.unit}
                    </span>
                    {product?.currentStock <= product?.minStock && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <Progress value={(product?.currentStock / product?.maxStock) * 100 || 0} className="h-2 mt-1" />
                </div>

                <div>
                  <p className="text-muted-foreground">Giá bán</p>
                  <p className="font-semibold">
                    ₫{product?.sellPrice?.toLocaleString()}/{product?.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">Vốn: ₫{product?.costPrice?.toLocaleString()}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span>
                    Thu hoạch:{" "}
                    {product?.harvestDate ? new Date(product.harvestDate).toLocaleDateString("vi-VN") : "Không có"}
                  </span>
                  <span>
                    Hết hạn:{" "}
                    {product?.expiryDate ? new Date(product.expiryDate).toLocaleDateString("vi-VN") : "Không có"}
                  </span>
                  <span>Nhà cung cấp: {product?.supplier}</span>
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
  )
}
