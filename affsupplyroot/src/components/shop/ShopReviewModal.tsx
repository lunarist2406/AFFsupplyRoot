"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, X, Camera } from "lucide-react"
import { createShopReview, updateShopReview, deleteShopReview, getMyShopReview, CreateShopReviewData } from "@/services/shop"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ShopReviewModalProps {
  isOpen: boolean
  onClose: () => void
  shopId: number
  shopName: string
  onReviewSubmitted?: () => void
}

interface MyReview {
  id: number
  rating: number
  comment: string
  createdAt: string
  ReviewShopImage: Array<{ url: string }>
}

export function ShopReviewModal({ isOpen, onClose, shopId, shopName, onReviewSubmitted }: ShopReviewModalProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [myReview, setMyReview] = useState<MyReview | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const fetchMyReview = useCallback(async () => {
    try {
      const response = await getMyShopReview(shopId)
      if (response.data) {
        setMyReview(response.data)
        setRating(response.data.rating)
        setComment(response.data.comment)
        setIsEditMode(true)
      } else {
        setRating(0)
        setComment("")
        setImages([])
        setPreviewImages([])
        setIsEditMode(false)
      }
    } catch (error: unknown) {
      console.error("Error fetching my review:", error)
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) {
          toast.error("Vui lòng đăng nhập để xem đánh giá")
          router.push("/authentication")
          return
        }
      }
      
      setMyReview(null)
      setRating(0)
      setComment("")
      setImages([])
      setPreviewImages([])
      setIsEditMode(false)
    }
  }, [shopId, router]) 

  useEffect(() => {
    if (isOpen && shopId) {
      fetchMyReview()
    }
  }, [isOpen, shopId, fetchMyReview])


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newImages = [...images, ...files].slice(0, 5) 
      setImages(newImages)
      
      // Create preview URLs
      const newPreviews = newImages.map(file => URL.createObjectURL(file))
      setPreviewImages(newPreviews)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = previewImages.filter((_, i) => i !== index)
    setImages(newImages)
    setPreviewImages(newPreviews)
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn đánh giá")
      return
    }


    setIsLoading(true)
    try {
      const reviewData: CreateShopReviewData = {
        rating,
        comment: comment.trim(),
        images: images.length > 0 ? images : undefined
      }

      if (isEditMode && myReview) {
        await updateShopReview(shopId, myReview.id, reviewData)
        toast.success("Cập nhật đánh giá thành công")
      } else {
        await createShopReview(shopId, reviewData)
        toast.success("Đánh giá shop thành công")
      }

      onReviewSubmitted?.()
      onClose()
    } catch (error: unknown) {
      console.error("Error submitting review:", error)
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) {
          toast.error("Vui lòng đăng nhập để đánh giá shop")
          router.push("/authentication")
          return
        }
      }
      
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!myReview) return
    
    setIsLoading(true)
    try {
      await deleteShopReview(shopId, myReview.id)
      toast.success("Xóa đánh giá thành công")
      onReviewSubmitted?.()
      onClose()
    } catch (error: unknown) {
      console.error("Error deleting review:", error)
      
      // Kiểm tra nếu là lỗi 401 (Unauthorized)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) {
          toast.error("Vui lòng đăng nhập để xóa đánh giá")
          router.push("/authentication")
          return
        }
      }
      
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setRating(0)
    setComment("")
    setImages([])
    setPreviewImages([])
    setMyReview(null)
    setIsEditMode(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Sửa đánh giá" : "Đánh giá shop"} - {shopName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn * (Ví dụ: 5 sao = rất tốt, 1 sao = không hài lòng)
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
            </div>
            {rating === 0 && (
              <p className="text-sm text-red-500 mt-2">Vui lòng chọn đánh giá sao</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét *
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ví dụ: Shop giao hàng nhanh, sản phẩm chất lượng tốt..."
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 ký tự
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh (tối đa 5 ảnh) - Ví dụ: ảnh sản phẩm, shop, giao hàng...
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="review-images"
              />
              <label
                htmlFor="review-images"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Nhấp để thêm hình ảnh
                </span>
              </label>
            </div>

            {/* Preview Images */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || rating === 0 || comment.trim().length < 1}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? "Đang xử lý..." : (isEditMode ? "Cập nhật đánh giá" : "Gửi đánh giá")}
            </Button>
            
            {isEditMode && (
              <Button
                onClick={handleDelete}
                disabled={isLoading}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Xóa đánh giá
              </Button>
            )}
            
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={isLoading}
            >
              Hủy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
