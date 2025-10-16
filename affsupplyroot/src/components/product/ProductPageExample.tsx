"use client"

import Image from "next/image"
import ProductInteraction from "./ProductInteraction"

interface ProductPageExampleProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  initialLiked?: boolean
  initialLikeCount?: number
}

export default function ProductPageExample({
  productId,
  productName,
  productPrice,
  productImage,
  initialLiked = false,
  initialLikeCount = 0
}: ProductPageExampleProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <Image
            src={productImage}
            alt={productName}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{productName}</h1>
          <p className="text-2xl font-semibold text-orange-500">
            {productPrice.toLocaleString('vi-VN')} VNĐ
          </p>
          
          <div className="pt-4">
            <ProductInteraction
              productId={productId}
              initialLiked={initialLiked}
              initialLikeCount={initialLikeCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
