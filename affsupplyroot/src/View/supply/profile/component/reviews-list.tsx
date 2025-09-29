"use client"

import Image from "next/image"
import { Star, CheckCircle, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
    <Card>
      <CardHeader>
        <CardTitle>Đánh giá từ khách hàng ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{review.customer.name}</h4>
                    {review.customer.verified && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Đã mua hàng
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mb-3">Sản phẩm: {review.product}</p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Review image"
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-green-600">
                      <ThumbsUp className="w-3 h-3" />
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
