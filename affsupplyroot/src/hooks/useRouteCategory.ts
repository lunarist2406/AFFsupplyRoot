"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import type { Category } from "@/types/product"

/**
 * Custom hook để quản lý route category state
 * Tách logic phức tạp của useEffect khỏi component
 */
export function useRouteCategory(categories: Category[]) {
  const router = useRouter()
  const params = useParams() as { slug?: string[] }
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [currentCategorySlug, setCurrentCategorySlug] = useState("")
  const [currentProductSlug, setCurrentProductSlug] = useState("")

  useEffect(() => {
    if (categories.length === 0) return

    const catSlug = params.slug?.[0]
    const prodSlug = params.slug?.[1]

    // Nếu có category slug trong URL, tìm và set category đó
    if (catSlug) {
      const category = categories.find((c) => c.slug === catSlug)
      if (category) {
        setSelectedCategoryId(category.id)
        setCurrentCategorySlug(category.slug)
        setCurrentProductSlug(prodSlug ?? "")
        return
      }
    }

    // Fallback: Nếu không có category trong URL hoặc không tìm thấy,
    // chuyển về category đầu tiên
    const first = categories[0]
    if (first && selectedCategoryId !== first.id) {
      setSelectedCategoryId(first.id)
      setCurrentCategorySlug(first.slug)
      setCurrentProductSlug("")
      router.replace(`/products/${first.slug}`)
    }
  }, [categories, params.slug, router, selectedCategoryId])

  return {
    selectedCategoryId,
    currentCategorySlug,
    currentProductSlug,
  }
}

