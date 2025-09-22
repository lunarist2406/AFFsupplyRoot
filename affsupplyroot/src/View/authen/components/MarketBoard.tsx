"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaIndustry, FaUserCheck } from "react-icons/fa";

const products = [
  { code: "BD01", name: "Bưởi Diễn", type: "Trái cây", region: "Hà Nội", price: 70, change: "+2.0 (+2.94%)", up: true },
  { code: "CV02", name: "Cam Vinh", type: "Trái cây", region: "Nghệ An", price: 55, change: "-2.5 (-4.35%)", up: false },
  { code: "CFBM03", name: "Cà phê Buôn Ma Thuột", type: "Cà phê", region: "Tây Nguyên", price: 90, change: "+3.0 (+3.45%)", up: true },
  { code: "CFS04", name: "Cà phê Sơn La", type: "Cà phê", region: "Tây Bắc", price: 85, change: "-0.5 (-0.58%)", up: false },
  { code: "GNH05", name: "Gạo Nàng Hương", type: "Gạo", region: "ĐBSCL", price: 18, change: "+0.8 (+4.65%)", up: true },
  { code: "GST25", name: "Gạo ST25", type: "Gạo", region: "Sóc Trăng", price: 35, change: "-1.5 (-4.11%)", up: false },
  { code: "GTX07", name: "Gạo Tám Xoan", type: "Gạo", region: "Nam Định", price: 30, change: "+1.5 (+5.26%)", up: true },
  { code: "HDBP08", name: "Hạt điều Bình Phước", type: "Hạt điều", region: "Đông Nam Bộ", price: 280, change: "+5.0 (+1.82%)", up: true },
  { code: "HDDL09", name: "Hạt điều Đắk Lắk", type: "Hạt điều", region: "Tây Nguyên", price: 270, change: "-3.0 (-1.10%)", up: false },
  { code: "KLT10", name: "Khoai lang tím Vĩnh Long", type: "Rau củ", region: "ĐBSCL", price: 25, change: "+1.5 (+6.38%)", up: true },
];

const stats = [
  { title: "NGƯỜI THAM GIA", value: "1,500", desc: "Người tham gia", icon: <FaUsers className="text-yellow-400 text-xl" /> },
  { title: "GIAO DỊCH HÔM NAY", value: "200", desc: "Đơn Hàng", icon: <FaShoppingCart className="text-yellow-400 text-xl" /> },
  { title: "NGƯỜI SẢN XUẤT", value: "500", desc: "Nhà Sản Xuất", icon: <FaIndustry className="text-yellow-400 text-xl" /> },
  { title: "NGƯỜI ĐÃ MUA", value: "1000", desc: "Khách Hàng", icon: <FaUserCheck className="text-yellow-400 text-xl" /> },
];

export default function MarketBoard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl flex flex-col">
        {/* Stats trên bảng */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="bg-[#1c2a23] rounded-lg p-3 text-center shadow-md"
            >
              <div className="flex justify-center mb-1 text-lg">{s.icon}</div>
              <h3 className="font-semibold text-yellow-400 text-sm">{s.title}</h3>
              <p className="text-white text-base font-bold">{s.value}</p>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bảng giá */}
        <div className="bg-[#1c2a23] rounded-xl p-4 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-yellow-primary">BẢNG GIÁ NÔNG SẢN VIỆT NAM</h2>
            <p className="text-xs text-gray-400">Cập nhật: 00:36:38 3/7/2025</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-yellow-primary border-b border-gray-600">
                <th className="text-left py-2">Mã</th>
                <th className="text-left py-2">Tên sản phẩm</th>
                <th className="text-left py-2">Loại</th>
                <th className="text-left py-2">Vùng miền</th>
                <th className="text-left py-2">Giá</th>
                <th className="text-left py-2">Biến động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-700 last:border-none"
                >
                  <td className="py-2 text-yellow-300">{p.code}</td>
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.type}</td>
                  <td className="py-2">{p.region}</td>
                  <td className="py-2">{p.price}</td>
                  <td className={`py-2 ${p.up ? "text-green-400" : "text-red-400"}`}>{p.change}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
