"use client"

import Image from "next/image"
import { Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card>
      <CardHeader>
        <CardTitle>Hình ảnh nông trại</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
