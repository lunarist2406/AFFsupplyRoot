"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProductGallery } from "../../(customer)/products/components/ProductGallery"
import { ProductInfo } from "../../(customer)/products/components/ProductInfo"
import { ProductDescription } from "../../(customer)/products/components/ProductDescription"
import { ShopInfo } from "../../(customer)/products/components/ShopInfo"
import dynamic from "next/dynamic"

const ShopProducts = dynamic(
  () => import("../../(customer)/products/components/ShopProducts").then(mod => ({ default: mod.ShopProducts })),
  { 
    loading: () => (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

const CommentSection = dynamic(
  () => import("@/components/product/CommentSection"),
  { 
    loading: () => (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)
import { getProductBySlug } from "@/services/product"
import { getShopBySlug } from "@/services/shop"
import type { ProductDetail } from "@/types/product"
import { Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/layout/Header"
import Footer from "@/layout/Footer"

interface ShopDetail {
  id: number
  slug: string
  brandName: string
  companyName: string
  businessPhone: string
  businessAddress: string
  description: string
  shopAvatar: string | null
  shopBanner: string | null
  avgRating: number
  totalReviews: number
  totalFollowers: number
  status: string
  createdAt: string
  user: {
    id: number
    name: string
    email: string
    avatar: string | null
  }
  ShopReview: Array<{
    id: number
    rating: number
    comment: string
    createdAt: string
    user: {
      id: number
      name: string
      avatar: string | null
    }
    ReviewShopImage: Array<{
      url: string
    }>
  }>
  categoriesShop: Array<{
    id: number
    name: string
    slug: string
  }>
  isFollowed: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [shop, setShop] = useState<ShopDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productSlug = params.slug as string

  useEffect(() => {
    const loadProduct = async () => {
      if (!productSlug) return
      
      try {
        setLoading(true)
        setError(null)
        const productResponse = await getProductBySlug(productSlug)
        setProduct(productResponse.data)
        
        const shopSlug = productResponse.data.SellerProfile?.slug
        if (shopSlug) {
          getShopBySlug(shopSlug)
            .then(shopRes => setShop(shopRes.data))
            .catch(shopError => {
              console.error("Lỗi khi tải thông tin shop:", shopError)
            })
        }
        
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err)
        setError("Không thể tải thông tin sản phẩm")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productSlug])

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-1 flex-col font-manuale min-h-screen bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
                  <div className="animate-pulse">
                    <div className="w-full h-[400px] bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-1 flex-col font-manuale h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-br from-red-100/80 to-orange-100/60 rounded-3xl p-10 mb-6 shadow-xl border-2 border-red-200/50">
              <Package className="h-24 w-24 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              {error || "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa."}
            </p>
            <Button 
              onClick={() => router.back()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col font-manuale min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <ProductGallery product={product} />
            </div>
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-5">
          <ProductDescription product={product} />
          
          {shop && (
            <ShopInfo shop={shop} />
          )}
          
          {shop && (
            <ShopProducts 
              shopSlug={shop.slug} 
              currentProductId={product?.id}
            />
          )}
          
          <CommentSection 
            productId={product.id} 
            hasPurchased={false} 
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
