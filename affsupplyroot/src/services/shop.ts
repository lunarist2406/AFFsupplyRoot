import api from "@/lib/Axios/axios"

// Types cho Shop List API
interface Shop {
  id: number
  slug: string
  brandName: string
  companyName: string
  shopAvatar: string | null
  avgRating: number
  totalReviews: number
  totalFollowers: number
  createdAt: string
}

interface ShopListData {
  total: number
  page: number
  limit: number
  totalPages: number
  shops: Shop[]
}

interface ShopListResponse {
  success: boolean
  statusCode: number
  message: string
  data: ShopListData
}

// Types cho Shop Detail API
export interface ShopUser {
  id: number
  name: string
  email: string
  avatar: string | null
}

export interface ShopReviewImage {
  url: string
}

export interface ShopReviewUser {
  id: number
  name: string
  avatar: string | null
}

export interface ShopReview {
  id: number
  rating: number
  comment: string
  createdAt: string
  user: ShopReviewUser
  ReviewShopImage: ShopReviewImage[]
}

export interface ShopCategory {
  id: number
  name: string
  slug: string
}

export interface ShopDetail {
  id: number
  slug: string
  brandName: string
  companyName: string
  businessPhone: string
  businessAddress: string
  description: string
  shopAvatar: string | null
  shopBanner: string | null
  avgRating: number
  totalReviews: number
  totalFollowers: number
  status: string
  createdAt: string
  user: ShopUser
  ShopReview: ShopReview[]
  categoriesShop: ShopCategory[]
  isFollowed: boolean
}

export interface ShopDetailResponse {
  success: boolean
  statusCode: number
  message: string
  data: ShopDetail
}

// Types cho Shop Products API
interface ShopProductImage {
  url: string
  isMain: boolean
}

interface ShopProductPricingTier {
  minQty: number
  price: number
}

interface ShopProductCategoryGlobal {
  id: number
  name: string
}

interface ShopProductCategoryShop {
  id: number
  name: string
}

interface ShopProduct {
  id: number
  title: string
  slug: string
  description: string
  origin: string
  brand: string
  unit: string
  region: string[]
  condition: string[]
  season: string[]
  storageInstructions: string
  usageInstructions: string
  certifications: string
  basePrice: number
  minOrderQty: number
  isActive: boolean
  isFeatured: boolean
  stock: number
  soldCount: number
  avgRating: number
  totalReviews: number
  createdAt: string
  CategoryGlobal: ShopProductCategoryGlobal
  CategoryShop: ShopProductCategoryShop | null
  updatedAt: string
  ProductImage: ShopProductImage[]
  PricingTier: ShopProductPricingTier[]
}

interface ShopProductsPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface ShopProductsData {
  products: ShopProduct[]
  pagination: ShopProductsPagination
}

interface ShopProductsResponse {
  success: boolean
  statusCode: number
  message: string
  data: ShopProductsData
}

// Lấy danh sách shops
export const getShops = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  sort: string = "latest"
): Promise<ShopListResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    })
    
    if (search) {
      params.append('search', search)
    }

    const response = await api.get(`/api/v1/public/shop/list?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching shops:", error)
    throw error
  }
}

export const getShopBySlug = async (slug: string): Promise<ShopDetailResponse> => {
  try {
    const response = await api.get(`/api/v1/public/shop/${slug}`)
    return response.data
  } catch (error) {
    console.error("Error fetching shop detail:", error)
    throw error
  }
}

export const getShopProducts = async (
  slug: string,
  page: number = 1,
  limit: number = 20,
  search?: string
): Promise<ShopProductsResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    
    if (search) {
      params.append('search', search)
    }

    const response = await api.get(`/api/v1/public/shop/${slug}/products?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching shop products:", error)
    throw error
  }
}

export const followShop = async (shopId: number) => {
  try {
    const response = await api.post(`/api/v1/shop/${shopId}/follow`)
    return response.data
  } catch (error) {
    console.error("Error following shop:", error)
    throw error
  }
}

export const unfollowShop = async (shopId: number) => {
  try {
    const response = await api.delete(`/api/v1/shop/${shopId}/follow`)
    return response.data
  } catch (error) {
    console.error("Error unfollowing shop:", error)
    throw error
  }
}

export const getShopFollowers = async (shopId: number) => {
  try {
    const response = await api.get(`/api/v1/shop/${shopId}/follow`)
    return response.data
  } catch (error) {
    console.error("Error fetching shop followers:", error)
    throw error
  }
}

export const getShopReviews = async (shopId: number, page: number = 1, limit: number = 10) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    const response = await api.get(`/api/v1/shop/${shopId}/review?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching shop reviews:", error)
    throw error
  }
}

export const getMyShopReview = async (shopId: number) => {
  try {
    const response = await api.get(`/api/v1/shop/${shopId}/my-review`)
    return response.data
  } catch (error) {
    console.error("Error fetching my shop review:", error)
    throw error
  }
}

export interface CreateShopReviewData {
  rating: number
  comment: string
  images?: File[]
}

export const createShopReview = async (shopId: number, reviewData: CreateShopReviewData) => {
  try {
    const formData = new FormData()
    formData.append('sellerID', shopId.toString())
    formData.append('rating', reviewData.rating.toString())
    formData.append('comment', reviewData.comment)
    
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image) => {
        formData.append(`images`, image)
      })
    }
    
    const response = await api.post(`/api/v1/shop/${shopId}/review`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error("Error creating shop review:", error)
    throw error
  }
}

export const updateShopReview = async (shopId: number, reviewId: number, reviewData: CreateShopReviewData) => {
  try {
    const formData = new FormData()
    formData.append('rating', reviewData.rating.toString())
    formData.append('comment', reviewData.comment)
    
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image) => {
        formData.append(`images`, image)
      })
    }
    const response = await api.patch(`/api/v1/shop/review/${reviewId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error("Error updating shop review:", error)
    throw error
  }
}

export const deleteShopReview = async (shopId: number, reviewId: number) => {
  try {
    
    const response = await api.delete(`/api/v1/shop/review/${reviewId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting shop review:", error)
    throw error
  }
}