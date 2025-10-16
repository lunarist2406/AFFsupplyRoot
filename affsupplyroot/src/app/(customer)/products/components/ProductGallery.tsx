"use client"

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProductDetail } from '@/types/product'
import { Carousel, Image } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'

interface ProductGalleryProps {
  product: ProductDetail
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => 
    (product.ProductImage.length > 0 
      ? product.ProductImage.map(img => img.url)
      : ["/Gao-ST25.png"]) as string[],
    [product.ProductImage]
  )

  const [selected, setSelected] = useState(0)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false))
  const carouselRef = useRef<CarouselRef | null>(null)

  useEffect(() => {
    if (images.length > 0) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = images[0]
      document.head.appendChild(link)
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [images])

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }
  
  return (
    <motion.div 
      initial={false} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }} 
      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg h-full"
    >
      <div className="flex flex-col h-full gap-4">
        <div className="relative w-full flex-1 min-h-[400px] rounded-xl overflow-hidden bg-white border border-gray-200">
          <Carousel 
            ref={carouselRef} 
            arrows 
            dots={false} 
            adaptiveHeight 
            afterChange={(idx) => setSelected(idx)}
            lazyLoad="ondemand" 
          >
            {images.map((url, idx) => (
              <div key={idx} className="w-full h-full">
                <div
                  className="w-full h-full flex items-center justify-center bg-white cursor-zoom-in relative"
                  style={{ minHeight: 400 }}
                  onClick={() => setPreviewVisible(true)}
                >
                  {!imagesLoaded[idx] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <Image
                    src={url}
                    alt={`${product.title}-${idx + 1}`}
                    width="100%"
                    height="100%"
                    style={{ 
                      height: '100%', 
                      objectFit: 'contain', 
                      background: 'white',
                      opacity: imagesLoaded[idx] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    preview={false}
                    loading={idx === 0 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(idx)}
                    placeholder={
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
                      </div>
                    }
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelected(idx)
                carouselRef.current?.goTo(idx, true)
              }}
              className={`relative rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                selected === idx 
                  ? 'border-orange-500 ring-2 ring-orange-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:scale-105'
              }`}
              style={{ width: 88, height: 88 }}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <Image
                src={url}
                alt={`thumb-${idx + 1}`}
                width={88}
                height={88}
                style={{ objectFit: 'contain', background: 'white' }}
                preview={false}
                loading="lazy" // Lazy load cho thumbnails
                placeholder={
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="w-4 h-4 border border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
                  </div>
                }
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
