interface ProductSlugMapping {
  slug: string
  id: number
  categoryId: number
}

const STORAGE_KEY = 'product-slug-map'
const STORAGE_EXPIRY_KEY = 'product-slug-map-expiry'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24h

class ProductSlugMapManager {
  private slugMap: Map<string, ProductSlugMapping> = new Map()
  private isInitialized = false

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const expiryStr = localStorage.getItem(STORAGE_EXPIRY_KEY)
      if (expiryStr) {
        const expiry = parseInt(expiryStr, 10)
        if (Date.now() > expiry) {
          this.clearMap()
          return
        }
      }

      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data) as Array<[string, ProductSlugMapping]>
        this.slugMap = new Map(parsed)
      }
    } catch (error) {
      console.error('Error loading product slug map from storage:', error)
      this.clearMap()
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const data = Array.from(this.slugMap.entries())
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      localStorage.setItem(STORAGE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString())
    } catch (error) {
      console.error('Error saving product slug map to storage:', error)
    }
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      this.loadFromStorage()
      this.isInitialized = true
    }
  }

  addMapping(slug: string, id: number, categoryId: number): void {
    this.ensureInitialized()
    this.slugMap.set(slug, { slug, id, categoryId })
    this.saveToStorage()
  }

  addMappings(mappings: ProductSlugMapping[]): void {
    this.ensureInitialized()
    mappings.forEach((mapping) => {
      this.slugMap.set(mapping.slug, mapping)
    })
    this.saveToStorage()
  }

  getProductId(slug: string): number | null {
    this.ensureInitialized()
    const mapping = this.slugMap.get(slug)
    return mapping?.id ?? null
  }

  getMapping(slug: string): ProductSlugMapping | null {
    this.ensureInitialized()
    return this.slugMap.get(slug) ?? null
  }

  clearMap(): void {
    this.slugMap.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_EXPIRY_KEY)
    }
  }

  getAllMappings(): ProductSlugMapping[] {
    this.ensureInitialized()
    return Array.from(this.slugMap.values())
  }
}

export const productSlugMapManager = new ProductSlugMapManager()

export function useProductSlugMap() {
  return {
    addMapping: productSlugMapManager.addMapping.bind(productSlugMapManager),
    addMappings: productSlugMapManager.addMappings.bind(productSlugMapManager),
    getProductId: productSlugMapManager.getProductId.bind(productSlugMapManager),
    getMapping: productSlugMapManager.getMapping.bind(productSlugMapManager),
    clearMap: productSlugMapManager.clearMap.bind(productSlugMapManager),
  }
}
