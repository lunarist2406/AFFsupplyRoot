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

// Lấy chi tiết sản phẩm theo slug
export const getProductBySlug = async (productSlug: string): Promise<ProductDetailResponse> => {
  try {
    // Tìm product ID từ slug bằng cách lấy tất cả categories và tìm trong products
    const categoriesResponse = await getCategories(1, 50)
    const categories = categoriesResponse.data.items
    
    let productId: number | null = null
    
    // Tìm product trong tất cả categories
    for (const category of categories) {
      try {
        const productsResponse = await getProductsByCategoryGlobal(category.id, 1, 100)
        const product = productsResponse.data.products.find(p => p.slug === productSlug)
        if (product) {
          productId = product.id
          break
        }
      } catch (error) {
        // Bỏ qua lỗi nếu không tìm thấy trong category này
        continue
      }
    }
    
    if (!productId) {
      throw new Error(`Product with slug "${productSlug}" not found`)
    }
    
    // Lấy chi tiết sản phẩm bằng ID
    return await getProductById(productId)
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    throw error
  }
}

