"use client"

import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart()
  const router = useRouter()
  const { state } = useAuth()
  const { user } = state

  const handleCheckout = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thanh toán")
      router.push("/authentication")
      return
    }
    router.push("/Checkout")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-white rounded-full p-8 shadow-lg mb-6 inline-block">
                <ShoppingCart className="w-24 h-24 text-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
              </p>
              <Link href="/products/trai-cay-tuoi">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products/trai-cay-tuoi">
            <Button variant="ghost" className="mb-4 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tiếp tục mua sắm
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-600 mt-2">
            Bạn có {getTotalItems()} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/${item.slug}`}
                        className="relative w-full sm:w-32 h-32 flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/${item.slug}`}
                              className="hover:text-green-600 transition-colors"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">
                              Shop: {item.shopName}
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {formatPrice(item.basePrice)}
                            </p>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Số lượng:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(item.minOrderQty, item.quantity - 1)
                                  )
                                }
                                disabled={item.quantity <= item.minOrderQty}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 font-semibold text-gray-900 min-w-[60px] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.min(item.stock, item.quantity + 1)
                                  )
                                }
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-600">Thành tiền:</p>
                            <p className="text-lg font-bold text-gray-900">
                              {formatPrice(item.basePrice * item.quantity)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            Tối thiểu: {item.minOrderQty} | Còn lại: {item.stock}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({getTotalItems()} sản phẩm):</span>
                    <span className="font-semibold">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Tổng cộng:
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold rounded-lg shadow-lg mb-3"
                >
                  Tiến hành thanh toán
                </Button>

                <Link href="/products/trai-cay-tuoi">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 py-6 text-base font-semibold rounded-lg"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Link>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <p>Miễn phí vận chuyển cho đơn hàng từ 500.000₫</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <p>Đảm bảo hoàn tiền 100% nếu sản phẩm lỗi</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <p>Hỗ trợ thanh toán đa dạng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

