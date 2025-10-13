/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Heart } from "lucide-react"
import LikeButton from "./LikeButton"
import CommentSection from "./CommentSection"

interface ProductInteractionProps {
  productId: number
  initialLiked?: boolean
  initialLikeCount?: number
  className?: string
}

export default function ProductInteraction({
  productId,
  initialLiked = false,
  initialLikeCount = 0,
  className = ""
}: ProductInteractionProps) {
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const handleLikeChange = (liked: boolean, count: number) => {
    setIsLiked(liked)
    setLikeCount(count)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <LikeButton
              productId={productId}
              initialLiked={isLiked}
              initialLikeCount={likeCount}
              onLikeChange={handleLikeChange}
              size="lg"
            />
            
            <Button
              variant="outline"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Bình luận</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comment Section */}
      {showComments && (
        <CommentSection productId={productId} />
      )}
    </div>
  )
}
