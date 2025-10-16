"use client"

import { useSyncExternalStore } from "react"
import type { Category } from "@/types/product"

export interface SubCategory {
  id: number
  name: string
  slug: string
  productCount: number
  image?: string
}

type CategoryStoreData = {
  categories: Category[]
  expandedIds: Set<number>
  subCategoriesByCategoryId: Map<number, SubCategory[]>
  loadingCategoryIds: Set<number>
}

type CategoryStoreActions = {
  setCategories: (items: Category[]) => void
  toggleExpanded: (categoryId: number) => void
  setSubCategories: (categoryId: number, items: SubCategory[]) => void
  setLoading: (categoryId: number, isLoading: boolean) => void
  clear: () => void
}

let state: CategoryStoreData = {
  categories: [],
  expandedIds: new Set(),
  subCategoriesByCategoryId: new Map(),
  loadingCategoryIds: new Set(),
}

const listeners = new Set<() => void>()

function setState(partial: Partial<CategoryStoreData>) {
  state = { ...state, ...partial }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const actions: CategoryStoreActions = {
  setCategories: (items) => setState({ categories: items }),
  
  toggleExpanded: (categoryId) => {
    const newExpanded = new Set(state.expandedIds)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setState({ expandedIds: newExpanded })
  },
  
  setSubCategories: (categoryId, items) => {
    const newMap = new Map(state.subCategoriesByCategoryId)
    newMap.set(categoryId, items)
    setState({ subCategoriesByCategoryId: newMap })
  },
  
  setLoading: (categoryId, isLoading) => {
    const newLoading = new Set(state.loadingCategoryIds)
    if (isLoading) {
      newLoading.add(categoryId)
    } else {
      newLoading.delete(categoryId)
    }
    setState({ loadingCategoryIds: newLoading })
  },
  
  clear: () => setState({ 
    categories: [], 
    expandedIds: new Set(), 
    subCategoriesByCategoryId: new Map(),
    loadingCategoryIds: new Set(),
  }),
}

function getSnapshot() {
  return state
}

export function useCategoryStore(): readonly [CategoryStoreData, CategoryStoreActions] {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return [snapshot, actions] as const
}

