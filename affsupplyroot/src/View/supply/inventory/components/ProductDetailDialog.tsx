/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import logo from "../../../../../public/logo.png"

interface Product {
  id: number
  title: string
  slug: string
  unit: string
  stock: number
  basePrice: number
  region: string[]
  createdAt: string
  updatedAt: string
  isActive?: boolean
  ProductImage: { url: string }[]
  PricingTier: any[]
}

interface ProductDetailDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
}

export default function ProductDetailDialog({ open, onClose, product }: ProductDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg font-manuale mx-4">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Chi tiết sản phẩm</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Thông tin chi tiết về sản phẩm được chọn</DialogDescription>
        </DialogHeader>

        {product ? (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <Image
                src={product?.ProductImage?.[0]?.url || logo}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-lg object-cover w-32 h-32 sm:w-48 sm:h-48 md:w-52 md:h-52"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Tên sản phẩm</p>
                <p className="break-words">{product.title}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Giá bán</p>
                <p className="break-words">
                  ₫{Number(product?.basePrice || 0).toLocaleString("vi-VN")}/{product?.unit || ""}
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Tồn kho</p>
                <p>
                  {product.stock} {product.unit}
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Khu vực</p>
                <p className="break-words">{Array.isArray(product?.region) ? product.region.join(", ") : "Không có"}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Ngày tạo</p>
                <p>{new Date(product.createdAt).toLocaleDateString("vi-VN")}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Trạng thái</p>
                <Badge variant={product.isActive ? "outline" : "destructive"} className="text-xs">
                  {product.isActive ? "Đang hoạt động" : "Đã ẩn"}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4 sm:py-6 text-xs sm:text-sm">Đang tải dữ liệu...</p>
        )}

        <DialogFooter className="flex-row justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="h-8 sm:h-9 text-xs sm:text-sm bg-transparent">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
