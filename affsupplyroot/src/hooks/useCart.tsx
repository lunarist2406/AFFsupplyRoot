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
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">, customQuantity?: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      const quantityToAdd = customQuantity || newItem.minOrderQty
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd
        
        if (newQuantity > newItem.stock) {
          toast.error(`Không thể thêm. Chỉ còn ${newItem.stock} sản phẩm trong kho`, {
            id: `stock-limit-${newItem.id}`,
            duration: 2000
          })
          return prevItems
        }
        
        toast.success(`Đã cập nhật số lượng ${newItem.title}`, {
          id: `update-${newItem.id}`,
          duration: 2000
        })
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      
      if (quantityToAdd < newItem.minOrderQty) {
        toast.error(`Số lượng tối thiểu là ${newItem.minOrderQty}`, {
          id: `min-qty-${newItem.id}`,
          duration: 2000
        })
        return prevItems
      }
      
      if (quantityToAdd > newItem.stock) {
        toast.error(`Chỉ còn ${newItem.stock} sản phẩm trong kho`, {
          id: `stock-${newItem.id}`,
          duration: 2000
        })
        return prevItems
      }
      
      toast.success(`Đã thêm ${newItem.title} vào giỏ hàng`, {
        id: `add-${newItem.id}`,
        duration: 2000
      })
      return [...prevItems, { ...newItem, quantity: quantityToAdd }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item) {
        toast.success(`Đã xóa ${item.title} khỏi giỏ hàng`, {
          id: `remove-${id}`,
          duration: 2000
        })
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (quantity < item.minOrderQty) {
            toast.error(`Số lượng tối thiểu là ${item.minOrderQty}`, {
              id: `min-${id}`,
              duration: 2000
            })
            return item
          }
          if (quantity > item.stock) {
            toast.error(`Chỉ còn ${item.stock} sản phẩm trong kho`, {
              id: `max-${id}`,
              duration: 2000
            })
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
    toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng", {
      id: 'clear-cart',
      duration: 2000
    })
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

