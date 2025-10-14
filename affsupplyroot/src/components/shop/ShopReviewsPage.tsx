"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MoreVertical, ChevronDown } from "lucide-react"
import { getShopReviews, getShopBySlug } from "@/services/shop"
import { motion } from "framer-motion"
import Image from "next/image"

interface ShopReview {
  id: number
  userID: number
  sellerID: number
  rating: number
  comment: string
  createdAt: string
  user: {
    id: number
    name: string
    avatar: string | null
  }
  ReviewShopImage: Array<{
    id: number
    url: string
  }>
}

interface ShopDetail {
  id: number
  slug: string
  brandName: string
  shopAvatar: string | null
  avgRating: number
  totalReviews: number
}

interface ShopReviewsPageProps {
  shopSlug: string
}

export function ShopReviewsPage({ shopSlug }: ShopReviewsPageProps) {
  const [reviews, setReviews] = useState<ShopReview[]>([])
  const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalReviews, setTotalReviews] = useState(0)

  // Tính toán rating counts từ data thực tế
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }

  useEffect(() => {
    fetchData()
  }, [shopSlug, selectedRating, currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const shopResponse = await getShopBySlug(shopSlug)
      setShopDetail(shopResponse.data)
      
      const reviewsResponse = await getShopReviews(shopResponse.data.id, currentPage, 10)
      
      // Sử dụng data từ API response
      setReviews(reviewsResponse.data.reviews || [])
      setTotalPages(reviewsResponse.data.totalPages || 1)
      setTotalReviews(reviewsResponse.data.total || 0)
      
      console.log('Shop reviews API response:', reviewsResponse.data)
    } catch (error) {
      console.error("Error fetching shop reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRatingFilter = (rating: number | null) => {
    setSelectedRating(rating)
    setCurrentPage(1)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-red-500 text-red-500" : "text-gray-300"
        }`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!shopDetail) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không tìm thấy thông tin shop</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-orange-400">
            <AvatarImage src={shopDetail.shopAvatar || "/logo.png"} alt={shopDetail.brandName} />
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xl">
              {shopDetail.brandName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{shopDetail.brandName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-orange-500">
                {shopDetail.avgRating.toFixed(1)} trên 5
              </span>
              <div className="flex items-center gap-1">
                {renderStars(Math.round(shopDetail.avgRating))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Đánh giá Shop</h2>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => handleRatingFilter(null)}
            variant={selectedRating === null ? "default" : "outline"}
            className={`${
              selectedRating === null 
                ? "bg-red-500 hover:bg-red-600 text-white border-red-500" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tất Cả
          </Button>
          
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              onClick={() => handleRatingFilter(rating)}
              variant="outline"
              className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                selectedRating === rating ? "border-red-500 bg-red-50" : ""
              }`}
            >
              {rating} Sao ({ratingCounts[rating as keyof typeof ratingCounts]})
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Chưa có đánh giá nào</p>
          </Card>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.user.avatar || "/logo.png"} alt={review.user.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {review.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{review.user.name}</span>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>


                      {review.ReviewShopImage && review.ReviewShopImage.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {review.ReviewShopImage.map((image, imgIndex) => (
                            <div
                              key={image.id}
                              className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden relative"
                            >
                              <Image
                                src={image.url}
                                alt={`Review image ${imgIndex + 1}`}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<span class="text-xs text-gray-500 flex items-center justify-center h-full">IMG</span>';
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Hữu Ích?
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {reviews.length > 0 && currentPage < totalPages && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            className="px-8"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Xem thêm đánh giá ({currentPage}/{totalPages})
          </Button>
        </div>
      )}
      
      {/* Total Reviews Info */}
      {reviews.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Hiển thị {reviews.length} / {totalReviews} đánh giá
          </p>
        </div>
      )}
    </div>
  )
}
