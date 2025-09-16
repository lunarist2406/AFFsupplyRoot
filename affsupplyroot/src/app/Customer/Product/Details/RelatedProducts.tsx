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
    <div className="mt-8">
      <h2 className="text-yellow-300 text-lg font-semibold mb-4">Sản phẩm liên quan:</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-0">
              <div className="aspect-square rounded-t-lg overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={product.image}
                  alt={product.name}
                  className="object-contain bg-gradient-to-br from-gray-50 to-gray-100"
                  preview={{
                    src: product.image,
                  }}
                />
              </div>
              <div className="p-3 space-y-2"
              style={{padding:'3px'}}
              >
                <h3 className="text-white text-sm font-semibold line-clamp-1">{product.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-yellow-300 font-bold text-sm">{product.price.toLocaleString('vi-VN')} VND</span>
                  <span className="text-xs text-white/60 line-through">{product.originalPrice.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 flex items-center gap-1"><FaStar className="text-yellow-500 h-3 w-3" /> {product.rating}</span>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-2 rounded-xl text-xs h-9"
                  style={{padding:'3px'}}
                  >
                    <FaCartShopping className="h-4 w-4 mr-1" /> Mua ngay
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
