"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, X, Grid3X3 } from "lucide-react"
import { getCategories, getProductsByCategoryGlobal } from "@/services/product"
import { Category } from "@/types/product"

interface SubCategory {
  id: number
  name: string
  slug: string
  productCount: number
}

interface CategorySidebarProps {
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpenAction?: (open: boolean) => void
  selectedCategoryId?: number | null
  selectedSubCategoryId?: number | null
  onCategorySelectAction?: (categoryId: number | null, subCategoryId?: number | null) => void
}

export function CategorySidebar({ 
  isMobileMenuOpen = false, 
  setIsMobileMenuOpenAction = () => {},
  selectedCategoryId = null,
  selectedSubCategoryId = null,
  onCategorySelectAction = () => {}
}: CategorySidebarProps = {}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<{[key: number]: SubCategory[]}>({})
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [loadingSubCategoryId, setLoadingSubCategoryId] = useState<number | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])  

  const fetchCategories = async () => {
    try {
      const response = await getCategories(1, 10)
      setCategories(response.data.items)
      
      const subCategoriesMap: {[key: number]: SubCategory[]} = {}
      for (const category of response.data.items) {
        try {
          const productsResponse = await getProductsByCategoryGlobal(category.id, 1, 50)
          const subCats = productsResponse.data.products.map(product => ({
            id: product.id,
            name: product.title,
            slug: product.slug,
            productCount: 1
          }))
          subCategoriesMap[category.id] = subCats
        } catch (error) {
          console.error(`Không thể tải danh mục con cho ${category.name}:`, error)
          subCategoriesMap[category.id] = []
        }
      }
      setSubCategories(subCategoriesMap)
    } catch (error) {
      console.error("Không thể tải danh mục:", error)
    }
  }

  const handleCategoryClick = async (categoryId: number, subCategoryId?: number) => {
    if (subCategoryId) {
      setLoadingSubCategoryId(subCategoryId)
      // Delay ngắn để hiển thị loading
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    onCategorySelectAction(categoryId, subCategoryId)
    setLoadingSubCategoryId(null)
  }

  const toggleSubCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const isExpanded = (categoryId: number) => expandedCategories.includes(categoryId)

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="inset-0 bg-black/50 z-45 lg:hidden"
          onClick={() => setIsMobileMenuOpenAction(false)}
        />
      )}

      <div 
        className={`w-80 sm:w-96 bg-gradient-to-b from-green-50 via-white to-green-50 shadow-xl overflow-y-auto transition-transform duration-300 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block custom-scrollbar h-full`}
      >
      <div className="p-6 pt-12">
        <div className="flex items-center justify-between mb-8 pb-5 border-b-2 border-green-300/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
              <Grid3X3 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent">Danh Mục</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpenAction(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4 pb-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300
                  ${selectedCategoryId === category.id ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
              >
                <div
                  onClick={() => toggleSubCategory(category.id)}
                  className="group flex items-center justify-between p-5 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                              priority={false}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-bold transition-colors
                            ${selectedCategoryId === category.id ? 'text-green-700' : 'text-gray-800 group-hover:text-green-700'}`}>
                            {category.name}
                          </h3>
                        </div>
                      </div>
                  {isExpanded(category.id) ? (
                    <ChevronDown className="h-6 w-6 text-green-600 transition-colors flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                  )}
                </div>

                {/* Sub Categories */}
                {isExpanded(category.id) && (
                  <div className="border-t border-green-200/60 bg-green-50/40">
                    <div className="p-4 space-y-2">
                      {!subCategories[category.id] ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                          <span className="ml-2 text-sm text-gray-600 font-medium">Đang tải...</span>
                        </div>
                      ) : subCategories[category.id].length === 0 ? (
                        <div className="text-center py-4">
                          <span className="text-sm text-gray-500">Chưa có sản phẩm</span>
                        </div>
                      ) : (
                        subCategories[category.id].map((subCategory, index) => (
                        <div
                          key={index}
                          className={`w-full group flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 transition-all duration-200 cursor-pointer relative
                            ${selectedSubCategoryId === subCategory.id ? 'bg-green-100 border border-green-400' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCategoryClick(category.id, subCategory.id)
                          }}
                        >
                          {loadingSubCategoryId === subCategory.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-500 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0 text-left opacity-60">
                                <h4 className="text-sm font-medium text-gray-700">
                                  {subCategory.name}
                                </h4>
                                <p className="text-xs text-green-600 font-medium">
                                  Đang tải...
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                              <div className="flex-1 min-w-0 text-left">
                                <h4 className="text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                                  {subCategory.name}
                                </h4>
                                <p className="text-xs text-green-600 font-medium">
                                  {subCategory.productCount} sản phẩm
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
    </div>
    </>
  )
}