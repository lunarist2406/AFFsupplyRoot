"use client"
import { ProductContent } from "@/app/(customer)/products/ProductContent"
import { ProductGallery } from "../details/ProductGallery"
import { ProductInfo } from "../details/ProductInfo"
import { ProductDescription } from "../details/ProductDescription"
import { ShopInfo } from "../details/ShopInfo"
import { ShopProducts } from "../details/ShopProducts"
import { CategorySidebar } from "@/app/(customer)/products/CategorySidebar"
import CommentSection from "@/components/product/CommentSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getCategories, getProductsByCategoryGlobal, getProductById } from "@/services/product"
import { getShopBySlug } from "@/services/shop"
import { ProductDetail, ProductByCategoryGlobal } from "@/types/product"
interface ShopDetail {
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
  user: {
    id: number
    name: string
    email: string
    avatar: string | null
  }
  ShopReview: Array<{
    id: number
    rating: number
    comment: string
    createdAt: string
    user: {
      id: number
      name: string
      avatar: string | null
    }
    ReviewShopImage: Array<{
      url: string
    }>
  }>
  categoriesShop: Array<{
    id: number
    name: string
    slug: string
  }>
  isFollowed: boolean
}

import { 
  Search, 
  Filter, 
  ChevronRight,
  ChevronDown,
  Menu
} from "lucide-react"

// Cache cho products, shops và categories (5 phút)
const CACHE_DURATION = 5 * 60 * 1000
const productCache = new Map<number, { data: ProductDetail; timestamp: number }>()
const shopCache = new Map<string, { data: ShopDetail; timestamp: number }>()
const categoryProductsCache = new Map<number, { data: ProductByCategoryGlobal[]; timestamp: number }>()

type CacheMap<K, V> = Map<K, { data: V; timestamp: number }>

const getCachedOrFetch = async <K, V>(
  cache: CacheMap<K, V>,
  key: K,
  fetcher: () => Promise<{ data: V }>
): Promise<V> => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  const result = await fetcher()
  cache.set(key, { data: result.data, timestamp: Date.now() })
  return result.data
}

export default function ProductPage() {
  const params = useParams() as { slug?: string[] }
  const slugArray = Array.isArray(params.slug) ? params.slug : []
  const slug = slugArray.length > 0 ? slugArray[0] : null
  const productSlug = slugArray.length > 1 ? slugArray[1] : null
  
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null)
  const [currentCategoryName, setCurrentCategoryName] = useState("")
  const [currentCategorySlug, setCurrentCategorySlug] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [detailProduct, setDetailProduct] = useState<ProductDetail | null>(null)
  const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null)

  const sortOptions = [
    { value: "name-asc", label: "Tên A-Z" },
    { value: "name-desc", label: "Tên Z-A" },
    { value: "price-asc", label: "Giá thấp đến cao" },
    { value: "price-desc", label: "Giá cao đến thấp" },
    { value: "rating-desc", label: "Đánh giá cao nhất" },
    { value: "sold-desc", label: "Bán chạy nhất" }
  ]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleSortSelect = (value: string) => {
    setSortBy(value)
    setShowSortDropdown(false)
  }

  const getSortText = () => {
    const option = sortOptions.find(opt => opt.value === sortBy)
    return option ? option.label : "Tên A-Z"
  }

  useEffect(() => {
    const findProductInCategory = async (categoryId: number): Promise<ProductByCategoryGlobal | null> => {
      const productsResponse = await getCachedOrFetch(
        categoryProductsCache,
        categoryId,
        async () => {
          const response = await getProductsByCategoryGlobal(categoryId, 1, 20)
          return { data: response.data.products }
        }
      )
      return productsResponse.find((p: ProductByCategoryGlobal) => p.slug === productSlug) || null
    }

    const loadProductDetail = async (productId: number) => {
      const detail = await getCachedOrFetch(
        productCache,
        productId,
        () => getProductById(productId)
      )
      setDetailProduct(detail)
      
      if (detail.SellerProfile?.slug) {
        getCachedOrFetch(shopCache, detail.SellerProfile.slug, () => getShopBySlug(detail.SellerProfile.slug))
          .then(setShopDetail)
          .catch(() => {})
      }
    }

    const handleSlug = async () => {
      try {
        const categoriesData = await getCategories(1, 50)
        const categories = categoriesData.data.items

        if (productSlug) {
          let categoryId = null
          
          if (slug) {
            const category = categories.find(cat => cat.slug === slug)
            if (category) {
              categoryId = category.id
              setSelectedCategoryId(category.id)
              setCurrentCategoryName(category.name)
              setCurrentCategorySlug(category.slug)
            }
          }

          let foundProduct = categoryId ? await findProductInCategory(categoryId) : null

          if (!foundProduct) {
            for (const cat of categories) {
              foundProduct = await findProductInCategory(cat.id)
              if (foundProduct) {
                setSelectedCategoryId(cat.id)
                setCurrentCategoryName(cat.name)
                setCurrentCategorySlug(cat.slug)
                break
              }
            }
          }

          if (foundProduct) {
            setSelectedSubCategoryId(foundProduct.id)
            await loadProductDetail(foundProduct.id)
          } else {
            setDetailProduct(null)
            setShopDetail(null)
          }
          
          setIsInitialLoading(false)
          return
        }

        if (slug) {
          const category = categories.find(cat => cat.slug === slug)
          if (category) {
            setSelectedCategoryId(category.id)
            setCurrentCategoryName(category.name)
            setCurrentCategorySlug(category.slug)
          }
        } else if (categories.length > 0) {
          const firstCategory = categories[0]
          setSelectedCategoryId(firstCategory.id)
          setCurrentCategoryName(firstCategory.name)
          setCurrentCategorySlug(firstCategory.slug)
        }

        setSelectedSubCategoryId(null)
        setDetailProduct(null)
        setShopDetail(null)
      } catch (error) {
        console.error("Error loading page:", error)
      } finally {
        setIsInitialLoading(false)
      }
    }

    handleSlug()
  }, [slug, productSlug])

  const handleCategorySelect = async (categoryId: number | null, subCategoryId?: number | null) => {
    setSelectedCategoryId(categoryId)
    setSelectedSubCategoryId(subCategoryId || null)
    
    if (categoryId) {
      try {
        const response = await getCategories(1, 10)
        const category = response.data.items.find(cat => cat.id === categoryId)
        if (category) {
          setCurrentCategoryName(category.name)
          setCurrentCategorySlug(category.slug)
        }
      } catch (error) {
        console.error("Không thể tải danh mục:", error)
      }
    } else {
      setCurrentCategoryName("Tất cả sản phẩm")
    }
  }

  if (isInitialLoading) {
    return (
      <div className="flex flex-1 flex-col font-manuale h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-primary mb-4"></div>
            <p className="text-white text-lg">Đang tải trang...</p>
          </div>
        </div>
      </div>
    )
  }

  if (detailProduct) {
    return (
      <div className="flex flex-1 flex-col font-manuale min-h-screen bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <ProductGallery product={detailProduct} />
              </div>
              <div>
                <ProductInfo product={detailProduct} />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-5">
            <ProductDescription product={detailProduct} />
            
            {shopDetail && (
              <ShopInfo shop={shopDetail} />
            )}
            
            {shopDetail && (
              <ShopProducts 
                shopSlug={shopDetail.slug} 
                currentProductId={detailProduct?.id}
              />
            )}
            <CommentSection 
              productId={detailProduct.id} 
              hasPurchased={false} 
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex font-manuale h-screen">
      {/* Sidebar */}
      <CategorySidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpenAction={setIsMobileMenuOpen}
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
        onCategorySelectAction={handleCategorySelect}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div style={{ 
          background: 'linear-gradient(180deg, #353D39 100%, #4A5551 100%, #353D39 5%)',
          padding: '12px' 
        }} className="p-3 sm:p-4 flex-shrink-0 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Button
                onClick={() => setIsMobileMenuOpen(true)}
                variant="ghost"
                size="icon"
                className="lg:hidden text-yellow-primary hover:bg-yellow-primary/10 h-8 w-8 mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="text-yellow-primary text-base hover:text-yellow-secondary font-medium">Trang chủ</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-yellow-primary text-base font-medium">{currentCategoryName || "Lương thực"}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Tìm kiếm sản phẩm của bạn"
                className="pr-12 pl-4 bg-white/95 border border-gray-200 rounded-lg h-9 text-gray-700 placeholder:text-gray-500 text-sm focus:border-yellow-primary focus:ring-1 focus:ring-yellow-primary"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="bg-yellow-primary hover:bg-yellow-secondary text-black rounded-lg h-9 px-3 sm:px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Filter className="h-4 w-4" />
                {getSortText()}
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortSelect(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'bg-yellow-primary/10 text-yellow-primary' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <ProductContent 
            searchTerm={searchTerm} 
            sortBy={sortBy}
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            currentCategorySlug={currentCategorySlug}
          />
        </div>
      </div>
    </div>
  )
}