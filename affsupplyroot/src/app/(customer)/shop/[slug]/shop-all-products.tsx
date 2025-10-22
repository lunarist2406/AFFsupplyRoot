"use client"

import { useEffect, useState } from "react"
import { getShopProducts } from "@/services/shop"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Package } from "lucide-react"
import { useCart } from "@/hooks/useCart"

interface ShopProduct {
  id: number
  title: string
  slug: string
  basePrice: number
  stock: number
  soldCount: number
  avgRating: number
  totalReviews: number
  minOrderQty: number
  CategoryGlobal: { id: number; name: string }
  ProductImage: Array<{ url: string; isMain: boolean }>
  PricingTier: Array<{ minQty: number; price: number }>
}

export default function ShopAllProducts({ shopSlug }: { shopSlug: string }) {
  const { addItem } = useCart()
  const [products, setProducts] = useState<ShopProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setProducts([])
    setPage(1)
    fetchProducts(1, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSlug])

  const fetchProducts = async (pageNum: number, append: boolean) => {
    setLoading(true)
    try {
      const res = await getShopProducts(shopSlug, pageNum, 16)
      const newProducts = res.data.products
      setProducts(prev => (append ? [...prev, ...newProducts] : newProducts))
      setHasMore(pageNum < res.data.pagination.totalPages)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchProducts(next, true)
  }

  const getImg = (p: ShopProduct) => (p.ProductImage[0]?.url || "/Gao-ST25.png")

  const priceText = (p: ShopProduct) => {
    if (p.PricingTier.length > 0) {
      const low = Math.min(...p.PricingTier.map(t => t.price))
      if (low < p.basePrice) return `${low.toLocaleString('vi-VN')} - ${p.basePrice.toLocaleString('vi-VN')} VND`
    }
    return `${p.basePrice.toLocaleString('vi-VN')} VND`
  }

  const handleAddToCart = (e: React.MouseEvent, p: ShopProduct) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (p.stock <= 0) {
      return
    }

    addItem({
      id: p.id,
      title: p.title,
      slug: p.slug,
      image: getImg(p),
      basePrice: p.basePrice,
      minOrderQty: p.minOrderQty || 1,
      stock: p.stock,
      shopId: 0,
      shopName: shopSlug,
      shopSlug: shopSlug,
    })
  }

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-6 animate-pulse">
          <Package className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-3">Đang tải sản phẩm...</h3>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tất cả sản phẩm</h2>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <Package className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-500">Shop chưa có sản phẩm</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <Card key={p.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all">
                <Link href={`/${p.slug}`}>
                  <CardContent className="p-0">
                    <div className="h-48 bg-gray-50 rounded-t-lg overflow-hidden">
                      <Image src={getImg(p)} alt={p.title} width={400} height={400} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{p.title}</h4>
                      <div className="text-sm font-bold text-red-500 mb-2">{priceText(p)}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Kho: {p.stock}</span>
                        <span>Đã bán: {p.soldCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{p.avgRating > 0 ? p.avgRating.toFixed(1) : "Chưa có đánh giá"}</span>
                        <span className="text-gray-400">({p.totalReviews})</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full bg-yellow-primary hover:bg-yellow-secondary text-black text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={(e) => handleAddToCart(e, p)}
                    disabled={p.stock <= 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> 
                    {p.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button onClick={loadMore} disabled={loading} variant="outline" className="border-yellow-primary text-yellow-primary hover:bg-yellow-primary hover:text-black">
                {loading ? "Đang tải..." : "Xem thêm"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}


