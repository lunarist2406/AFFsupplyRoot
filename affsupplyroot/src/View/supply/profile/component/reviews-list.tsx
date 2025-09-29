"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FaStar, FaCheckCircle, FaThumbsUp } from "react-icons/fa"

interface Review {
  id: string
  customer: {
    name: string
    avatar: string
    verified: boolean
  }
  rating: number
  comment: string
  product: string
  date: string
  images: string[]
  helpful: number
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Đánh giá từ khách hàng ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                  <AvatarImage src={review.customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.customer.name[0]}</AvatarFallback>
                </Avatar>

                {/* Nội dung */}
                <div className="flex-1 min-w-0">
                  {/* Tên + Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm sm:text-base">{review.customer.name}</h4>
                    {review.customer.verified && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-xs sm:text-sm"
                      >
                        <FaCheckCircle className="w-3 h-3 text-green-600" />
                        Đã mua hàng
                      </Badge>
                    )}
                  </div>

                  {/* Rating + Date */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sản phẩm: {review.product}
                  </p>

                  {/* Hình ảnh review */}
                  {review.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Review image"
                          width={60}
                          height={60}
                          className="rounded object-cover w-14 h-14 sm:w-16 sm:h-16"
                        />
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-green-600">
                      <FaThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      Hữu ích ({review.helpful})
                    </button>
                    <button className="hover:text-green-600">Trả lời</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
