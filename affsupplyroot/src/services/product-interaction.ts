/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/Axios/axios"

export interface LikeResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    isLiked: boolean
  }
}

export interface Comment {
  id: number
  content: string
  images?: string[]
  userId: number
  userName: string
  userAvatar?: string
  productId: number
  createdAt: string
  updatedAt: string
}

export interface CommentsResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    comments: Comment[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

export interface CreateCommentPayload {
  content: string
  images?: File[]
}

export interface UpdateCommentPayload {
  content: string
  images?: File[]
}

// Like/Unlike sản phẩm
export const likeProduct = async (productId: number): Promise<LikeResponse> => {
  const res = await api.post<LikeResponse>(`/api/v1/like/${productId}`)
  return res.data
}

// Lấy danh sách comment của sản phẩm
export const getProductComments = async (
  productId: number,
  page: number = 1,
  limit: number = 20
): Promise<CommentsResponse> => {
  const res = await api.get<CommentsResponse>(`/api/v1/comment/${productId}`, {
    params: { page, limit }
  })
  return res.data
}

// Tạo comment mới
export const createComment = async (
  productId: number,
  payload: CreateCommentPayload
): Promise<any> => {
  const formData = new FormData()
  formData.append('content', payload.content)
  
  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((image, index) => {
      formData.append(`images`, image)
    })
  }

  const res = await api.post(`/api/v1/comment/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

// Cập nhật comment
export const updateComment = async (
  commentId: number,
  payload: UpdateCommentPayload
): Promise<any> => {
  const formData = new FormData()
  formData.append('content', payload.content)
  
  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((image, index) => {
      formData.append(`images`, image)
    })
  }

  const res = await api.patch(`/api/v1/comment/${commentId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

// Xóa comment
export const deleteComment = async (commentId: number): Promise<any> => {
  const res = await api.delete(`/api/v1/comment/${commentId}`)
  return res.data
}
