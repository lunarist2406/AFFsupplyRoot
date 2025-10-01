"use client"

import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, Users, ShoppingBag } from "lucide-react"
import { useState } from "react"

const allLivestreams = [
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: "Gạo cao cấp nhà trồng",
    seller: "AFFShop",
    viewers: 12400,
    category: "rice",
    thumbnail: "/Gao-ST25.png",
    isLive: true
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 5,
    title: "Rau mới về hàng 11/7",
    seller: "AFFShop",
    viewers: 12400,
    category: "vegetables",
    thumbnail: "/Gao-ST25.png",
    isLive: true
  }))
]

interface LivestreamContentProps {
  searchTerm?: string
  sortBy?: string
}

export function LivestreamContent({ searchTerm = "", sortBy = "all" }: LivestreamContentProps) {
  const router = useRouter()
  
  let filteredLivestreams = allLivestreams

  if (searchTerm) {
    filteredLivestreams = filteredLivestreams.filter(livestream => 
      livestream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livestream.seller.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (sortBy !== "all") {
    filteredLivestreams = filteredLivestreams.filter(livestream => 
      livestream.category === sortBy
    )
  }

  const livestreams = filteredLivestreams

  const handleCardClick = () => {
    router.push('/livestream/watch')
  }

  return (
    <>
      <div className="flex-1 p-3 sm:p-4 lg:p-6" style={{ 
        background: 'linear-gradient(180deg, #353D39 4%, #7E8C7C 100%, #353D39 95%)'
      }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
        {livestreams.map((livestream) => (
          <Card key={livestream.id} 
                className="bg-[#353D39] hover:scale-105 transition-all duration-300 border-[#FFD54F] shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden" 
                style={{ padding: '0' }}
                onClick={handleCardClick}>
            
            <div className="relative h-40 sm:h-48">
              <Image 
                src={livestream.thumbnail} 
                alt={livestream.title}
                fill
                className="object-cover"
              />
              {livestream.isLive && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              )}
            </div>
            
            <div className="relative bg-[#353D39] rounded-t-lg p-3 sm:p-4">
              <h3 className="font-bold text-white text-base sm:text-lg mb-2 sm:mb-3 mt-1 sm:mt-2">{livestream.title}</h3>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFD54F]" />
                  <span className="text-xs sm:text-sm text-white">{livestream.seller}</span>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#FFD54F] overflow-hidden">
                  <Image 
                    src="/Gao-ST25.png" 
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFD54F]" />
                <span className="text-xs sm:text-sm text-white">
                  {(livestream.viewers / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
            
            <CardFooter className="p-0">
              <Button 
                className="w-full bg-[#FFD54F] hover:bg-[#FFC107] hover:text-black text-green-800 text-xs sm:text-sm h-10 sm:h-12 font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-none transform hover:scale-105 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick()
                }}
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                Xem live
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-white/80 text-sm gap-4">
          <p className="text-xs text-green-200 text-center sm:text-left">
            © 2025 AFF supplyRoot. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex gap-4 sm:gap-6 justify-center sm:justify-end">
            <Link href="/terms" className="text-yellow-300 text-xs sm:text-sm hover:text-yellow-100">Điều khoản</Link>
            <Link href="/privacy" className="text-yellow-300 text-xs sm:text-sm hover:text-yellow-100">Quyền riêng tư</Link>
            <Link href="/cookies" className="text-yellow-300 text-xs sm:text-sm hover:text-yellow-100">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
