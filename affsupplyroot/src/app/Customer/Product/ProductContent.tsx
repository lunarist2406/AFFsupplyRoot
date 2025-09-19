"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart } from "lucide-react"

const allProducts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Gạo ST - 25 ${i + 1}`,
  price: 45000 + (i * 5000),
  originalPrice: 55000 + (i * 5000),
  stock: 40 + (i * 2),
  sold: 1247 + (i * 100),
  rating: 5.0
}))

interface ProductContentProps {
  searchTerm?: string
  sortBy?: string
}

export function ProductContent({ searchTerm = "", sortBy = "name-asc" }: ProductContentProps) {
  const router = useRouter()
  
  // Filter và sort products
  let filteredProducts = allProducts

  // Search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Sort products
  switch(sortBy) {
    case "name-asc":
      filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
    case "price-asc":
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "sold-desc":
      filteredProducts = filteredProducts.sort((a, b) => b.sold - a.sold)
      break
  }

  const products = filteredProducts

  const handleCardClick = () => {
    router.push('/customer/product/details')
  }
  return (
    <div className="flex-1 p-6" style={{ 
      background: 'linear-gradient(180deg, #353D39 100%, #7E8C7C 100%, #353D39 5%)',
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {products.map((product) => (
          <Card key={product.id} 
                className="bg-[#353D39] hover:bg-[#404A46] transition-all duration-300 border-[#4A5551] shadow-lg hover:shadow-xl cursor-pointer" 
                style={{gap:'0', padding: '0'}}
                onClick={handleCardClick}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-32 bg-[#FBF8EF] rounded-lg overflow-hidden shadow-inner">
                  <img 
                    src="/Gao-ST25.png" 
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="p-2" >
                <h3 className="font-semibold text-white text-sm mb-2">{product.name}</h3>
                
                <div className="mb-2">
                  <span className="text-sm font-bold text-yellow-primary">
                    Giá: {product.price.toLocaleString('vi-VN')} VND
                  </span>
                  <span className="text-xs text-gray-400 line-through ml-1">
                    {product.originalPrice.toLocaleString('vi-VN')} vnd
                  </span>
                </div>
                
                <div className="text-xs text-gray-300 mb-3">
                  Số lượng còn lại: {product.stock}
                </div>
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
                <span className="text-xs font-medium text-gray-300">{product.rating}</span>
              </div>
              <div className="text-xs text-gray-300">
                Đã bán: {product.sold}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 pt-6 border-t border-white/20">
        <div className="flex justify-between items-center text-white/80 text-sm">
          <p className="text-xs text-green-secondary text-center">
            © 2025 AFF supplyRoot. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-yellow-primary">Điều khoản</Link>
            <Link href="/privacy" className="text-yellow-primary">Quyền riêng tư</Link>
            <Link href="/cookies" className="text-yellow-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
