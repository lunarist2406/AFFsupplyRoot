import api from "@/lib/Axios/axios"
import { 
  CategoryResponse, 
  ProductsByCategoryResponse,
  ProductDetailResponse
} from "@/types/product"

// Lấy danh sách categories
export const getCategories = async (
  page: number = 1, 
  limit: number = 10, 
  search?: string
): Promise<CategoryResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) {
      params.append('search', search)
    }

    const response = await api.get(`/api/v1/public/categories-global?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Lấy sản phẩm theo category global ID
export const getProductsByCategoryGlobal = async (
  categoryId: number,
  page: number = 1,
  limit: number = 20,
  search?: string
): Promise<ProductsByCategoryResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) {
      params.append('search', search)
    }

    const response = await api.get(`/api/v1/public/categories-global/${categoryId}?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching products by category:", error)
    throw error
  }
}

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (productId: number | string): Promise<ProductDetailResponse> => {
  try {
    const response = await api.get(`/api/v1/public/product/${productId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching product detail:", error)
    throw error
  }
}

