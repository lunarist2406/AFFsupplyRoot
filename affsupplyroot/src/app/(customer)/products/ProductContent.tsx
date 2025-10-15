"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart, Package } from "lucide-react"
import { useState, useEffect } from "react"
import { getProductsByCategoryGlobal } from "@/services/product"
import { ProductByCategoryGlobal } from "@/types/product"

interface ProductContentProps {
  searchTerm?: string
  sortBy?: string
  selectedCategoryId?: number | null
  selectedSubCategoryId?: number | null
  currentCategorySlug?: string
}

export function ProductContent({ searchTerm = "", sortBy = "name-asc", selectedCategoryId = null, selectedSubCategoryId = null, currentCategorySlug = "" }: ProductContentProps) {
  const router = useRouter()
  const [allProducts, setAllProducts] = useState<ProductByCategoryGlobal[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategoryId) {
        return
      }
      
      setLoading(true)
      try {
        const response = await getProductsByCategoryGlobal(selectedCategoryId, 1, 30, searchTerm)
        setAllProducts(response.data.products)
      } catch (error) {
        console.error("Không thể tải sản phẩm:", error)
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [selectedCategoryId, searchTerm])

  let filteredProducts = [...allProducts]

  if (selectedSubCategoryId) {
    filteredProducts = filteredProducts.filter(product => 
      product.id === selectedSubCategoryId
    )
  }

  // Sort products
  switch(sortBy) {
    case "name-asc":
      filteredProducts = filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "name-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
      break
    case "price-asc":
      filteredProducts = filteredProducts.sort((a, b) => a.basePrice - b.basePrice)
      break
    case "price-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.basePrice - a.basePrice)
      break

  }

  const products = filteredProducts

  const handleCardClick = (product: ProductByCategoryGlobal) => {
    if (currentCategorySlug) {
      router.push(`/products/${currentCategorySlug}/${product.slug}`)
    } else {
      router.push(`/products/${product.slug}`)
    }
  }
  
  const getProductImage = (product: ProductByCategoryGlobal) => {
    if (product.ProductImage.length > 0) {
      return product.ProductImage[0].url
    }
    return "/Gao-ST25.png"
  }
  return (
      <div className="w-full p-4 sm:p-6 min-h-full bg-gradient-to-b from-green-50 via-white to-green-50">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
                  Nông sản tươi ngon
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">Sản phẩm chất lượng cao</p>
              </div>
            </div>

          </div>
        </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-6 animate-pulse">
            <Package className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Đang tải sản phẩm...
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Vui lòng chờ trong giây lát.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-6">
            <Package className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            {searchTerm 
              ? `Không tìm thấy sản phẩm nào phù hợp với từ khóa "${searchTerm}". Hãy thử tìm kiếm với từ khóa khác.`
              : "Hiện tại chưa có sản phẩm nào trong danh mục này."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => {
            const hasTier = Array.isArray(product.PricingTier) && product.PricingTier.length > 0
            const minTierPrice = hasTier ? Math.min(...product.PricingTier.map(t => t.price)) : null
            return (
          <Card key={product.id} 
                className="bg-white hover:shadow-2xl transition-all duration-300 border border-gray-300 shadow-md hover:border-green-400/50 hover:ring-2 hover:ring-green-100 cursor-pointer overflow-hidden rounded-xl" 
                style={{gap:'0', padding: '0'}}
                onClick={() => handleCardClick(product)}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <Image 
                    src={getProductImage(product)} 
                    alt={product.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Badge */}
                {(product.soldCount > 0 || (product.PricingTier && product.PricingTier.length > 0)) && (
                  <div className="absolute top-3 left-3">
                    <span className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-md ${product.soldCount > 0 ? 'bg-green-500' : 'bg-orange-500'}`}>
                      {product.soldCount > 0 ? 'Bán chạy' : 'Giảm giá'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 hover:text-green-700 transition-colors text-sm mb-2 line-clamp-2 leading-tight">{product.title}</h3>
                
                <div className="mb-3 flex items-baseline gap-2">
                  {hasTier && minTierPrice !== null && minTierPrice < product.basePrice ? (
                    <>
                      <span className="text-xl font-extrabold text-green-700">{minTierPrice.toLocaleString('vi-VN')}₫</span>
                      <span className="text-sm text-gray-400 line-through">{product.basePrice.toLocaleString('vi-VN')}₫</span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Giá từ</span>
                    </>
                  ) : (
                    <span className="text-xl font-extrabold text-green-700">{product.basePrice.toLocaleString('vi-VN')}₫</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 font-medium">{(product.avgRating ?? 0).toFixed(1)}</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Đã bán {product.soldCount?.toLocaleString('vi-VN') ?? 0}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Kho: {product.stock}</span>
                  {product.stock > 0 ? (
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Còn hàng</span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">Hết hàng</span>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-11 font-medium transition-all duration-200 cursor-pointer rounded-lg shadow-lg hover:shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Thêm vào giỏ
              </Button>
            </CardFooter>
          </Card>
          )})}
        </div>
      )}
    </div>
  )
}
