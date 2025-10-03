"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaBoxOpen,
  FaMinus,
  FaPlus,
  FaCartShopping,
  FaHeart,
  FaShare,
  FaTruck,
  FaShield,
  FaAward,
} from "react-icons/fa6";

const weightOptions = ["1kg", "5kg", "10kg", "20kg", "50kg"];
const features = [
  "Thơm tự nhiên – mùi lá dứa dịu nhẹ",
  "Dẻo, mềm - ăn nguội vẫn ngon",
  "Chuẩn quốc tế – top 1 gạo ngon thế giới 2019",
  "Đóng gói kín, bảo quản lâu dài",
  "Nguồn gốc rõ ràng, an toàn tuyệt đối"
];

interface ProductInfoProps {
  product: {
    id: string
    name: string
    category: string
    price: number
    rating: number
    reviews: number
    description: string
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedWeight, setSelectedWeight] = useState("10kg");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const calculateTotal = () => {
    const weightInKg = parseInt(selectedWeight);
    const price = product?.price || 45000;
    return price * weightInKg * quantity;
  };

  return (
    <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200/50 shadow-lg space-y-6 flex-1 w-full">
      {/* Header với title và rating */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 leading-tight mb-2">
              {product?.name || "Gạo ST25 Chính Hãng"}
            </h1>
            <p className="text-amber-700 text-sm font-medium">{product?.description || "The World's Best Rice 2019"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-100 text-red-500' 
                  : 'bg-amber-100 text-amber-700 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <FaHeart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-amber-100 text-amber-700 hover:text-green-700 hover:bg-green-50 transition-all duration-300">
              <FaShare className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-5 w-5 text-yellow-500" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 font-bold text-xl">{product?.rating || 4.9}</span>
            <span className="text-amber-600 text-sm">({product?.reviews || 900} đánh giá)</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-amber-900 font-bold text-lg flex items-center gap-2">
          <FaAward className="text-amber-600" />
          Ưu điểm vượt trội
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
              <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0 mt-2" />
              <span className="text-amber-800 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weight selection */}
      <div className="space-y-4">
        <h3 className="text-amber-900 font-bold text-lg flex items-center gap-2">
          <FaBoxOpen className="text-green-600" />
          Chọn khối lượng
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {weightOptions.map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-4 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                selectedWeight === weight
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg ring-2 ring-green-400"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200"
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Price và quantity */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-800 font-medium">Đơn giá:</span>
            <span className="text-green-700 font-bold text-lg">{(product?.price || 45000).toLocaleString('vi-VN')}₫/kg</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-amber-800 font-medium">Khối lượng:</span>
            <span className="text-amber-900 font-semibold">{selectedWeight} × {quantity} = {parseInt(selectedWeight) * quantity}kg</span>
          </div>
          
          <div className="border-t-2 border-amber-300 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-amber-900 font-bold text-lg">Tổng tiền:</span>
              <span className="text-green-700 font-bold text-2xl">
                {calculateTotal().toLocaleString('vi-VN')}₫
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-6">
          <div className="flex items-center gap-3">
            <span className="text-amber-800 font-semibold">Số lượng:</span>
            <div className="flex items-center bg-white border-2 border-amber-300 rounded-xl shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-amber-50 transition rounded-l-xl"
                disabled={quantity <= 1}
              >
                <FaMinus className="h-4 w-4 text-amber-700" />
              </button>
              
              <span className="px-4 py-3 text-amber-900 font-bold bg-amber-50 border-x-2 border-amber-300 min-w-[60px] text-center">
                {quantity}
              </span>
              
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-amber-50 transition rounded-r-xl"
              >
                <FaPlus className="h-4 w-4 text-amber-700" />
              </button>
            </div>
          </div>

          <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-4 h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
            <FaCartShopping className="h-5 w-5" />
            <span>Thêm vào giỏ hàng</span>
          </Button>
        </div>
      </div>

      {/* Shipping info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
          <FaTruck className="h-6 w-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-amber-900 text-sm font-bold">Miễn phí vận chuyển</p>
            <p className="text-amber-700 text-xs">Đơn hàng từ 500k</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
          <FaShield className="h-6 w-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-amber-900 text-sm font-bold">Bảo hành chính hãng</p>
            <p className="text-amber-700 text-xs">1 năm</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
          <FaAward className="h-6 w-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-amber-900 text-sm font-bold">Chất lượng cao</p>
            <p className="text-amber-700 text-xs">Đã kiểm định</p>
          </div>
        </div>
      </div>
    </div>
  );
}

