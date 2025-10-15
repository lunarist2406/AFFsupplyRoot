/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  Send, 
  Image as ImageIcon, 
  Edit, 
  Trash2,
  Loader2
} from "lucide-react"
import { 
  getProductComments, 
  createComment, 
  updateComment, 
  deleteComment,
  type Comment,
  type CommentsResponse 
} from "@/services/product-interaction"
import { toast } from "sonner"
import useAuth from "@/hooks/useAuth"

interface CommentSectionProps {
  productId: number
  className?: string
  hasPurchased?: boolean // Kiểm tra đã mua hàng chưa
}

export default function CommentSection({ productId, className = "", hasPurchased = false }: CommentSectionProps) {
  const { state } = useAuth()
  const currentUser = state.user
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalComments, setTotalComments] = useState(0)

  const fetchComments = async (pageNum: number = 1, append: boolean = false) => {
    setLoading(true)
    try {
      const response: CommentsResponse = await getProductComments(productId, pageNum, 20)
      
      if (append) {
        setComments(prev => [...prev, ...response.data.comments])
      } else {
        setComments(response.data.comments)
      }
      
      setHasMore(pageNum < response.data.pagination.totalPages)
      setTotalComments(response.data.pagination.total)
    } catch (error: any) {
      console.error("Error fetching comments:", error)
      toast.error("Không thể tải bình luận")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments(1)
  }, [productId]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitComment = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để bình luận")
      return
    }

    if (!hasPurchased) {
      toast.error("Bạn cần mua sản phẩm này để có thể bình luận")
      return
    }

    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận")
      return
    }

    setSubmitting(true)
    try {
      await createComment(productId, {
        content: newComment,
        images: selectedImages
      })
      
      setNewComment("")
      setSelectedImages([])
      toast.success("Đã thêm bình luận!")
      fetchComments(1) // Reload first page
    } catch (error: any) {
      console.error("Error creating comment:", error)
      toast.error(error.response?.data?.message || "Không thể thêm bình luận")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận")
      return
    }

    try {
      await updateComment(commentId, {
        content: editContent
      })
      
      setEditingComment(null)
      setEditContent("")
      toast.success("Đã cập nhật bình luận!")
      fetchComments(1)
    } catch (error: any) {
      console.error("Error updating comment:", error)
      toast.error(error.response?.data?.message || "Không thể cập nhật bình luận")
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return

    try {
      await deleteComment(commentId)
      toast.success("Đã xóa bình luận!")
      fetchComments(1)
    } catch (error: any) {
      console.error("Error deleting comment:", error)
      toast.error(error.response?.data?.message || "Không thể xóa bình luận")
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setSelectedImages(prev => [...prev, ...files.slice(0, 5 - prev.length)])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchComments(nextPage, true)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Comment Form */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {!currentUser ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Vui lòng đăng nhập để bình luận</p>
              </div>
            ) : !hasPurchased ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Bạn cần mua sản phẩm này để có thể bình luận</p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>
                      {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px] resize-none border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className="flex gap-2 flex-wrap ml-13">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between ml-13">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="comment-images"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="comment-images"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Thêm hình ảnh
                    </label>
                  </div>
                  
                  <Button
                    onClick={handleSubmitComment}
                    disabled={submitting || !newComment.trim()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Đăng bình luận
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{totalComments} bình luận</span>
        </div>

        {loading && comments.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <Card key={comment.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.userAvatar} />
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {comment.userName?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{comment.userName || 'Người dùng'}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        {currentUser && comment.userId === currentUser.id && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingComment(comment.id)
                                setEditContent(comment.content)
                              }}
                              className="h-6 w-6 p-0 hover:bg-gray-100"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComment(comment.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {editingComment === comment.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editContent}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditContent(e.target.value)}
                            className="min-h-[60px]"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditComment(comment.id)}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              Lưu
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingComment(null)
                                setEditContent("")
                              }}
                            >
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-gray-800 leading-relaxed">{comment.content}</p>
                          
                          {comment.images && comment.images.length > 0 && (
                            <div className="flex gap-3 flex-wrap">
                              {comment.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Comment image ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => window.open(image, '_blank')}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Xem thêm bình luận
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
