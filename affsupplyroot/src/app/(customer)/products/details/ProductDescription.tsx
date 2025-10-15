"use client"

import { ProductDetail } from "@/types/product"
import { motion } from "framer-motion"
import { FaAward, FaBoxOpen, FaCertificate, FaLeaf } from "react-icons/fa6"

interface ProductDescriptionProps {
  product: ProductDetail
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b">
          <FaBoxOpen className="text-orange-500" />
          Chi Tiết Sản Phẩm
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {product.CategoryGlobal && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Danh mục</span>
              <span className="text-gray-900 font-medium">{product.CategoryGlobal.name}</span>
            </div>
          )}
          {product.brand && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Thương hiệu</span>
              <span className="text-gray-900 font-medium">{product.brand}</span>
            </div>
          )}
          {product.origin && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Xuất xứ</span>
              <span className="text-gray-900 font-medium">{product.origin}</span>
            </div>
          )}
          {product.unit && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Đơn vị</span>
              <span className="text-gray-900 font-medium">{product.unit}</span>
            </div>
          )}
          {product.region && product.region.length > 0 && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Vùng trồng</span>
              <span className="text-gray-900 font-medium">{product.region.join(', ')}</span>
            </div>
          )}
          {product.condition && product.condition.length > 0 && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Tình trạng</span>
              <span className="text-gray-900 font-medium">{product.condition.join(', ')}</span>
            </div>
          )}
          {product.season && product.season.length > 0 && (
            <div className="flex py-3 border-b border-gray-100">
              <span className="text-gray-600 min-w-[140px]">Mùa vụ</span>
              <span className="text-gray-900 font-medium">{product.season.join(', ')}</span>
            </div>
          )}
          {product.certifications && (
            <div className="flex py-3 border-b border-gray-100 col-span-2">
              <span className="text-gray-600 min-w-[140px] flex items-center gap-2">
                <FaCertificate className="text-green-600" />
                Chứng nhận
              </span>
              <span className="text-gray-900 font-medium">{product.certifications}</span>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b">
            <FaAward className="text-orange-500" />
            Mô Tả Sản Phẩm
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        </div>
      )}

      {(product.storageInstructions || product.usageInstructions) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.storageInstructions && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaLeaf className="text-blue-600" />
                Hướng Dẫn Bảo Quản
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{product.storageInstructions}</p>
            </div>
          )}
          {product.usageInstructions && (
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaAward className="text-green-600" />
                Hướng Dẫn Sử Dụng
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{product.usageInstructions}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

