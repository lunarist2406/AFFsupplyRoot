"use client"

import { useState } from "react"
import { Star, Heart, MessageCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface StoreStatsActionsProps {
  stats: {
    followers: number
    totalProducts: number
    totalOrders: number
    rating: number
    reviewCount: number
    joinDate: string
    responseRate: number
    responseTime: string
  }
  isFollowing: boolean
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
  onMessage: () => void
  onSettings: () => void
}
export function StoreStatsActions({ stats, onMessage, onSettings }: StoreStatsActionsProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.followers.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Người theo dõi</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold">{stats.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">{stats.reviewCount} đánh giá</p>
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
        <Button variant="outline" onClick={onMessage}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Nhắn tin
        </Button>
        <Button variant="outline" onClick={onSettings}>
          <Settings className="w-4 h-4 mr-2" />
          Cài đặt
        </Button>
      </div>
    </div>
  )
}
