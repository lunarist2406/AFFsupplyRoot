"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: number
  title: string
  slug: string
  image: string
  basePrice: number
  quantity: number
  minOrderQty: number
  stock: number
  shopId: number
  shopName: string
  shopSlug: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + newItem.minOrderQty
        
        if (newQuantity > newItem.stock) {
          toast.error(`Không thể thêm. Chỉ còn ${newItem.stock} sản phẩm trong kho`)
          return prevItems
        }
        
        toast.success(`Đã cập nhật số lượng ${newItem.title}`)
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      
      toast.success(`Đã thêm ${newItem.title} vào giỏ hàng`)
      return [...prevItems, { ...newItem, quantity: newItem.minOrderQty }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item) {
        toast.success(`Đã xóa ${item.title} khỏi giỏ hàng`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (quantity < item.minOrderQty) {
            toast.error(`Số lượng tối thiểu là ${item.minOrderQty}`)
            return item
          }
          if (quantity > item.stock) {
            toast.error(`Chỉ còn ${item.stock} sản phẩm trong kho`)
            return item
          }
          return { ...item, quantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng")
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.basePrice * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

