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
    <div className="w-full p-4 pt-0 min-h-full" style={{ 
      background: 'linear-gradient(180deg, #353D39 100%, #7E8C7C 100%, #353D39 5%)',
    }}>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-white/10 rounded-full p-6 mb-6 animate-pulse">
            <Package className="h-16 w-16 text-yellow-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Đang tải sản phẩm...
          </h3>
          <p className="text-gray-300 mb-6 max-w-md">
            Vui lòng chờ trong giây lát.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-white/10 rounded-full p-6 mb-6">
            <Package className="h-16 w-16 text-yellow-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-gray-300 mb-6 max-w-md">
            {searchTerm 
              ? `Không tìm thấy sản phẩm nào phù hợp với từ khóa "${searchTerm}". Hãy thử tìm kiếm với từ khóa khác.`
              : "Hiện tại chưa có sản phẩm nào trong danh mục này."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
          <Card key={product.id} 
                className="bg-[#353D39] hover:bg-[#404A46] transition-all duration-300 border-[#4A5551] shadow-lg hover:shadow-xl cursor-pointer" 
                style={{gap:'0', padding: '0'}}
                onClick={() => handleCardClick(product)}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-32 bg-[#FBF8EF] rounded-lg overflow-hidden shadow-inner">
                  <Image 
                    src={getProductImage(product)} 
                    alt={product.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="p-2" >
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{product.title}</h3>
                
                <div className="mb-2">
                  <span className="text-sm font-bold text-yellow-primary">
                    Giá: {product.basePrice.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                
                <div className="text-xs text-gray-300 mb-1">
                  Số lượng còn lại: {product.stock}
                </div>
                
                {product.SellerProfile && (
                  <div className="text-xs text-gray-400 line-clamp-1">
                    {product.SellerProfile.brandName}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-2 pt-0 flex gap-1 sm:gap-2">
              <Button 
                className="w-16 sm:w-20 bg-yellow-primary hover:bg-yellow-secondary text-black text-xs h-8 sm:h-9 font-medium shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="h-3 w-3" />
                <span className="ml-1">Mua</span>
              </Button>
              <Button 
                className="flex-1 bg-green-primary hover:bg-green-secondary text-white text-xs h-8 sm:h-9 font-medium transition-all duration-200 min-w-0 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="h-3 w-3 flex-shrink-0" />
                <span className="ml-1">Thêm vào giỏ</span>
              </Button>
            </CardFooter>
            
            <div className="px-4 pb-4 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-primary text-yellow-primary" />
                <span className="text-xs font-medium text-gray-300">5.0</span>
              </div>
              <div className="text-xs text-gray-300">
                Sản phẩm mới
              </div>
            </div>
          </Card>
          ))}
        </div>
      )}
    </div>
  )
}
