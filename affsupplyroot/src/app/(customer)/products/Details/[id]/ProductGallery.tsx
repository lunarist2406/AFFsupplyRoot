"use client"

import { useState } from 'react'
import { Image } from 'antd'
import { FaHeart, FaShare, FaExpand } from 'react-icons/fa6'

const productImages = [
  "/Gao-ST25.png",
  "/Gao-ST25.png",
  "/Gao-ST25.png", 
  "/Gao-ST25.png"
]

export function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <div className="bg-amber-50 rounded-3xl p-4 border-2 border-amber-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 w-full">
      <div className="relative group mb-6">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 shadow-inner">
          <Image
            height="100%"
            width="100%"
            src={productImages[selectedImage]}
            alt="Sản phẩm"
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            preview={{
              src: productImages[selectedImage],
            }}
          />
        </div>
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-amber-700 hover:bg-amber-100 hover:text-red-500'
            }`}
          >
            <FaHeart className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full backdrop-blur-sm bg-white/90 text-amber-700 hover:bg-amber-100 hover:text-green-700 transition-all duration-300 shadow-lg">
            <FaShare className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full backdrop-blur-sm bg-white/90 text-amber-700 hover:bg-amber-100 hover:text-green-700 transition-all duration-300 shadow-lg">
            <FaExpand className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            ✓ Chính hãng
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-amber-800 text-xs font-semibold">Hình ảnh sản phẩm</h3>
        <div className="grid grid-cols-4 gap-2">
          {productImages.map((image, index) => (
            <div 
              key={index}
              className={`w-full aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedImage === index 
                  ? 'ring-2 ring-green-600 shadow-md scale-105' 
                  : 'ring-1 ring-amber-200 hover:ring-green-400'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                width="100%"
                height="100%"
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-contain w-full h-full bg-gradient-to-br from-amber-50 to-orange-50"
                preview={{ src: image }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-2xl border border-amber-200/50 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-amber-900 font-bold text-lg">Gạo ST25 Chính Hãng</h4>
            <p className="text-amber-700 text-sm font-medium">The World&apos;s Best Rice 2019</p>
          </div>
          <div className="text-right">
            <p className="text-green-700 font-bold text-2xl">45.000₫</p>
            <p className="text-amber-600 text-sm">/kg</p>
          </div>
        </div>
      </div>
    </div>
  )
}

