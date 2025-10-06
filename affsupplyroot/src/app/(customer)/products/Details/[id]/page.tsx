"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ShoppingBag, 
  Bell,
  MessageCircle, 
  Folder, 
  User,
  ChevronRight
} from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"

import { ProductGallery } from "./ProductGallery"
import { ProductInfo } from "./ProductInfo"
import { RelatedProducts } from "./RelatedProducts"

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id
  const { state } = useAuth()
  const { user, token } = state
  const [product, setProduct] = useState<{
    id: string
    name: string
    category: string
    price: number
    rating: number
    reviews: number
    description: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockProduct = {
      id: Array.isArray(productId) ? productId[0] : productId || "1",
      name: "Gạo ST25 Chính Hãng",
      category: "Lương thực",
      price: 45000,
      rating: 4.9,
      reviews: 900,
      description: "The World's Best Rice 2019"
    }
    
    setProduct(mockProduct)
    setLoading(false)
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #E8E2D5 0%, #D4C4A8 50%, #E8E2D5 100%)'
      }}>
        <div className="text-amber-800 text-lg font-semibold">Đang tải sản phẩm...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-manuale" style={{
      background: 'linear-gradient(135deg, #E8E2D5 0%, #D4C4A8 50%, #E8E2D5 100%)'
    }}>
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-green-700 hover:text-green-800 transition-colors font-medium flex items-center gap-1">
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4 text-amber-600" />
              <Link href="/products" className="text-green-700 hover:text-green-800 transition-colors font-medium">
                Sản phẩm
              </Link>
              <ChevronRight className="h-4 w-4 text-amber-600" />
              <span className="text-green-700 font-medium">{product?.category || 'Lương thực'}</span>
              <ChevronRight className="h-4 w-4 text-amber-600" />
              <span className="text-amber-800 font-semibold">{product?.name || 'Chi tiết'}</span>
            </div>
            
            {token && user && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-amber-700 hover:text-green-700 hover:bg-amber-100 h-10 w-10 rounded-full">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-amber-700 hover:text-green-700 hover:bg-amber-100 h-10 w-10 rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-amber-700 hover:text-green-700 hover:bg-amber-100 h-10 w-10 rounded-full">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-amber-700 hover:text-green-700 hover:bg-amber-100 h-10 w-10 rounded-full">
                  <Folder className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-amber-700 hover:text-green-700 hover:bg-amber-100 h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-3 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12 lg:items-stretch">
            <div className="lg:col-span-5 flex">
              <ProductGallery />
            </div>
            
            <div className="lg:col-span-7">
              {product && <ProductInfo product={product} />}
            </div>
          </div>
          
            <RelatedProducts />
        </div>
      </div>
    </div>
  )
}

