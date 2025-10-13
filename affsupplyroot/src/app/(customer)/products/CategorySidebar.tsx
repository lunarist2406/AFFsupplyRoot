"use client"
import Image from "next/image"
import Link from "next/link"
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

  const handleCategoryClick = (categoryId: number, subCategoryId?: number) => {
    onCategorySelectAction(categoryId, subCategoryId)
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
        className={`w-64 sm:w-72 shadow-xl overflow-y-auto transition-transform duration-300 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block custom-scrollbar h-full`}
        style={{ 
          background: 'linear-gradient(180deg, #2A332F 0%, #4A5551 50%, #2A332F 100%)'
        }}
      >
      <div className="p-3">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3A433F]">
          <div className="flex items-center gap-3">
            <Grid3X3 className="h-8 w-8 text-yellow-primary" />
            <h2 className="text-2xl font-bold text-yellow-primary whitespace-nowrap">Danh Mục Nông Sản</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpenAction(false)}
            className="lg:hidden text-white hover:text-yellow-primary"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="space-y-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`bg-[#2A332F] rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300
                  ${selectedCategoryId === category.id ? 'border-yellow-primary bg-[#353D39]' : 'border-[#3A433F] hover:bg-[#353D39]'}`}
              >
                <div
                  onClick={() => toggleSubCategory(category.id)}
                  className="group flex items-center justify-between p-4 hover:bg-yellow-primary/10 transition-all duration-200 cursor-pointer"
                >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
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
                          <h3 className={`text-base font-bold transition-colors mb-1
                            ${selectedCategoryId === category.id ? 'text-yellow-primary' : 'text-gray-100 group-hover:text-yellow-primary'}`}>
                            {category.name}
                          </h3>
                        </div>
                      </div>
                  {isExpanded(category.id) ? (
                    <ChevronDown className="h-5 w-5 text-yellow-primary transition-colors flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-white group-hover:text-yellow-primary transition-colors flex-shrink-0" />
                  )}
                </div>

                {/* Sub Categories */}
                {isExpanded(category.id) && (
                  <div className="border-t border-[#3A433F] bg-[#353D39]">
                    <div className="p-3 space-y-2">
                      {!subCategories[category.id] ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-primary"></div>
                          <span className="ml-2 text-sm text-gray-300">Đang tải...</span>
                        </div>
                      ) : subCategories[category.id].length === 0 ? (
                        <div className="text-center py-4">
                          <span className="text-sm text-gray-400">Chưa có sản phẩm</span>
                        </div>
                      ) : (
                        subCategories[category.id].map((subCategory, index) => (
                        <Link
                          key={index}
                          href={`/products/${subCategory.slug}`}
                          className={`w-full group flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-primary/20 transition-all duration-200 cursor-pointer active:scale-95
                            ${selectedSubCategoryId === subCategory.id ? 'bg-yellow-primary/30 border border-yellow-primary' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCategoryClick(category.id, subCategory.id)
                          }}
                        >
                          <div className="w-2 h-2 bg-yellow-primary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="text-sm font-semibold text-gray-200 group-hover:text-yellow-primary transition-colors mb-0.5">
                              {subCategory.name}
                            </h4>
                            <p className="text-xs text-yellow-primary font-medium">
                              {subCategory.productCount} sản phẩm
                            </p>
                          </div>
                        </Link>
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