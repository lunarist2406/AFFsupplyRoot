"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm của cửa hàng ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="relative mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-green-600">₫{product.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ₫{product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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
