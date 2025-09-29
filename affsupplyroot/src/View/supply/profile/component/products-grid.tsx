"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FaStar } from "react-icons/fa"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  sold: number
}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Sản phẩm của cửa hàng ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Hình sản phẩm */}
              <div className="relative mb-3 sm:mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-36 sm:h-40 lg:h-48 object-cover rounded"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm">
                  -{product.discount}%
                </Badge>
              </div>

              {/* Tên */}
              <h3 className="font-semibold mb-2 text-sm sm:text-base line-clamp-2">
                {product.name}
              </h3>

              {/* Giá */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-base sm:text-lg font-bold text-green-600">
                  ₫{product.price.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  ₫{product.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Rating + Sold */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-auto">
                <div className="flex items-center gap-1">
                  <FaStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
                <span>Đã bán: {product.sold}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
