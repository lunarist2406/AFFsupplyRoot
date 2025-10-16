"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Users, MessageCircle, Heart, Store } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, memo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { followShop, unfollowShop } from "@/services/shop"
import { toast } from "sonner"
import { ShopReviewModal } from "@/components/shop/ShopReviewModal"

interface ShopDetail {
  id: number
  slug: string
  brandName: string
  companyName: string
  businessPhone: string
  businessAddress: string
  description: string
  shopAvatar: string | null
  shopBanner: string | null
  avgRating: number
  totalReviews: number
  totalFollowers: number
  status: string
  createdAt: string
  user: {
    id: number
    name: string
    email: string
    avatar: string | null
  }
  ShopReview: Array<{
    id: number
    rating: number
    comment: string
    createdAt: string
    user: {
      id: number
      name: string
      avatar: string | null
    }
    ReviewShopImage: Array<{
      url: string
    }>
  }>
  categoriesShop: Array<{
    id: number
    name: string
    slug: string
  }>
  isFollowed: boolean
}

interface ShopInfoProps {
  shop: ShopDetail
  hideViewShop?: boolean
}

export const ShopInfo = memo(function ShopInfo({ shop, hideViewShop = false }: ShopInfoProps) {
  const router = useRouter()
  const [isFollowed, setIsFollowed] = useState(shop.isFollowed)
  const [followersCount, setFollowersCount] = useState(shop.totalFollowers)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)

  const handleFollow = useCallback(async () => {
    if (isFollowing) return
    
    setIsFollowing(true)
    try {
      if (isFollowed) {
        await unfollowShop(shop.id)
        setIsFollowed(false)
        setFollowersCount(prev => prev - 1)
        toast.success("Đã hủy theo dõi shop") 
      } else {
        await followShop(shop.id)
        setIsFollowed(true)
        setFollowersCount(prev => prev + 1)
        toast.success("Đã theo dõi shop thành công")
      }
    } catch (error: unknown) {
      console.error("Error toggling follow:", error)
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) {
          toast.error("Vui lòng đăng nhập để thực hiện chức năng này")
          router.push("/authentication")
          return
        }
      }
      
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsFollowing(false)
    }
  }, [isFollowing, isFollowed, shop.id, router])

  const handleChat = useCallback(() => {
    toast.info("Tính năng chat đang được phát triển")
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-[28rem]">
              <div className="flex items-center gap-4 mb-4">
                <Link href={`/shop/${shop.slug}`} prefetch>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <Avatar className="h-16 w-16 border-2 border-orange-400">
                      <AvatarImage 
                        src={shop.shopAvatar || "/logo.png"} 
                        alt={shop.brandName}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg">
                        {shop.brandName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </Link>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {shop.status === "APPROVED" && (
                      <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        ✓ Đã xác thực
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    <Link href={`/shop/${shop.slug}`} prefetch className="cursor-pointer hover:text-orange-500 transition-colors">
                      {shop.brandName}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-1">{shop.companyName}</p>
                  <p className="text-xs text-gray-500 mb-3">Tham gia: {new Date(shop.createdAt).toLocaleDateString('vi-VN')}</p>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-bold text-yellow-600">
                        {shop.avgRating > 0 ? shop.avgRating.toFixed(1) : "Chưa có"} ({shop.totalReviews} đánh giá)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                      <Users className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-bold text-blue-700">{followersCount} người theo dõi</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {shop.businessPhone && (
                  <div className="flex items-center gap-3 text-sm p-2 bg-green-50 rounded-lg border border-green-200">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">{shop.businessPhone}</span>
                  </div>
                )}
                
                {shop.businessAddress && (
                  <div className="flex items-start gap-3 text-sm p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-700 font-medium leading-relaxed">{shop.businessAddress}</span>
                  </div>
                )}
                
                {shop.description && (
                  <div className="text-sm text-gray-700 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-medium">{shop.description}</p>
                  </div>
                )}
                
                
              </div>
              
              <div className="space-y-3 mt-4">
                {!hideViewShop && (
                  <Link href={`/shop/${shop.slug}`} prefetch className="block">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-medium cursor-pointer"
                    >
                      <Store className="h-4 w-4 mr-1" />
                      Xem shop
                    </Button>
                  </Link>
                )}
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    onClick={handleChat}
                    variant="outline" 
                    size="sm"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  
                  <Link href={`/shop/${shop.slug}/reviews`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium cursor-pointer"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Xem đánh giá
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={() => {
                      // Có thể thêm logic kiểm tra auth ở đây nếu cần
                      setIsReviewModalOpen(true)
                    }}
                    variant="outline" 
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium cursor-pointer"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {hasReviewed ? "Sửa" : "Đánh giá"}
                  </Button>
                </div>
                
                <Button 
                  onClick={handleFollow}
                  disabled={isFollowing}
                  variant={isFollowed ? "default" : "outline"}
                  size="sm"
                  className={`w-full font-medium cursor-pointer ${
                    isFollowed 
                      ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500" 
                      : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFollowed ? "fill-current" : ""}`} />
                  {isFollowing ? "Đang xử lý..." : (isFollowed ? "Đã theo dõi" : "Theo dõi")}
                </Button>
              </div>
            </div>

            <div className="flex-1 pl-6 border-l border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Thống kê shop</h4>
              <div className="grid grid-cols-1 gap-0">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Đánh Giá</span>
                  <div className="text-right">
                    <span className="text-orange-600 font-bold text-lg">
                      {shop.avgRating > 0 ? shop.avgRating.toFixed(1) : "Chưa có"}
                    </span>
                    {shop.totalReviews > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        ({shop.totalReviews} đánh giá)
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Danh Mục</span>
                  <div className="text-right">
                    {shop.categoriesShop && shop.categoriesShop.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-orange-600 font-bold text-lg">{shop.categoriesShop.length}</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {shop.categoriesShop.slice(0, 2).map((category) => (
                            <span 
                              key={category.id}
                              className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                          {shop.categoriesShop.length > 2 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              +{shop.categoriesShop.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-orange-600 font-bold text-lg">0</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Trạng Thái</span>
                  <span className="text-orange-600 font-bold text-lg">
                    {shop.status === "APPROVED" ? "Đã xác thực" : shop.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Tham Gia</span>
                  <span className="text-orange-600 font-bold text-lg">
                    {new Date(shop.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Người Theo Dõi</span>
                  <span className="text-orange-600 font-bold text-lg">{followersCount}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ShopReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        shopId={shop.id}
        shopName={shop.brandName}
        onReviewSubmitted={() => {
          setHasReviewed(true)
        }}
      />
    </motion.div>
  )
})
