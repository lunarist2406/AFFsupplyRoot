"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCategories } from "@/services/product"
import type { Category } from "@/types/product"
import { ProductContent } from "../components/ProductContent"

export default function ProductsMainPage() {
  const params = useParams() as { slug?: string[] }
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")

  const categorySlug = Array.isArray(params.slug) && params.slug.length > 0 ? params.slug[0] : null

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories(1, 50)
        const items = res.data.items
        setCategories(items)
        
        if (!categorySlug && items.length > 0) {
          router.replace(`/products/${items[0].slug}`)
        }
      } catch (error) {
        console.error("Không thể tải danh mục:", error)
      }
    }
    
    loadCategories()
  }, [categorySlug, router])

  return (
    <ProductContent
      searchTerm={searchTerm}
      sortBy={sortBy}
      categorySlug={categorySlug}
      categories={categories}
      onSearchChangeAction={setSearchTerm}
      onSortChangeAction={setSortBy}
    />
  )
}