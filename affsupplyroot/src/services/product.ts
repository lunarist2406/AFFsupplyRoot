/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "@/lib/Axios/axios"
import { 
  CategoryResponse, 
  ProductsByCategoryResponse,
  ProductDetailResponse
} from "@/types/product"
import { productSlugMapManager } from "@/hooks/useProductSlugMap"

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

export const getProductById = async (productId: number | string): Promise<ProductDetailResponse> => {
  try {
    const response = await api.get(`/api/v1/public/product/${productId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching product detail:", error)
    throw error
  }
}

// Preload tất cả slug mappings vào cache (gọi khi app khởi động)
export const preloadProductSlugMappings = async (): Promise<void> => {
  try {
    const categoriesResponse = await getCategories(1, 50)
    const categories = categoriesResponse.data.items
    
    for (const category of categories) {
      try {
        const productsResponse = await getProductsByCategoryGlobal(category.id, 1, 100)
        const products = productsResponse.data.products
        
        if (products.length > 0) {
          const mappings = products.map(p => ({
            slug: p.slug,
            id: p.id,
            categoryId: category.id
          }))
          productSlugMapManager.addMappings(mappings)
        }
      } catch (error) {
      }
    }
    
  } catch (error) {
  }
}

export const getProductBySlug = async (productSlug: string): Promise<ProductDetailResponse> => {
  try {
    const cachedId = productSlugMapManager.getProductId(productSlug)
    
    if (cachedId) {
      return await getProductById(cachedId)
    }
    const categoriesResponse = await getCategories(1, 20)
    const categories = categoriesResponse.data.items
    
    let productId: number | null = null
    
    for (const category of categories) {
      try {
        const productsResponse = await getProductsByCategoryGlobal(category.id, 1, 100)
        const products = productsResponse.data.products
        
        if (products.length > 0) {
          const mappings = products.map(p => ({
            slug: p.slug,
            id: p.id,
            categoryId: category.id
          }))
          productSlugMapManager.addMappings(mappings)
        }
        
        const product = products.find(p => p.slug === productSlug)
        if (product) {
          productId = product.id
          break
        }
      } catch (error) {
        continue
      }
    }
    
    if (!productId) {
      throw new Error(`Product with slug "${productSlug}" not found`)
    }
    
    return await getProductById(productId)
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    throw error
  }
}

