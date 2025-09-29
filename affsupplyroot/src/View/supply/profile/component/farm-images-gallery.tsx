"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaEye } from "react-icons/fa"

interface FarmImage {
  id: string
  url: string
  title: string
}

interface FarmImagesGalleryProps {
  images: FarmImage[]
}

export function FarmImagesGallery({ images }: FarmImagesGalleryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Hình ảnh cửa hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                width={300}
                height={360}
                className="w-full h-40 sm:h-60 md:h-60 lg:h-80 object-cover rounded-lg"
              />
              {/* Overlay khi hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-center text-white px-2">
                  <FaEye className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-medium truncate">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
