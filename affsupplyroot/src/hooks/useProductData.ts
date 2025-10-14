import useSWR from 'swr'
import { getProductById } from '@/services/product'
import { getShopBySlug } from '@/services/shop'

const swrConfig = {
  revalidateOnFocus: false, 
  revalidateOnReconnect: false,
  revalidateIfStale: false, 
  dedupingInterval: 30000, 
  keepPreviousData: true, 
}

export const useProduct = (productId: number | null) => {
  const { data, error, isLoading } = useSWR(
    productId ? `product-${productId}` : null,
    async () => {
      const response = await getProductById(productId!)
      return response.data
    },
    swrConfig
  )

  return {
    product: data,
    isLoading,
    isError: error
  }
}

export const useShop = (shopSlug: string | null) => {
  const { data, error, isLoading } = useSWR(
    shopSlug ? `shop-${shopSlug}` : null,
    async () => {
      const response = await getShopBySlug(shopSlug!)
      return response.data
    },
    swrConfig
  )

  return {
    shop: data,
    isLoading,
    isError: error
  }
}

