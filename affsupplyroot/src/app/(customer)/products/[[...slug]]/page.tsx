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
          // Tìm product với slug này trong tất cả categories
          let foundProduct = null
          for (const cat of categories) {
            const productsResponse = await getCachedOrFetch(
              categoryProductsCache,
              cat.id,
              async () => {
                const response = await getProductsByCategoryGlobal(cat.id, 1, 50)
                return { data: response.data.products }
              }
            )
            foundProduct = productsResponse.find(p => p.slug === slug)
            
            if (foundProduct) {
              setSelectedCategoryId(cat.id)
              setSelectedSubCategoryId(foundProduct.id)
              setCurrentCategoryName(cat.name)
              setCurrentCategorySlug(cat.slug)
              setDetailProduct(null) // KHÔNG hiển thị detail
              setShopDetail(null)
              setIsInitialLoading(false)
              return
            }
          }
          
          // Nếu không tìm thấy product, kiểm tra xem có phải category không
          const category = categories.find(cat => cat.slug === slug)
          if (category) {
            setSelectedCategoryId(category.id)
            setCurrentCategoryName(category.name)
            setCurrentCategorySlug(category.slug)
            setSelectedSubCategoryId(null)
            setDetailProduct(null)
            setShopDetail(null)
          }
        } else if (categories.length > 0) {
          const firstCategory = categories[0]
          setSelectedCategoryId(firstCategory.id)
          setCurrentCategoryName(firstCategory.name)
          setCurrentCategorySlug(firstCategory.slug)
          setSelectedSubCategoryId(null)
          setDetailProduct(null)
          setShopDetail(null)
        }
      } catch (error) {
        console.error("Error loading page:", error)
      } finally {
        setIsInitialLoading(false)
      }
    }

    handleSlug()
  }, [slug, productSlug])

  const handleCategorySelect = async (categoryId: number | null, subCategoryId?: number | null) => {
    if (!categoryId || !subCategoryId) return
    
    try {
      // Tìm product slug từ subCategoryId
      const productsResponse = await getCachedOrFetch(
        categoryProductsCache,
        categoryId,
        async () => {
          const response = await getProductsByCategoryGlobal(categoryId, 1, 50)
          return { data: response.data.products }
        }
      )
      
      const product = productsResponse.find(p => p.id === subCategoryId)
      if (product) {
        // Update state TRƯỚC
        setSelectedCategoryId(categoryId)
        setSelectedSubCategoryId(subCategoryId)
        setDetailProduct(null)
        
        // Tìm category name
        const response = await getCategories(1, 10)
        const category = response.data.items.find(cat => cat.id === categoryId)
        if (category) {
          setCurrentCategoryName(category.name)
          setCurrentCategorySlug(category.slug)
        }
        
        // Thay đổi URL mà KHÔNG trigger reload - dùng window.history
        window.history.replaceState(null, '', `/products/${product.slug}`)
      }
    } catch (error) {
      console.error("Error selecting category:", error)
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
    <div className="flex font-manuale h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
        <div className="bg-gradient-to-r from-white via-green-50 to-emerald-50 border-b border-green-200 p-4 sm:p-5 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Button
                onClick={() => setIsMobileMenuOpen(true)}
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 hover:bg-green-100 h-8 w-8 mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="text-green-700 text-lg hover:text-green-800 font-bold transition-colors">Trang chủ</Link>
              <ChevronRight className="h-5 w-5 text-green-600" />
              <span className="text-green-800 text-lg font-extrabold">{currentCategoryName || "Lương thực"}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
              <Input 
                placeholder="Tìm kiếm sản phẩm của bạn"
                className="pr-12 pl-4 bg-white border border-green-300 rounded-lg h-11 text-gray-700 placeholder:text-gray-500 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="bg-white hover:bg-green-50 text-gray-700 border border-green-300 rounded-lg h-11 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
              >
                <Filter className="h-4 w-4 text-green-600" />
                {getSortText()}
                <ChevronDown className="h-4 w-4 text-green-600" />
              </Button>
              
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-1 w-full sm:w-48 bg-white border border-green-200 rounded-lg shadow-xl z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortSelect(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'
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