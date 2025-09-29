"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  sold: number
}

interface FeaturedProductsSidebarProps {
  products: Product[]
}

export function FeaturedProductsSidebar({ products }: FeaturedProductsSidebarProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Sản phẩm nổi bật</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover w-12 h-12 sm:w-16 sm:h-16"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{product.name}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-green-600 text-sm sm:text-base">
                    ₫{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    ₫{product.originalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Đã bán: {product.sold}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
