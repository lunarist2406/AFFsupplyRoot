"use client"

import { useState } from "react"
import { Camera, Share2, Heart, MessageCircle, Settings, CheckCircle, Leaf } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StoreHeaderProps {
  storeInfo: {
    name: string
    slogan: string
    avatar: string
    coverImage: string
    stats: {
      followers: number
      rating: number
      reviewCount: number
    }
  }
}

export function StoreHeader({ storeInfo }: StoreHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <>
      {/* Cover Image */}
      <div className="relative h-80 bg-gradient-to-r from-green-600 to-emerald-600">
        <Image
          src={storeInfo.coverImage || "/placeholder.svg"}
          alt="Farm Cover"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Đổi ảnh bìa
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Store Header */}
      <div className="relative -mt-20 px-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={storeInfo.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">NS</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{storeInfo.name}</h1>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đã xác minh
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Leaf className="w-3 h-3 mr-1" />
                      Hữu cơ
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground italic">{storeInfo.slogan}</p>
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{storeInfo.stats.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Người theo dõi</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">{storeInfo.stats.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{storeInfo.stats.reviewCount} đánh giá</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={
                    isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  }
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nhắn tin
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
