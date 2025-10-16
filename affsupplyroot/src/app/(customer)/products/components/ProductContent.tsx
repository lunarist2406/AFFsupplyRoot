"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import {
  Star,
  ShoppingCart,
  Package,
  TrendingUp,
  Percent,
  Sparkles,
  Leaf,
  MapPin,
  Award,
  Search,
  SlidersHorizontal,
  Eye,
  Tag,
} from "lucide-react"
import { useMemo, useCallback } from "react"
import type { ProductByCategoryGlobal } from "@/types/product"
import { useProductsByCategory } from "@/hooks/useProductData"
import { PRODUCT_THRESHOLDS } from "@/constants/product"

interface ProductContentProps {
  searchTerm?: string
  sortBy?: string
  categorySlug?: string | null
  categories?: Array<{ id: number; slug: string; name: string }>
  onSearchChangeAction?: (value: string) => void
  onSortChangeAction?: (value: string) => void
}

interface ProductPricing {
  hasTier: boolean
  minTierPrice: number | null
  isDiscounted: boolean
  discountPercent: number
}

function calculateProductPricing(product: ProductByCategoryGlobal): ProductPricing {
  const hasTier = Array.isArray(product.PricingTier) && product.PricingTier.length > 0
  const minTierPrice = hasTier ? Math.min(...product.PricingTier.map((t) => t.price)) : null
  const isDiscounted = hasTier && minTierPrice !== null && minTierPrice < product.basePrice
  const discountPercent = isDiscounted
    ? Math.round(((product.basePrice - (minTierPrice as number)) / product.basePrice) * 100)
    : 0

  return { hasTier, minTierPrice, isDiscounted, discountPercent }
}

export function ProductContent({
  searchTerm = "",
  sortBy = "name-asc",
  categorySlug = null,
  categories = [],
  onSearchChangeAction = () => {},
  onSortChangeAction = () => {},
}: ProductContentProps) {
  const router = useRouter()
  const params = useParams() as { slug?: string[] }
  
  const categorySlugFromUrl = Array.isArray(params?.slug) && params.slug.length > 0 ? params.slug[0] : null
  const finalCategorySlug = categorySlug || categorySlugFromUrl
  
  // Sử dụng SWR hook
  const { products: allProducts, isLoading: loading, isError, error: fetchError } = useProductsByCategory(
    finalCategorySlug,
    searchTerm,
    categories
  )

  // Cart hook
  const { addItem } = useCart()

  const products = useMemo(() => {
    const filtered = [...allProducts]

    // Sort products
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title, "vi"))
        break
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title, "vi"))
        break
      case "price-asc":
        filtered.sort((a, b) => a.basePrice - b.basePrice)
        break
      case "price-desc":
        filtered.sort((a, b) => b.basePrice - a.basePrice)
        break
      case "rating-desc":
        filtered.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
        break
      case "sold-desc":
        filtered.sort((a, b) => b.soldCount - a.soldCount)
        break
    }

    return filtered
  }, [allProducts, sortBy])

  const handleCardClick = useCallback((product: ProductByCategoryGlobal) => {
    router.push(`/${product.slug}`)
  }, [router])

  const getProductImage = useCallback((product: ProductByCategoryGlobal) => {
    if (product.ProductImage && product.ProductImage.length > 0) {
      const mainImage = product.ProductImage.find((img) => img.isMain)
      return mainImage?.url || product.ProductImage[0].url
    }
    return `https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center&auto=format&q=80`
  }, [])

  const handleAddToCart = useCallback((e: React.MouseEvent, product: ProductByCategoryGlobal) => {
    e.stopPropagation()
    
    try {
      addItem({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: getProductImage(product),
        basePrice: product.basePrice,
        minOrderQty: 1,
        stock: product.stock,
        shopId: product.SellerProfile?.id || 0,
        shopName: product.SellerProfile?.brandName || 'Unknown',
        shopSlug: product.SellerProfile?.slug || ''
      })
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ:', error)
    }
  }, [addItem, getProductImage])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-green-50/30 p-3 sm:p-4 lg:p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-4 space-y-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-emerald-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm nông sản tươi ngon..."
                value={searchTerm}
                onChange={(e) => onSearchChangeAction(e.target.value)}
                className="pl-12 h-12 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 bg-white shadow-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 sm:w-auto w-full">
              <SlidersHorizontal className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <Select value={sortBy} onValueChange={onSortChangeAction}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 bg-white shadow-sm sm:w-[220px] w-full">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Tên A-Z</SelectItem>
                  <SelectItem value="name-desc">Tên Z-A</SelectItem>
                  <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                  <SelectItem value="rating-desc">Đánh giá cao nhất</SelectItem>
                  <SelectItem value="sold-desc">Bán chạy nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchTerm && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-emerald-700">Tìm kiếm:</span>
              <Badge className="px-3 py-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-semibold">
                {searchTerm}
              </Badge>
              <button onClick={() => onSearchChangeAction("")} className="text-emerald-600 hover:text-emerald-800 underline font-medium">
                Xóa
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-10 mb-6 animate-pulse shadow-xl border-2 border-emerald-200/50">
                <Package className="h-24 w-24 text-emerald-600" />
              </div>
              <Sparkles className="absolute -top-3 -right-3 h-10 w-10 text-amber-400 animate-bounce" />
              <Leaf className="absolute -bottom-2 -left-2 h-8 w-8 text-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Đang tải sản phẩm...</h3>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Vui lòng chờ trong giây lát, chúng tôi đang tìm những sản phẩm tươi ngon nhất cho bạn.
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="bg-gradient-to-br from-red-100/80 to-orange-100/60 rounded-3xl p-10 mb-6 shadow-xl border-2 border-red-200/50">
              <Package className="h-24 w-24 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Đã xảy ra lỗi</h3>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              {fetchError?.message || "Không thể tải sản phẩm. Vui lòng thử lại sau."}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/60 rounded-3xl p-10 mb-6 shadow-xl border-2 border-amber-200/50">
              <Package className="h-24 w-24 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Không tìm thấy sản phẩm nào</h3>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              {searchTerm
                ? `Không tìm thấy sản phẩm nào phù hợp với từ khóa "${searchTerm}". Hãy thử tìm kiếm với từ khóa khác.`
                : "Hiện tại chưa có sản phẩm nào trong danh mục này. Vui lòng quay lại sau."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const pricing = calculateProductPricing(product)
              const hasHighRating = (product.avgRating ?? 0) >= PRODUCT_THRESHOLDS.HIGH_RATING
              const isPopular = product.soldCount > PRODUCT_THRESHOLDS.POPULAR_SALES

              return (
                <Card
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm hover:shadow-xl hover:border-green-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col py-0"
                >
                  <CardContent className="p-0 flex flex-col">
                    <div className="relative h-44 bg-gradient-to-br from-green-primary/10 to-green-secondary/10 overflow-hidden flex-shrink-0">
                      <Image
                        src={getProductImage(product) || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {pricing.isDiscounted && (
                          <Badge className="flex items-center gap-1 bg-red-primary text-white border-0 shadow-lg">
                            <Percent className="h-3 w-3" />
                            <span className="font-bold">-{pricing.discountPercent}%</span>
                          </Badge>
                        )}
                        {isPopular && (
                          <Badge className="flex items-center gap-1 bg-green-primary text-white border-0 shadow-lg">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-bold">Hot</span>
                          </Badge>
                        )}
                        {hasHighRating && (
                          <Badge className="flex items-center gap-1 bg-yellow-primary text-white border-0 shadow-lg">
                            <Star className="h-3 w-3 fill-white" />
                            <span className="font-bold">{product.avgRating?.toFixed(1)}</span>
                          </Badge>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        {product.stock > 0 ? (
                          <Badge className="bg-white/95 backdrop-blur-sm text-green-primary border border-green-primary/30 shadow-md font-bold">
                            Còn hàng
                          </Badge>
                        ) : (
                          <Badge className="bg-white/95 backdrop-blur-sm text-red-primary border border-red-primary/30 shadow-md font-bold">
                            Hết hàng
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col p-3 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {product.CategoryGlobal && (
                          <Badge variant="outline" className="text-xs border-green-primary/30 text-green-primary bg-green-primary/10">
                            <Tag className="h-3 w-3 mr-1" />
                            {product.CategoryGlobal.name}
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-base font-bold leading-snug text-green-primary line-clamp-2 group-hover:text-green-secondary transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs">
                        {(product.brand || product.SellerProfile?.brandName) && (
                          <div className="flex items-center gap-1 text-green-secondary">
                            <Leaf className="h-3 w-3" />
                            <span className="font-medium truncate">
                              {product.brand || product.SellerProfile?.brandName}
                            </span>
                          </div>
                        )}
                        {product.origin && (
                          <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{product.origin}</span>
                          </div>
                        )}
                      </div>

                      {product.certifications && (
                        <div className="flex items-center gap-1 text-xs text-yellow-secondary">
                          <Award className="h-3 w-3" />
                          <span className="font-medium">{product.certifications}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.avgRating ?? 0)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        {product.soldCount > 0 && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {product.soldCount}
                          </span>
                        )}
                      </div>

                      <div className="mt-1">
                        {pricing.isDiscounted ? (
                          <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-red-primary">
                                {pricing.minTierPrice!.toLocaleString("vi-VN")}₫
                              </span>
                              {product.unit && (
                                <span className="text-xs text-gray-500">/{product.unit}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400 line-through">
                                {product.basePrice.toLocaleString("vi-VN")}₫
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-green-primary">
                              {product.basePrice.toLocaleString("vi-VN")}₫
                            </span>
                            {product.unit && (
                              <span className="text-xs text-gray-500">/{product.unit}</span>
                            )}
                          </div>
                        )}
                      </div>

                      <Button
                        className="h-9 w-full rounded-lg bg-green-primary text-white text-sm font-semibold shadow-sm transition-all hover:bg-green-secondary hover:shadow-md active:scale-95 flex items-center justify-center gap-1.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {product.stock <= 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}