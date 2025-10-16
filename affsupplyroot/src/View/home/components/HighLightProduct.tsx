"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { products } from "../variable"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation"

export function FeaturedProducts() {
  const router = useRouter()
  const shouldShowIndicators = products.length > 6

  return (
    <section className="py-16 font-manuale">
      <div className="container mx-auto lg:px-10 px-4">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-yellow-primary font-bold flex items-center gap-2">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
              Sản Phẩm Nổi Bật
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="relative"
          autoplay
          interval={2000}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <Card
                  className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => router.push("/products/trai-cay-tuoi")}
                >
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={200}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm">
                      -{product.discount}%
                    </Badge>
                  </div>

                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base md:text-lg">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base sm:text-lg font-bold text-green-600">
                        đ{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        đ{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                      <span>Đã bán: {product.sold}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Prev / Next buttons */}
          {shouldShowIndicators && (
            <>
              <CarouselPrevious className="hidden lg:flex bg-white text-black hover:bg-gray-200 shadow" />
              <CarouselNext className="hidden lg:flex bg-white text-black hover:bg-gray-200 shadow" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  )
}
