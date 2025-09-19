"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaCartShopping, FaStar } from 'react-icons/fa6'
import { Image } from 'antd'

const relatedProducts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: "Gạo ST - 25",
  image: "/Gao-ST25.png",
  price: 45000,
  originalPrice: 55000,
  rating: 4.8
}))

export function RelatedProducts() {
  return (  
    <div className="mt-6 lg:mt-8">
      <h2 className="text-yellow-primary text-base sm:text-lg font-semibold mb-3 sm:mb-4">Sản phẩm liên quan:</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-primary/40 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl h-full flex flex-col"
          style={{padding: '0'}}
          >
            <CardContent className="p-0 h-full flex flex-col">
              <div className="aspect-square rounded-t-lg overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={product.image}
                  alt={product.name}
                  className="object-contain bg-gradient-to-br from-gray-50 to-gray-100"
                  preview={false}
                />
              </div>
              <div className="p-2 sm:p-3 space-y-2 flex flex-col">
                <h3 className="text-white text-xs sm:text-sm font-semibold line-clamp-1">{product.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-yellow-primary font-bold text-xs sm:text-sm">{product.price.toLocaleString('vi-VN')} VND</span>
                  <span className="text-xs text-white/60 line-through">{product.originalPrice.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex flex-col items-start justify-between gap-2 w-full min-w-0 pt-2">
                  <span className="text-xs text-white/70 flex items-center gap-1 flex-shrink-0">
                    <FaStar className="text-yellow-primary h-3 w-3" /> {product.rating}
                  </span>
                  <Button className="inline-flex w-full max-w-full bg-green-primary hover:bg-green-secondary text-white font-semibold px-3 sm:px-4 rounded-xl text-xs sm:text-sm h-10 sm:h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap leading-none text-center">
                    <FaCartShopping className="h-3 w-3 sm:h-4 sm:w-4" /> 
                    <span>Mua</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
