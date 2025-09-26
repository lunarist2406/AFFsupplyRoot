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
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex flex-col">
      <div className="h-120 w-full mb-4">
        <Image
          height="100%"
          width="100%"
          src="/Gao-ST25.png"
          alt="Gạo ST25"
          className="rounded-lg transition-transform duration-300 hover:scale-105 object-contain w-full h-full"
          preview={{
            src: "/Gao-ST25.png",
          }}
        />
      </div>

      <div className="">
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
            <div key={index} className="px-2">
              <div className="w-full h-20 sm:h-24 mx-auto rounded-xl overflow-hidden border-2 border-white/20 hover:border-green-primary transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                <Image
                  width="100%"
                  height="100%"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 object-contain w-full h-full"
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
