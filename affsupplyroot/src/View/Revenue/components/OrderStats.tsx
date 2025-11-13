/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';
import { getAllOrdersForAdmin } from '@/services/order';

interface Order {
  status: string;
  [key: string]: any;
}

export function OrderStats() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrdersForAdmin().then((res) => {
      if (res.success) {
        setOrders(res.data);
        setLoading(false);
      }
    });
  }, []);

  const confirmed = orders.filter(o => o.status === 'CONFIRMED').length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const cancelled = orders.filter(o => o.status === 'CANCELLED').length;

  const barData = [
    { status: 'Xác nhận', count: confirmed, fill: '#10b981' },
    { status: 'Chờ xử lý', count: pending, fill: '#f59e0b' },
    { status: 'Đã hủy', count: cancelled, fill: '#ef4444' }
  ];

  const statItems = [
    {
      icon: FaCheckCircle,
      label: "Xác nhận",
      value: confirmed,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: FaClock,
      label: "Chờ xử lý",
      value: pending,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: FaTimesCircle,
      label: "Đã hủy",
      value: cancelled,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-500 text-sm">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200">
        {/* Header - Compact */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaShoppingCart className="text-lg text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Thống kê đơn hàng</h3>
          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {orders.length} đơn
          </span>
        </div>

        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.borderColor} border rounded-lg p-3 text-center`}
            >
              <item.icon className={`${item.color} text-xl mx-auto mb-1`} />
              <div className={`text-xl font-bold ${item.color}`}>
                {item.value}
              </div>
              <div className="text-xs text-gray-600 font-medium mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart - Compact */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-600 mb-2">Biểu đồ phân bổ</h4>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="status" 
                tick={{ fontSize: 11 }} 
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11 }} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}