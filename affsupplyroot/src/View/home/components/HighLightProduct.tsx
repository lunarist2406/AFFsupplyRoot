import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { products } from "../variable"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FeaturedProducts() {

  return (
    <section className="py-16 font-manuale">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
             <span className="text-yellow-primary">Sản Phẩm Nổi Bật</span>
          </h2>
          <Button className="text-yellow-primary hover:text-yellow-secondary font-medium">Xem tất cả →</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-600">đ{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">đ{product.originalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>Đã bán: {product.sold}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
