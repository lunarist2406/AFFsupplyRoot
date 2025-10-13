"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ProductDetail } from '@/types/product'
import { Carousel, Image } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'

interface ProductGalleryProps {
  product: ProductDetail
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = (product.ProductImage.length > 0 
    ? product.ProductImage.map(img => img.url)
    : ["/Gao-ST25.png"]) as string[]

  const [selected, setSelected] = useState(0)
  const [previewVisible, setPreviewVisible] = useState(false)
  const carouselRef = useRef<CarouselRef | null>(null)
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg h-full"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Ảnh chính - Carousel của antd có arrows */}
        <div className="relative w-full flex-1 min-h-[320px] rounded-xl overflow-hidden bg-white border border-gray-200">
          <Carousel ref={carouselRef} arrows dots={false} adaptiveHeight afterChange={(idx) => setSelected(idx)}>
            {images.map((url, idx) => (
              <div key={idx} className="w-full h-full">
                <div
                  className="w-full h-full flex items-center justify-center bg-white cursor-zoom-in"
                  style={{ minHeight: 320 }}
                  onClick={() => setPreviewVisible(true)}
                >
                  <Image
                    src={url}
                    alt={`${product.title}-${idx}`}
                    width="100%"
                    height="100%"
                    style={{ height: '100%', objectFit: 'contain', background: 'white' }}
                    preview={false}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Thumbnails một hàng */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelected(idx)
                carouselRef.current?.goTo(idx, true)
              }}
              className={`relative rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                selected === idx ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ width: 88, height: 88 }}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <Image
                src={url}
                alt={`thumb-${idx}`}
                width={88}
                height={88}
                style={{ objectFit: 'contain', background: 'white' }}
                preview={false}
              />
            </button>
          ))}
        </div>

        <Image.PreviewGroup
          items={images}
          preview={{
            visible: previewVisible,
            current: selected,
            movable: true,
            minScale: 1,
            maxScale: 5,
            scaleStep: 0.5,
            getContainer: false,
            countRender: (current, total) => (
              <span>{current}/{total}</span>
            ),
            onChange: (current) => setSelected(current),
            onVisibleChange: (visible) => setPreviewVisible(visible)
          }}
        />
      </div>
    </motion.div>
  )
}
