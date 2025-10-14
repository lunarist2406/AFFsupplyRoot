"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Types từ shop service
interface ShopProduct {
  id: number
  title: string
  slug: string
  description: string
  origin: string
  brand: string
  unit: string
  region: string[]
  condition: string[]
  season: string[]
  storageInstructions: string
  usageInstructions: string
  certifications: string
  basePrice: number
  minOrderQty: number
  isActive: boolean
  isFeatured: boolean
  stock: number
  soldCount: number
  avgRating: number
  totalReviews: number
  createdAt: string
  CategoryGlobal: {
    id: number
    name: string
  }
  CategoryShop: {
    id: number
    name: string
  } | null
  updatedAt: string
  ProductImage: Array<{
    url: string
    isMain: boolean
  }>
  PricingTier: Array<{
    minQty: number
    price: number
  }>
}
import { Star, ShoppingCart, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { getShopProducts } from "@/services/shop"

interface ShopProductsProps {
  shopSlug: string
  currentProductId?: number
}

export function ShopProducts({ shopSlug, currentProductId }: ShopProductsProps) {
  const [products, setProducts] = useState<ShopProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)
    fetchProducts(1, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSlug])

  const fetchProducts = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (loading) return
    setLoading(true)
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const response = await getShopProducts(shopSlug, pageNum, 8)
      const newProducts = response.data.products.filter(product => product.id !== currentProductId)
      setProducts(prev => (append ? [...prev, ...newProducts] : newProducts))
      setHasMore(pageNum < response.data.pagination.totalPages)
    } catch (error) {
      const err = error as unknown as { name?: string }
      if (err?.name !== 'AbortError') {
        console.error("Không thể tải sản phẩm của shop:", error)
      }
    } finally {
      setLoading(false)
    }
  }, [shopSlug, currentProductId, loading])

  useEffect(() => {
    if (!observerRef.current) return
    if (!hasMore) return
    const el = observerRef.current
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !loading && hasMore) {
        const next = page + 1
        setPage(next)
        fetchProducts(next, true)
      }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.unobserve(el)
  }, [page, hasMore, loading, fetchProducts])

  const getProductImage = useCallback((product: ShopProduct) => {
    return product.ProductImage[0]?.url || "/Gao-ST25.png"
  }, [])

  const getFormattedPrice = useCallback((product: ShopProduct) => {
    if (product.PricingTier.length > 0) {
      const lowestPrice = Math.min(...product.PricingTier.map(tier => tier.price))
      if (lowestPrice < product.basePrice) {
        return `${lowestPrice.toLocaleString('vi-VN')} - ${product.basePrice.toLocaleString('vi-VN')} VND`
      }
    }
    return `${product.basePrice.toLocaleString('vi-VN')} VND`
  }, [])

  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlZWUnLz48L3N2Zz4="

  const ProductCard = useMemo(() => React.memo(function CardItem({ product }: { product: ShopProduct }) {
    return (
      <Card 
        key={product.id} 
        className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 cursor-pointer group"
      >
        <Link prefetch href={`/products/${product.CategoryGlobal.name.toLowerCase().replace(/\s+/g, '-')}/${product.slug}`}>
          <CardContent className="p-0">
            <div className="relative">
              <div className="h-48 bg-gray-50 rounded-t-lg overflow-hidden">
                <Image 
                  src={getProductImage(product)} 
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  loading="lazy"
                />
              </div>
              {product.isFeatured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">Nổi bật</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-yellow-primary transition-colors">
                {product.title}
              </h4>
              <div className="mb-2">
                <span className="text-sm font-bold text-red-500">{getFormattedPrice(product)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Kho: {product.stock}</span>
                <span>Đã bán: {product.soldCount}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-600">
                  {product.avgRating > 0 ? product.avgRating.toFixed(1) : "Chưa có đánh giá"}
                </span>
                <span className="text-xs text-gray-400">({product.totalReviews})</span>
              </div>
              <div className="text-xs text-gray-400">{product.CategoryGlobal.name}</div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-yellow-primary hover:bg-yellow-secondary text-black text-sm font-medium cursor-pointer"
            onClick={(e) => { e.preventDefault(); console.log("Add to cart:", product.id) }}
          >
            <ShoppingCart className="h-4 w-4 mr-2 " /> Thêm vào giỏ
          </Button>
        </CardFooter>
      </Card>
    )
  }), [getProductImage, getFormattedPrice])

  if (loading && products.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Sản phẩm khác của shop</h3>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-6 animate-pulse">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-3">
            Đang tải sản phẩm...
          </h3>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Sản phẩm khác của shop</h3>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-6">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-3">
            Shop chưa có sản phẩm nào khác
          </h3>
          <p className="text-gray-500">
            Hãy quay lại sau để xem thêm sản phẩm mới từ shop này.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Sản Phẩm Khác Của Shop</h3>
        <Link prefetch href={`/shop/${shopSlug}`}>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer">
            Xem tất cả
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={observerRef} className="h-6" />
      {loading && (
        <div className="text-center text-sm text-gray-500">Đang tải thêm...</div>
      )}
    </div>
  )
}
