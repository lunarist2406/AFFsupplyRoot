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
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm nổi bật</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={50}
                height={50}
                className="rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">₫{product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₫{product.originalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Đã bán: {product.sold}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
