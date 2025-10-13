// Types cho Category
export interface Category {
  id: number
  name: string
  slug: string
  image: string
  description?: string
}

export interface CategoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    total: number
    page: number
    limit: number
    totalPages: number
    items: Category[]
  }
}

// Types cho Product
export interface ProductImage {
  url: string
}

export interface SellerProfile {
  id: number
  companyName: string
  slug: string
  shopAvatar: string | null
  brandName: string
}

export interface Product {
  id: number
  title: string
  slug: string
  basePrice: number
  soldCount: number
  minOrderQty: number
  stock: number
  avgRating: number
  totalReviews: number
  createdAt?: string
  SellerProfile: SellerProfile
  ProductImage: ProductImage[]
}

export interface Banner {
  id: number
  image: string
}

export interface CategoryGlobal {
  id: number
  name: string
  slug: string
  image: string
}

export interface TopRatedShop {
  id: number
  slug: string
  companyName: string
  brandName: string
  shopAvatar: string | null
  avgRating: number
  totalFollowers: number
}

export interface HomePageData {
  banners: Banner[]
  categoryGlobal: CategoryGlobal[]
  featuredProducts: Product[]
  bestSellers: Product[]
  newProducts: Product[]
  topRatedShops: TopRatedShop[]
}

export interface HomePageResponse {
  success: boolean
  statusCode: number
  message: string
  data: HomePageData
}

// Types cho Product từ Category Global
export interface ProductByCategoryGlobal {
  id: number
  title: string
  slug: string
  basePrice: number
  stock: number
  minOrderQty: number
  isActive: boolean
  CategoryGlobal: {
    id: number
    name: string
  } | null
  CategoryShop: {
    id: number
    name: string
  } | null
  SellerProfile: SellerProfile
  ProductImage: Array<{
    url: string
    isMain: boolean
  }>
  PricingTier: Array<{
    minQty: number
    price: number
  }>
}

export interface ProductsByCategoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    products: ProductByCategoryGlobal[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

// Type cho Product Detail từ API /api/v1/shop/seller/product/{id}
export interface ProductDetail {
  id: number
  sellerID: number
  categoryGlobalID: number | null
  categoryShopID: number | null
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
  stock: number
  minOrderQty: number
  basePrice: number
  isActive: boolean
  isFeatured: boolean
  soldCount: number
  viewCount: number
  totalReviews: number
  avgRating: number
  createdAt: string
  createdBy: number
  updatedAt: string
  isDeleted: boolean
  updatedBy: number | null
  CategoryGlobal: {
    id: number
    name: string
  } | null
  CategoryShop: {
    id: number
    name: string
  } | null
  ProductImage: Array<{
    id: number
    url: string
    isMain: boolean
  }>
  PricingTier: Array<{
    id: number
    minQty: number
    price: number
  }>
  _count: {
    ProductLike: number
  }
  ProductReview: unknown[]
  ProductComment: Array<{
    id: number
    content: string
    createdAt: string
    user: {
      id: number
      name: string
      avatar: string | null
    }
    ProductCommentImage: Array<{
      url: string
    }>
    _count: {
      ProductCommentLike: number
    }
  }>
  SellerProfile: SellerProfile
  isLiked: boolean
}

export interface ProductDetailResponse {
  success: boolean
  statusCode: number
  message: string
  data: ProductDetail
}

