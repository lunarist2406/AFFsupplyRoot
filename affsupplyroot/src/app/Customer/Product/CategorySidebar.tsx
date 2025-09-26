"use client"
import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import { categories } from "@/View/home/variable"
import { ChevronRight, ChevronDown, Menu, X } from "lucide-react"

interface CategoryWithSub {
  name: string
  description: string
  image: StaticImageData
  products: string
  subCategories?: { name: string; products: string }[]
}

const categoriesWithSub: CategoryWithSub[] = [
  {
    ...categories[0],
    subCategories: [
      { name: "Gạo tẻ", products: "45 sản phẩm" },
      { name: "Gạo nếp", products: "32 sản phẩm" },
      { name: "Lúa mì", products: "28 sản phẩm" },
      { name: "Ngô", products: "15 sản phẩm" }
    ]
  },
  {
    ...categories[1],
    subCategories: [
      { name: "Rau xanh", products: "180 sản phẩm" },
      { name: "Củ quả", products: "150 sản phẩm" },
      { name: "Trái cây", products: "120 sản phẩm" }
    ]
  },
  ...categories.slice(2) 
]

interface CategorySidebarProps {
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
}

export function CategorySidebar({ 
  isMobileMenuOpen = false, 
  setIsMobileMenuOpen = () => {} 
}: CategorySidebarProps = {}) {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryIndex) 
        ? prev.filter(index => index !== categoryIndex)
        : [...prev, categoryIndex]
    )
  }

  const isExpanded = (categoryIndex: number) => expandedCategories.includes(categoryIndex)

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-45 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div 
        className={`fixed left-0 top-0 h-screen w-64 sm:w-72 shadow-xl z-50 overflow-y-auto transition-transform duration-300 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block custom-scrollbar`}
        style={{ 
          background: 'linear-gradient(180deg, #2A332F 0%, #4A5551 50%, #2A332F 100%)'
        }}
      >
      <div className="p-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <h2 className="text-xl font-bold text-white">Danh Mục Nông Sản</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-white hover:text-yellow-primary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-3">
          {categoriesWithSub.map((category, index) => (
            <div key={index} className="bg-[#2A332F] rounded-xl border border-[#3A433F] overflow-hidden hover:shadow-lg transition-all duration-300 hover:bg-[#353D39]">
              <div
                onClick={() => category.subCategories ? toggleCategory(index) : undefined}
                className="group flex items-center justify-between p-4 hover:bg-yellow-primary/10 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-yellow-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-yellow-primary font-medium">
                      {category.products}
                    </p>
                  </div>
                </div>
                {category.subCategories ? (
                  isExpanded(index) ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-yellow-primary transition-colors" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-primary transition-colors" />
                  )
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-primary transition-colors" />
                )}
              </div>

              {category.subCategories && isExpanded(index) && (
                <div className="border-t border-[#3A433F] bg-[#353D39]">
                  <div className="p-2 space-y-1">
                    {category.subCategories.map((subCategory) => (
                      <div
                        key={subCategory.name}
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-primary/20 transition-all duration-200 cursor-pointer"
                      >
                        <div className="w-2 h-2 bg-yellow-primary rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-300 group-hover:text-yellow-primary transition-colors">
                            {subCategory.name}
                          </h4>
                          <p className="text-xs text-yellow-primary font-medium">
                            {subCategory.products}
                          </p>
                        </div>
                      </div>
                    ))}
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