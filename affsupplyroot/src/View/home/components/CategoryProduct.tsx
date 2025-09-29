import { Card, CardContent } from "@/components/ui/card"
import { categories } from "../variable"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CategoryProduct() {
  return (
    <section className="py-16 font-manuale">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <span className="text-yellow-primary">Danh Mục Nông Sản</span>
          </h2>
          <Button className="text-yellow-primary hover:text-yellow-secondary font-medium text-sm md:text-base">
            Xem tất cả →
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#351A1A] border-green-200"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-yellow-secondary mb-2 text-xs md:text-sm lg:text-lg text-white">
                    {category.name}
                  </h3>
                  <p className="text-[10px] md:text-xs lg:text-base text-yellow-primary mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="text-[10px] md:text-xs lg:text-sm text-yellow-primary font-medium">
                    {category.products}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
