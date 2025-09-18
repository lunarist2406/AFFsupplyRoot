"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image } from "antd";
import {
  FaStar,
  FaLeaf,
  FaBoxOpen,
  FaImages,
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
  const [selectedWeight, setSelectedWeight] = useState("5kg");
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="bg-white/5 rounded-2xl border border-white/10 shadow-lg p-8 space-y-6"
      style={{
        padding: "8px",
      }}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-yellow-400 leading-tight">
          Gạo ST25 Chính Hãng
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>

          <div className="flex items-center gap-2 divide-x divide-white/20">
            <span className="text-yellow-300 font-bold text-lg pr-2">4.9</span>
            <span className="text-sm text-white/70 pl-2">(900 đánh giá)</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <FaLeaf className="text-emerald-400" />
          Ưu điểm vượt trội:
        </h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="text-white/90 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <FaBoxOpen className="text-emerald-300" />
          Khối lượng:
        </h3>
        <div className="flex gap-3 flex-wrap">
          {weightOptions.map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedWeight === weight
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
              style={{ padding: "0 12px" }}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-yellow-400/50 bg-white/5 p-3">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Ảnh + thông tin sản phẩm */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                width={64}
                height={64}
                src="/Gao-ST25.png"
                alt="Product"
                className="object-contain bg-gray-50 w-full h-full"
                preview={false}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-white/90 text-lg font-semibold mb-1">
                Gạo ST25 chính hãng
              </div>
              <div className="text-yellow-300 text-lg font-bold">
                45.000 Vnd/kg
              </div>
            </div>
          </div>

          {/* Số lượng */}
          <div className="flex items-center gap-2 md:ml-auto">
            <span className="text-white">Số lượng:</span>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white/20 transition rounded-l-xl"
              >
                <FaMinus className="h-2 w-2 text-white" />
              </button>
              <span className="px-2 py-2 text-white font-semibold bg-white/5 border-x border-white/10 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-white/20 transition rounded-r-xl"
              >
                <FaPlus className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Nút thêm vào giỏ */}
          <div className="flex items-center">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 h-12 rounded-xl flex items-center">
              <FaCartShopping className="h-5 w-5 mr-2" /> Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
