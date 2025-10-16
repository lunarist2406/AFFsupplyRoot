/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Eye, Edit, Trash2, MoreHorizontal, AlertTriangle, MapPin, Power } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import logo from "../../../../../public/logo.png"
import useProducts from "@/hooks/useProducts"
import { toast } from "sonner"
import ProductDetailDialog from "./ProductDetailDialog"
import EditProductModal from "./EditProductDialog"

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

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const { fetchProducts, getProductById,deleteProduct, changeStatus } = useProducts()

  const handleView = async (id: number) => {
    try {
      setLoading(true)
      const product = await getProductById(id)
      setSelectedProduct(product)
      setOpenDialog(true)
    } catch (err) {
      toast.error(`Không thể xem chi tiết sản phẩm!+${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (id: number) => {
    try {
      const product = await getProductById(id)
      setSelectedProduct(product)
      setOpenEditDialog(true)
    } catch {
      toast.error("Không thể tải thông tin sản phẩm để chỉnh sửa!")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id)
      toast.success("Đã xóa sản phẩm thành công!")
      await fetchProducts()
    } catch {
      toast.error("Xóa sản phẩm thất bại!")
    }
  }

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await changeStatus(id)
      toast.success(`Sản phẩm đã được ${currentStatus ? "ẩn" : "kích hoạt"}!`)
      await fetchProducts()
    } catch {
      toast.error("Không thể thay đổi trạng thái sản phẩm!")
    }
  }

  return (
    
    <>
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex justify-center items-center z-50">
          <span className="text-white animate-spin">⏳</span>
        </div>
      )}
      <Card className="font-manuale">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Danh sách sản phẩm ({products.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="w-full sm:w-auto flex justify-center sm:block">
                    <Image
                      src={product?.ProductImage?.[0]?.url || logo}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-20 h-20 sm:w-20 sm:h-20 shrink-0"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2">
                      <div className="min-w-0 w-full sm:w-auto">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{product.title}</h3>
                        <Badge
                          variant={product.isActive ? "outline" : "destructive"}
                          className="text-[10px] sm:text-xs mt-1"
                        >
                          {product.slug}
                        </Badge>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 touch-manipulation">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs sm:text-sm">
                          <DropdownMenuItem onClick={() => handleView(product.id)}>
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(product.id, product.isActive ?? true)}>
                            <Power className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            {product.isActive ? "Ẩn sản phẩm" : "Kích hoạt lại"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-muted-foreground">Tồn kho</p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base sm:text-lg">
                            {product.stock} {product.unit}
                          </span>
                          {product.stock <= 10 && (
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 shrink-0" />
                          )}
                        </div>
                        <Progress value={(product.stock / 100) * 100} className="h-1.5 sm:h-2 mt-1" />
                      </div>

                      <div>
                        <p className="text-muted-foreground">Giá bán</p>
                        <p className="font-semibold break-words">
                          ₫{Number(product?.basePrice || 0).toLocaleString("vi-VN")}/{product?.unit || ""}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Vị trí</p>
                        <p className="font-medium flex items-center gap-1 break-words">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">
                            {Array.isArray(product?.region) ? product.region.join(", ") : "Không có"}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Ngày tạo</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ProductDetailDialog open={openDialog} onClose={() => setOpenDialog(false)} product={selectedProduct} />
      <EditProductModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        productData={selectedProduct}
        onUpdated={fetchProducts}
      />
    </>
  )
}
