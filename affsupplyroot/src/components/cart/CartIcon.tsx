"use client"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/hooks/useCart"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CartIcon() {
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem, getItemPrice } = useCart()
  const router = useRouter();
  const totalItems = getTotalItems()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  // 🔥 Hàm kiểm tra login trước khi checkout
  const handleCheckoutClick = (e: React.MouseEvent) => {
    const authUser = localStorage.getItem("authUser")
    if (!authUser) {
      e.preventDefault() // chặn chuyển trang
      toast.warning("Vui lòng đăng nhập để tiếp tục thanh toán!")
      router.push("/authentication")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </motion.span>
          )}
        </motion.div>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg bg-white p-0 flex flex-col">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Giỏ hàng của bạn ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">Giỏ hàng trống</p>
            <p className="text-gray-400 text-sm text-center">
              Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Shop: {item.shopName}
                      </p>
                      <div className="space-y-1">
                        <p className="text-green-600 font-bold text-sm">
                          {formatPrice(getItemPrice(item))}
                        </p>
                        {item.pricingTiers && item.pricingTiers.length > 0 && getItemPrice(item) < item.basePrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(item.basePrice)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(item.minOrderQty, item.quantity - 1))
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-700">Tổng cộng:</span>
                <span className="text-green-600">{formatPrice(getTotalPrice())}</span>
              </div>

              {/* 👇 Thanh toán — check login trước */}
              <Link href="/Checkout" onClick={handleCheckoutClick} className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold rounded-lg">
                  Thanh toán
                </Button>
              </Link>

              <Link href="/products/trai-cay-tuoi" className="block">
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 py-6 text-base font-semibold rounded-lg"
                >
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
