
export const PRODUCT_THRESHOLDS = {
  HIGH_RATING: 4.5,
  POPULAR_SALES: 50,
} as const

export const PRODUCT_DEFAULTS = {
  PLACEHOLDER_IMAGE: "/Gao-ST25.png",
  ITEMS_PER_PAGE: 30,
  SUBCATEGORY_ITEMS: 20,
} as const

export const SORT_OPTIONS = {
  NAME_ASC: "name-asc",
  NAME_DESC: "name-desc",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
  RATING_DESC: "rating-desc",
  SOLD_DESC: "sold-desc",
} as const

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]

