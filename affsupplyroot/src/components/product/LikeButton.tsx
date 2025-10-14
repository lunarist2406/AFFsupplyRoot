/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { likeProduct } from "@/services/product-interaction"
import { toast } from "sonner"

interface LikeButtonProps {
  productId: number
  initialLiked?: boolean
  initialLikeCount?: number
  onLikeChange?: (isLiked: boolean, likeCount: number) => void
  size?: "sm" | "md" | "lg"
}

export default function LikeButton({
  productId,
  initialLiked = false,
  initialLikeCount = 0,
  onLikeChange,
  size = "md"
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const response = await likeProduct(productId)
      
      setIsLiked(response.data.isLiked)
      setLikeCount(prev => response.data.isLiked ? prev + 1 : prev - 1)
      
      onLikeChange?.(response.data.isLiked, likeCount + (response.data.isLiked ? 1 : -1))
      
      // Toast message
      if (response.data.isLiked) {
        toast.success("Đã thích sản phẩm!")
      } else {
        toast.success("Đã bỏ thích sản phẩm!")
      }
    } catch (error: any) {
      console.error("Error liking product:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  }

  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`
        flex items-center gap-1 rounded-full transition-colors
        ${buttonSizeClasses[size]}
        ${isLiked 
          ? "text-red-500 hover:text-red-600 bg-red-50" 
          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
        }
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <Heart 
        className={`
          ${sizeClasses[size]} transition-all duration-200
          ${isLiked ? "fill-current" : ""}
          ${loading ? "animate-pulse" : ""}
        `} 
      />
      {likeCount > 0 && (
        <span className="text-xs font-medium">
          {likeCount}
        </span>
      )}
    </button>
  )
}
