"use client"

import { useState } from "react"
// import { Button } from "@/components/ui/button"
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

interface ProductInfoProps {
  product: ProductDetail
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(product.minOrderQty || 1)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg space-y-5 flex-1 w-full"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all ${
                isLiked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:text-red-500'
              }`}
            >
              <FaHeart className="h-5 w-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-blue-600 transition-all"
            >
              <FaShare className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-bold text-lg underline decoration-orange-500">
              {product.avgRating > 0 ? product.avgRating.toFixed(1) : "5.0"}
            </span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-4 w-4 text-orange-400" />
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="text-sm">
            <span className="font-semibold text-gray-900">{product.totalReviews}</span>
            <span className="text-gray-600 ml-1">Đánh giá</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="text-sm">
            <span className="font-semibold text-gray-900">{product.soldCount}</span>
            <span className="text-gray-600 ml-1">Đã bán</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-orange-500">
            {product.basePrice.toLocaleString('vi-VN')}₫
          </span>
          <span className="text-gray-500 text-sm">/ {product.unit || 'sản phẩm'}</span>
        </div>
        
        {/* Quick facts nổi bật hơn */}
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
        
        {product.PricingTier && product.PricingTier.length > 0 && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">Giá theo số lượng:</span>
            <span className="ml-2 text-gray-600">
              {product.PricingTier.map((tier, idx) => (
                <span key={idx}>
                  {tier.minQty}+ = {tier.price.toLocaleString('vi-VN')}₫{idx < product.PricingTier.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
        <span>
          <span className="text-gray-600">Kho hàng:</span>
          <span className="font-semibold text-gray-900 ml-1">{product.stock} sản phẩm</span>
        </span>
        <span className="text-gray-300">|</span>
        <span>
          <span className="text-gray-600">Tối thiểu:</span>
          <span className="font-semibold text-gray-900 ml-1">{product.minOrderQty} sản phẩm</span>
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium min-w-[80px]">Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(product.minOrderQty || 1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100 transition"
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
              className="w-20 text-center font-semibold text-gray-900 bg-white border-x border-gray-300 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100 transition"
            >
              <FaPlus className="h-3 w-3 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-orange-50 text-orange-600 border-2 border-orange-500 font-bold py-4 rounded-lg hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
        >
          <FaCartShopping className="h-5 w-5" />
          Thêm vào giỏ hàng
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-all shadow-lg"
        >
          Mua ngay
        </motion.button>
      </div>
    </motion.div>
  )
}
