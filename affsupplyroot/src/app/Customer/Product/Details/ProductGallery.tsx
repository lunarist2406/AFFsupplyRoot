"use client"

import { Image, Carousel } from 'antd'

const productImages = [
  "/Gao-ST25.png",
  "/Gao-ST25.png",
  "/Gao-ST25.png", 
  "/Gao-ST25.png"
]

export function ProductGallery() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <Image
            height={380}
            width= '100%'
            src="/Gao-ST25.png"
            alt="Gạo ST25"
            className="rounded-lg transition-transform duration-300 group-hover:scale-105 ant-image-cover"
            preview={{
              src: "/Gao-ST25.png",
            }}
          />

      <div className="mt-3" style={{ padding: '8px' }}>
        <Carousel
          arrows
          dots={false}
          slidesToShow={4}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
          ]}
        >
          {productImages.map((image, index) => (
            <div key={index} className="mx-[1.5px]">
              <div className="w-30 h-22 mx-auto rounded-xl overflow-hidden border-2 border-white/20 hover:border-emerald-400 transition-all duration-300 shadow-md hover:shadow-lg">
                <Image
                  width={120}
                  height={90}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="bg-gradient-to-br from-gray-50 to-gray-100"
                  preview={{ src: image }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
