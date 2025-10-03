"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaCartShopping, FaStar, FaHeart, FaEye } from 'react-icons/fa6'
import { Image } from 'antd'
import { useState } from 'react'
import Link from 'next/link'

const relatedProducts = [
  {
    id: "1",
    name: "Gạo ST25 Premium",
    image: "/Gao-ST25.png",
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    category: "Gạo cao cấp"
  },
  {
    id: "2",
    name: "Gạo Jasmine Thái",
    image: "/Gao-ST25.png",
    price: 35000,
    originalPrice: 42000,
    rating: 4.7,
    category: "Gạo nhập khẩu"
  },
  {
    id: "3",
    name: "Gạo Nàng Thơm",
    image: "/Gao-ST25.png",
    price: 28000,
    originalPrice: 35000,
    rating: 4.6,
    category: "Gạo đặc sản"
  },
  {
    id: "4",
    name: "Gạo Basmati Ấn Độ",
    image: "/Gao-ST25.png",
    price: 38000,
    originalPrice: 45000,
    rating: 4.8,
    category: "Gạo nhập khẩu"
  },
  {
    id: "5",
    name: "Gạo Hương Lài",
    image: "/Gao-ST25.png",
    price: 32000,
    originalPrice: 40000,
    rating: 4.5,
    category: "Gạo thơm"
  }
]

export function RelatedProducts() {
  const [likedProducts, setLikedProducts] = useState<string[]>([])

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = relatedProducts.slice(0, 5)

  return (  
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-2">Sản phẩm liên quan</h2>
        <p className="text-amber-700">Khám phá thêm các sản phẩm nông sản chất lượng cao</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/details/${product.id}`}>
            <Card className="group bg-amber-50 border-2 border-amber-200/50 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl h-full flex flex-col">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    width="100%"
                    height="100%"
                    src={product.image}
                    alt={product.name}
                    className="object-contain bg-gradient-to-br from-amber-50 to-orange-50 group-hover:scale-110 transition-transform duration-500"
                    preview={false}
                  />
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(product.id)
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg ${
                        likedProducts.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-amber-700 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="p-2 rounded-full backdrop-blur-sm bg-white/90 text-amber-700 hover:text-green-700 transition-all duration-300 shadow-lg"
                    >
                      <FaEye className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.category}
                    </span>
                  </div>

                  {product.originalPrice > product.price && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3 flex flex-col flex-1 bg-gradient-to-b from-white to-amber-50/30">
                  <div className="space-y-2">
                    <h3 className="text-amber-900 text-sm font-bold line-clamp-2 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-500' 
                              : 'text-amber-300'
                          }`} 
                        />
                      ))}
                      <span className="text-amber-700 text-xs ml-1 font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-700 font-bold text-lg">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-amber-500 text-sm line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={(e) => e.preventDefault()}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-lg"
                  >
                    <FaCartShopping className="h-4 w-4" />
                    <span>Thêm vào giỏ</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/products">
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
            Xem thêm sản phẩm 
          </Button>
        </Link>
      </div>
    </div>
  )
}

