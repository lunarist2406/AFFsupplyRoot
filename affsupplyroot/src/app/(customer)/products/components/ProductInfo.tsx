"use client"

import { useState, memo, useEffect } from "react"
import { ProductDetail } from "@/types/product"
import { motion } from "framer-motion"
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaCartShopping,
  FaHeart,
  FaShare,
} from "react-icons/fa6"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"
import { likeProduct } from "@/services/product-interaction"

interface ProductInfoProps {
  product: ProductDetail
}

export const ProductInfo = memo(function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(product.minOrderQty || 1)
  const [isLiked, setIsLiked] = useState(product.isLiked || false)
  const [isLiking, setIsLiking] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()
  const { state } = useAuth()
  const { user } = state

  useEffect(() => {
    setIsLiked(product.isLiked || false)
  }, [product.isLiked])

  const handleLike = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thích sản phẩm")
      return
    }

    setIsLiking(true)
    try {
      const response = await likeProduct(product.id)
      setIsLiked(response.data.isLiked)
      toast.success(response.data.isLiked ? "Đã thích sản phẩm!" : "Đã bỏ thích sản phẩm", {
        id: `like-${product.id}`,
        duration: 1500
      })
    } catch (error) {
      console.error("Like error:", error)
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra khi thích sản phẩm")
    } finally {
      setIsLiking(false)
    }
  }

  const getCurrentPrice = () => {
    if (!product.PricingTier || product.PricingTier.length === 0) {
      return product.basePrice
    }
    
    const applicableTier = product.PricingTier
      .filter(tier => quantity >= tier.minQty)
      .sort((a, b) => b.minQty - a.minQty)[0]
    
    return applicableTier ? applicableTier.price : product.basePrice
  }

  const currentPrice = getCurrentPrice()
  const totalPrice = currentPrice * quantity

  const getProductImage = () => {
    if (product.ProductImage && product.ProductImage.length > 0) {
      return product.ProductImage[0].url
    }
    return "/Gao-ST25.png"
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return
    }

    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: getProductImage(),
      basePrice: product.basePrice,
      minOrderQty: product.minOrderQty,
      stock: product.stock,
      shopId: product.SellerProfile.id,
      shopName: product.SellerProfile.brandName,
      shopSlug: product.SellerProfile.slug,
      pricingTiers: product.PricingTier || [],
    }, quantity)
  }

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua hàng")
      router.push("/authentication")
      return
    }

    if (product.stock <= 0) {
      toast.error("Sản phẩm đã hết hàng")
      return
    }

    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: getProductImage(),
      basePrice: product.basePrice,
      minOrderQty: product.minOrderQty,
      stock: product.stock,
      shopId: product.SellerProfile.id,
      shopName: product.SellerProfile.brandName,
      shopSlug: product.SellerProfile.slug,
      pricingTiers: product.PricingTier || [],
    }, quantity)

    setTimeout(() => {
      router.push("/Checkout")
    }, 500)
  }

  return (
    <motion.div 
      initial={false} 
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }} 
      className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg space-y-2 flex-1 w-full"
    >
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              disabled={isLiking}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isLiked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:text-red-500'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaHeart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-blue-600 transition-all cursor-pointer"
            >
              <FaShare className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pb-4 border-b">
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-bold text-base sm:text-lg underline decoration-orange-500">
              {product.avgRating > 0 ? product.avgRating.toFixed(1) : "5.0"}
            </span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block h-4 w-px bg-gray-300" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-gray-900">{product.totalReviews}</span>
              <span className="text-gray-600 ml-1">Đánh giá</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-gray-900">{product.soldCount}</span>
              <span className="text-gray-600 ml-1">Đã bán</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-orange-500">
            {product.basePrice.toLocaleString('vi-VN')}₫
          </span>
          <span className="text-gray-500 text-xs sm:text-sm">/ {product.unit || 'sản phẩm'}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {product.CategoryGlobal?.name && (
            <span className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">Danh mục: <b>{product.CategoryGlobal.name}</b></span>
          )}
          {product.brand && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">Thương hiệu: <b>{product.brand}</b></span>
          )}
          {product.origin && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">Xuất xứ: <b>{product.origin}</b></span>
          )}
        </div>
        
      </div>

      {/* Thông tin chi tiết sản phẩm */}
      <div className="p-2 space-y-4 ">
        {/* Giá theo số lượng */}
        {product.PricingTier && product.PricingTier.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
              <span className="font-semibold text-gray-800 text-base">Giá theo số lượng</span>
            </div>
            <div className="space-y-2">
              {product.PricingTier.sort((a, b) => a.minQty - b.minQty).map((tier, idx) => {
                const isActive = quantity >= tier.minQty && (idx === product.PricingTier!.length - 1 || quantity < product.PricingTier![idx + 1].minQty)
                const discount = ((product.basePrice - tier.price) / product.basePrice * 100).toFixed(0)
                
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105' 
                        : 'bg-white border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                        Mua {tier.minQty}+ =
                      </span>
                      <span className={`text-lg font-bold ${isActive ? 'text-white' : 'text-green-600'}`}>
                        {tier.price.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    
                    {Number(discount) > 0 && (
                      <div className={`text-xs font-semibold px-2 py-1 rounded ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        Tiết kiệm {discount}%
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {quantity >= 1 && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Bạn đang chọn: <span className="font-semibold text-green-600">{quantity} sản phẩm</span></span>
                  <span className="text-gray-600">Giá: <span className="font-bold text-green-600">{currentPrice.toLocaleString('vi-VN')}₫</span></span>
                </div>
                <div className="mt-1 text-sm font-medium text-gray-700">
                  Tổng tiền: <span className="text-lg font-bold text-green-600">{totalPrice.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Thông tin kho hàng và tối thiểu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-700 text-sm">Kho hàng</span>
            </div>
            <span className="text-lg font-bold text-green-800">{product.stock} sản phẩm</span>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="font-semibold text-orange-700 text-sm">Tối thiểu</span>
            </div>
            <span className="text-lg font-bold text-orange-800">{product.minOrderQty} sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-gray-700 font-medium text-sm sm:text-base">Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(product.minOrderQty || 1, quantity - 1))}
              className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
              disabled={quantity <= (product.minOrderQty || 1)}
            >
              <FaMinus className="h-3 w-3 text-gray-600" />
            </motion.button>
            
            <input
              type="number"
              value={quantity}
              min={product.minOrderQty || 1}
              max={product.stock || undefined}
              step={1}
              onChange={(e) => {
                const val = Number(e.target.value)
                const min = product.minOrderQty || 1
                const max = product.stock || Number.MAX_SAFE_INTEGER
                if (Number.isNaN(val)) return
                setQuantity(Math.min(Math.max(val, min), max))
              }}
              className="w-16 sm:w-20 text-center font-semibold text-gray-900 bg-white border-x border-gray-300 outline-none text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
            >
              <FaPlus className="h-3 w-3 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 bg-orange-50 text-orange-600 border-2 border-orange-500 font-bold py-3 sm:py-4 rounded-lg hover:bg-orange-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <FaCartShopping className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" />
          <span className="hidden sm:inline">{product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}</span>
          <span className="sm:hidden">{product.stock > 0 ? 'Thêm giỏ' : 'Hết hàng'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="flex-1 bg-orange-500 text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-orange-600 transition-all shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {product.stock > 0 ? 'Mua ngay' : 'Hết hàng'}
        </motion.button>
      </div>
    </motion.div>
  )
})
