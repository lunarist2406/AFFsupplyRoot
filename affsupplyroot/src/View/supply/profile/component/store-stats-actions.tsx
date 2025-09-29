"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaStar, FaHeart, FaRegCommentDots, FaCog } from "react-icons/fa"
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

export function StoreStatsActions({
  stats,
  onMessage,
  onSettings,
}: StoreStatsActionsProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <p className="text-2xl font-bold text-green-600">
            {stats.followers.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Người theo dõi</p>
        </motion.div>

        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="flex items-center justify-center gap-1">
            <FaStar className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold">{stats.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {stats.reviewCount} đánh giá
          </p>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row md:flex-col gap-2">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1"
        >
          <Button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`w-full ${
              isFollowing
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            }`}
          >
            <FaHeart
              className={`w-4 h-4 mr-2 ${
                isFollowing ? "text-red-500" : "text-white"
              }`}
            />
            {isFollowing ? "Đang theo dõi" : "Theo dõi"}
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1"
        >
          <Button
            variant="outline"
            onClick={onMessage}
            className="w-full flex items-center justify-center"
          >
            <FaRegCommentDots className="w-4 h-4 mr-2" />
            Nhắn tin
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1"
        >
          <Button
            variant="outline"
            onClick={onSettings}
            className="w-full flex items-center justify-center"
          >
            <FaCog className="w-4 h-4 mr-2" />
            Cài đặt
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
