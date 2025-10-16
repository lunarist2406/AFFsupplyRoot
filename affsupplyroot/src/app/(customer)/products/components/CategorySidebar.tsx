"use client"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { X, Leaf, ChevronLeft, ChevronRight } from "lucide-react"
import { getCategories } from "@/services/product"
import type { Category } from "@/types/product"

interface CategorySidebarProps {
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpenAction?: (open: boolean) => void
  categoriesProp?: Category[]
  onCollapseChangeAction?: (collapsed: boolean) => void
}

export function CategorySidebar({
  isMobileMenuOpen = false,
  setIsMobileMenuOpenAction = () => {},
  categoriesProp,
  onCollapseChangeAction = () => {},
}: CategorySidebarProps = {}) {
  const router = useRouter()
  const params = useParams() as { slug?: string[] }
  const [categories, setCategories] = useState<Category[]>(categoriesProp || [])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategories()
      setCategories(response.data.items)
    } catch (error) {
      console.error("Không thể tải danh mục:", error)
    }
  }, [])

  useEffect(() => {
    if (categoriesProp && categoriesProp.length > 0) {
      setCategories(categoriesProp)
      return
    }
    fetchCategories()
  }, [categoriesProp, fetchCategories])

  const handleCategoryClick = async (category: Category) => {
    try {
      await router.push(`/products/${category.slug}`)
      setIsMobileMenuOpenAction(false)
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  const activeCategorySlug = Array.isArray(params?.slug) ? params.slug[0] : undefined

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpenAction(false)} 
        />
      )}

      <div
        className={`lg:block bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-50/60 shadow-xl border-r-2 border-amber-200/40 overflow-y-auto custom-scrollbar backdrop-blur-sm transition-all duration-300
          ${isMobileMenuOpen ? "block fixed top-0 left-0 h-screen z-50 translate-x-0 w-full sm:w-80" : "hidden"} 
          lg:fixed lg:top-16 lg:left-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 
          ${isCollapsed ? "lg:w-30" : "lg:w-70"}`}
      >
        <div className={`p-5 pt-8 ${isCollapsed ? "lg:px-2" : ""}`}>
          <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-amber-300/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Danh Mục
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newCollapsed = !isCollapsed
                  setIsCollapsed(newCollapsed)
                  onCollapseChangeAction(newCollapsed)
                }}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200"
                title={isCollapsed ? "Mở rộng" : "Thu gọn"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-emerald-600" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpenAction(false)}
                className="lg:hidden text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3 pb-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`bg-white/95 backdrop-blur-sm rounded-2xl border-2 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer
                  ${
                    activeCategorySlug === category.slug
                      ? "border-emerald-400 bg-gradient-to-br from-emerald-50/90 to-teal-50/70 shadow-lg ring-2 ring-emerald-300/50"
                      : "border-amber-200/60 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/30"
                  }`}
              >
                <div className={`flex items-center gap-4 p-4 ${isCollapsed ? "lg:justify-center lg:px-2" : ""}`}>
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-white">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold transition-colors leading-snug ${
                        activeCategorySlug === category.slug 
                          ? "text-emerald-800" 
                          : "text-gray-800 hover:text-emerald-700"
                      }`}>
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}