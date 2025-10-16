"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategorySidebar } from "./components/CategorySidebar"
import { getCategories } from "@/services/product"
import type { Category } from "@/types/product"

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories(1, 50)
        setCategories(res.data.items)
      } catch (error) {
        console.error("Không thể tải danh mục:", error)
      }
    }
    loadCategories()
  }, [])
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-amber-50/50">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-xl hover:bg-emerald-50 border-2 border-emerald-200/50 hover:border-emerald-400 transition-all"
          size="icon"
        >
          <Menu className="h-5 w-5 text-emerald-700" />
        </Button>
      </div>

      <CategorySidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpenAction={setIsMobileMenuOpen}
        categoriesProp={categories}
        onCollapseChangeAction={setIsSidebarCollapsed}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-30' : 'lg:ml-70'}`}>
        {children}
      </main>
    </div>
  )
}