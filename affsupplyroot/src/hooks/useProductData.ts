import useSWR, { SWRConfiguration } from 'swr'
import { getProductById, getProductsByCategoryGlobal } from '@/services/product'
import { getShopBySlug } from '@/services/shop'
import type { ProductDetail, ProductByCategoryGlobal } from '@/types/product'

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false, 
  revalidateOnReconnect: false,
  revalidateIfStale: false, 
  dedupingInterval: 30000, 
  keepPreviousData: true,
  onError: (error) => {
    console.error('SWR Error:', error)
    // TODO: Add toast notification for user feedback
  }
}

export const useProduct = (productId: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<ProductDetail>(
    productId ? `product-${productId}` : null,
    async () => {
      if (!productId) throw new Error('Product ID is required')
      const response = await getProductById(productId)
      return response.data
    },
    swrConfig
  )

  return {
    product: data,
    isLoading,
    isError: !!error,
    error: error as Error | undefined,
    mutate,
  }
}

export const useShop = (shopSlug: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    shopSlug ? `shop-${shopSlug}` : null,
    async () => {
      if (!shopSlug) throw new Error('Shop slug is required')
      const response = await getShopBySlug(shopSlug)
      return response.data
    },
    swrConfig
  )

  return {
    shop: data,
    isLoading,
    isError: !!error,
    error: error as Error | undefined,
    mutate,
  }
}

/**
 * Hook for fetching products by category with search support
 * Sử dụng SWR để cache và tự động revalidate data
 */
export const useProductsByCategory = (
  categorySlug: string | null,
  searchTerm: string = '',
  categories: Array<{ id: number; slug: string; name: string }> = []
) => {
  // Tìm category ID từ slug
  const categoryId = categorySlug ? categories.find(cat => cat.slug === categorySlug)?.id : null

  const { data, error, isLoading, mutate } = useSWR<ProductByCategoryGlobal[]>(
    categoryId ? `products-category-${categoryId}-${searchTerm}` : null,
    async () => {
      if (!categoryId) {
        return []
      }
      const response = await getProductsByCategoryGlobal(categoryId, 1, 30, searchTerm)
      return response.data.products || []
    },
    swrConfig
  )

  return {
    products: data || [],
    isLoading: categoryId ? isLoading : false, 
    isError: !!error,
    error: error as Error | undefined,
    mutate,
  }
}

