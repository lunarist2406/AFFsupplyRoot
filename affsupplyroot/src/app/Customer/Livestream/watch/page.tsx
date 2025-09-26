"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProductSidebar } from "@/app/customer/product/ProductSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { 
  Heart, 
  ThumbsUp, 
  Send,
  ShoppingBag,
  Bell,
  MessageCircle,
  Folder,
  User,
  ChevronRight,
  Plus,
  Minus,
  Menu
} from "lucide-react"
import { FaUserPlus, FaComments, FaFire, FaCalendarAlt } from "react-icons/fa"
import ReactPlayer from 'react-player'

export default function LivestreamWatchPage() {
  const [message, setMessage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isFollowing, setIsFollowing] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#353D39] flex items-center justify-center font-manuale">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD54F] mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải livestream...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <ProductSidebar 
        isMobileMenuOpen={isMobileSidebarOpen}
        setIsMobileMenuOpen={setIsMobileSidebarOpen}
      />
      
      <SidebarInset>
        <div className="flex flex-1 flex-col font-manuale">
          <div className="bg-gradient-to-b from-[#353D39] via-[#7E8C7C] to-[#353D39] p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-yellow-300 hover:bg-yellow-300/10 h-8 w-8 mr-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Link href="/" className="text-yellow-300 text-sm hover:text-yellow-200">Trang chủ</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href="/customer/livestream" className="text-yellow-300 text-sm hover:text-yellow-200">Livestreams</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-yellow-300 text-sm">Xem</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 border border-yellow-300/30 rounded-lg p-1 sm:p-2">
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <Bell className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <Folder className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
                <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-400/10 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-400" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-3 sm:p-4 lg:p-5 bg-[#353D39] flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <div className="relative bg-gray-700 rounded-xl overflow-hidden mb-6 aspect-video">
                <ReactPlayer
                  src="https://www.youtube.com/watch?v=Mt2huL2TCR8"
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls={true}
                  light="/Gao-ST25.png"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  config={{
                    youtube: {
                      color: 'white'
                    }
                  }}
                />
                
                {!playing && (
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                      5K đang xem
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-5 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#FFD54F] overflow-hidden">
                      <Image 
                        src="/Gao-ST25.png" 
                        alt="Streamer Avatar"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg m-0">AFFSHOP</h3>
                      <p className="text-xs sm:text-sm text-gray-500 m-0">1.2K người theo dõi</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 text-white border-none rounded-md cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
                        isFollowing ? 'bg-gray-500' : 'bg-blue-500'
                      }`}
                    >
                      <FaUserPlus className="text-xs sm:text-sm" />
                      {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-green-500 text-white px-4 sm:px-6 py-2 border-none rounded-md cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                      <FaComments className="text-xs sm:text-sm" />
                      Nhắn Tin
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <h4 className="font-semibold mb-2 m-0 text-sm sm:text-base">Tiêu đề livestream</h4>
                  <p className="text-xs sm:text-sm text-gray-500 m-0 flex items-center gap-1.5">
                    <FaFire className="text-red-500" />
                    SALE SỐC - Kho Lúa AFF supplyRoot
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 m-0 mb-1">Sắp diễn ra 2 tiếng nữa</p>
                  <p className="text-xs sm:text-sm text-gray-500 m-0 mb-2 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-blue-500" />
                    Mở tài
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 m-0">Xem thêm (3)</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col">
              
              <div className="bg-white rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex gap-3 mb-3">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="/Gao-ST25.png" alt="Product" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm m-0 mb-1">Gạo ST 25</h4>
                    <p className="text-red-600 font-bold text-sm sm:text-base m-0 mb-0.5">150.000đ/5kg <span className="text-gray-500 text-xs line-through font-normal">200.000đ</span></p>
                    <p className="text-xs text-gray-500 m-0">Khô: 200.000đ Đã bán: 100000</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm">Số lượng:</span>
                    <div className="flex items-center border-2 border-gray-200 rounded-md bg-white">
                      <Button 
                        onClick={() => handleQuantityChange(-1)}
                        className="bg-transparent border-none p-1.5 sm:p-2 cursor-pointer flex items-center justify-center text-gray-700 min-w-6 h-6 sm:min-w-8 sm:h-8"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </Button>
                      <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-800 min-w-8 sm:min-w-10 text-center">{quantity}</span>
                      <Button 
                        onClick={() => handleQuantityChange(1)}
                        className="bg-transparent border-none p-1.5 sm:p-2 cursor-pointer flex items-center justify-center text-gray-700 min-w-6 h-6 sm:min-w-8 sm:h-8"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </Button>
                    </div>
                  </div>
                  <Button className="bg-[#FFD54F] text-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 border-none rounded cursor-pointer font-bold flex-1 sm:flex-none">
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex-1 min-h-[250px] sm:min-h-[350px] max-h-[350px] sm:max-h-[450px] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold m-0 text-sm sm:text-base">Khung chat</h4>
                  <span className="text-xs sm:text-sm text-gray-500">1.2K</span>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-3 flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">K</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-xs font-medium text-blue-600">Khoa Phạm</span>
                        <span className="text-xs text-gray-500">1 phút</span>
                      </div>
                      <p className="text-xs m-0 break-words">Gạo gì ngon dữ</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">T</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-xs font-medium text-blue-600">Thiên bảo</span>
                        <span className="text-xs text-gray-500">2 phút</span>
                      </div>
                      <p className="text-xs m-0 break-words">WOW</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">B</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-xs font-medium text-blue-600">Bill</span>
                        <span className="text-xs text-gray-500">3 phút</span>
                      </div>
                      <p className="text-xs m-0 break-words">So good</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Input 
                    placeholder="Viết bình luận tại đây"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 border border-gray-200 rounded-md h-7 sm:h-8"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-500 text-white p-1 sm:p-1.5 border-none rounded-md cursor-pointer flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8"
                  >
                    <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-start gap-3 sm:gap-4 pt-2 border-t border-gray-200">
                  <Button className="bg-transparent text-gray-500 border-none text-xs p-1 cursor-pointer flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Like</span>
                  </Button>
                  <Button className="bg-transparent text-gray-500 border-none text-xs p-1 cursor-pointer flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Tim</span>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-4 max-h-[200px] sm:max-h-[270px] overflow-y-auto">
                <h4 className="text-sm sm:text-base font-semibold text-black mb-3 m-0">
                  Sản phẩm liên quan
                </h4>
                <div className="flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-md p-2 flex gap-2 items-center text-sm min-h-14 border border-gray-200">
                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <Image src="/Gao-ST25.png" alt="Product" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm m-0 mb-0.5 leading-tight">Gạo ST 25</h5>
                      <p className="text-red-600 font-bold text-sm m-0 mb-0.5 leading-tight">
                        150.000đ/5kg <span className="text-gray-500 text-xs line-through font-normal">200.000đ</span>
                      </p>
                      <p className="text-xs text-gray-500 m-0 leading-tight">Khô: 200.000đ Đã bán: 100000</p>
                    </div>
                    <div className="bg-[#FFD54F] text-black text-xs px-1.5 py-0.5 rounded font-bold whitespace-nowrap flex-shrink-0">
                      Chuẩn bị ghim
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}