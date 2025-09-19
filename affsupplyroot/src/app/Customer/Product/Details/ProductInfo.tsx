"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaLeaf,
  FaBoxOpen,
  FaMinus,
  FaPlus,
  FaCartShopping,
} from "react-icons/fa6";

const weightOptions = ["1kg", "5kg", "10kg", "20kg", "50kg"];
const features = [
  "Thơm tự nhiên – mùi lá dứa dịu nhẹ.",
  "Dẻo, mềm - ăn nguội vẫn ngon.",
  "Chuẩn quốc tế – top 1 gạo ngon thế giới 2019.",
];

export function ProductInfo() {
  const [selectedWeight, setSelectedWeight] = useState("10kg");
  const [quantity, setQuantity] = useState(1);

  const calculateTotal = () => {
    return 45000 * quantity;
  };

  return (
    <div className="h-full bg-white/5 rounded-2xl border border-white/10 shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-5 flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-primary leading-tight">
          Gạo ST25 Chính Hãng
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-primary" />
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 divide-x divide-white/20">
            <span className="text-yellow-primary font-bold text-lg sm:text-xl pr-2 sm:pr-3">4.9</span>
            <span className="text-xs sm:text-sm text-white/70 pl-2 sm:pl-3">(900 đánh giá)</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-base sm:text-lg flex items-center gap-2">
          <FaLeaf className="text-green-primary" />
          Ưu điểm vượt trội:
        </h3>
        
        <ul className="space-y-2" style={{margin:'0'}}>
          {features.map((feature, index) => (
            <li key={index} className="text-white/90 flex items-start gap-3">
              <div className="w-2 h-2 bg-green-primary rounded-full flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weight Selection */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-base sm:text-lg flex items-center gap-2">
          <FaBoxOpen className="text-green-secondary" />
          Khối lượng:
        </h3>
        
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {weightOptions.map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base cursor-pointer ${
                selectedWeight === weight
                  ? "bg-green-primary text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      <div className=" rounded-xl border border-yellow-primary bg-white/5 p-3 sm:p-4 overflow-hidden">
        <div className="space-y-2 mb-3 sm:mb-4">
          <div className="space-y-1 text-sm sm:text-base">
            <div className="flex justify-between items-center">
              <span className="text-white">Trọng lượng:</span>
              <span className="text-yellow-primary font-semibold">{selectedWeight} × {quantity} = {parseInt(selectedWeight) * quantity}kg</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white">Đơn giá:</span>
              <span className="text-yellow-primary font-semibold">45.000 VND/kg</span>
            </div>
            
            <div className="flex justify-between items-center text-base sm:text-lg font-bold pt-2 border-t border-white/20">
              <span className="text-white">Tổng tiền:</span>
              <span className="text-yellow-primary text-lg sm:text-xl">
                {calculateTotal().toLocaleString('vi-VN')} VND
              </span>
            </div>
          </div>
        </div>

        {/* Action Row - Clean & Focused */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full min-w-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="text-white text-sm sm:text-base font-medium whitespace-nowrap">Số lượng:</span>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 sm:p-3 hover:bg-white/20 transition rounded-l-lg cursor-pointer"
                disabled={quantity <= 1}
              >
                <FaMinus className="h-3 w-3 text-white" />
              </button>
              
              <span className="px-3 sm:px-4 py-2 sm:py-3 text-white font-bold bg-white/5 border-x border-white/10 min-w-[50px] text-center text-sm sm:text-base">
                {quantity}
              </span>
              
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 sm:p-3 hover:bg-white/20 transition rounded-r-lg cursor-pointer"
              >
                <FaPlus className="h-3 w-3 text-white" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button - Prominent */}
          <Button className="w-full sm:flex-1 bg-green-primary hover:bg-green-secondary text-white font-bold px-4 sm:px-6 py-3 sm:py-4 h-11 sm:h-12 rounded-lg flex items-center justify-center cursor-pointer text-sm sm:text-base shadow-lg hover:shadow-xl transition-all max-w-full">
            <FaCartShopping className="h-4 w-4 mr-2" />
            <span>Thanh toán</span>
          </Button>
        </div>
      </div>
    </div>
  );
}