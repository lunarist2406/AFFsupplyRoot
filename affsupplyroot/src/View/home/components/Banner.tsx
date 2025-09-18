import Image from "next/image";
import React from "react";
import {
  FaLeaf,
  FaChartBar,
  FaTruck,
  FaVideo,
  FaNewspaper,
  FaHandsHelping,
  FaStore,
  FaUsers,
} from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import banner from "../../../../public/BannerCard.png";

export default function Banner() {
  const items = [
    { icon: <FaStore />, label: "Sản phẩm" },
    { icon: <FaChartBar />, label: "Giá trị" },
    { icon: <FaLeaf />, label: "Nhà cung cấp" },
    { icon: <FaTruck />, label: "Vận chuyển" },
    { icon: <FaVideo />, label: "Livestream" },
    { icon: <FaNewspaper />, label: "Tin tức" },
    { icon: <FaHandsHelping />, label: "Hỗ trợ" },
    { icon: <FaUsers />, label: "Cộng đồng" },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg overflow-hidden font-manuale">
      {/* Left Content */}
      <div className="w-full md:w-[70%] p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          AFF supplyRoot kết nối giá trị{" "}
          <span className="text-yellow-400">Nông Nghiệp Việt Nam</span>
        </h1>

        {/* Carousel Icons */}
<Carousel
  opts={{
    align: "center",
  }}
  className="w-full max-w-4xl mx-auto relative"
>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem
        key={i}
        className="basis-1/2 md:basis-1/3 lg:basis-1/5 px-2"
      >
        <div className="flex items-center gap-3 border border-yellow-400 text-yellow-400 rounded-lg p-3 hover:scale-105 transition-transform">
          <div className="text-xl">{item.icon}</div>
          <p className="text-sm font-medium">{item.label}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  {/* Nút điều hướng đặt absolute, không đẩy card */}
  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-gray-700 text-white rounded-full shadow-lg" />
  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 bg-gray-700 text-white rounded-full shadow-lg" />
</Carousel>


      </div>

      {/* Right Image */}
      <div className="w-full md:w-[30%] flex items-center justify-center">
        <Image
          src={banner}
          alt="Nông nghiệp"
          className="object-cover h-[20rem] w-full"
        />
      </div>
    </div>
  );
}
