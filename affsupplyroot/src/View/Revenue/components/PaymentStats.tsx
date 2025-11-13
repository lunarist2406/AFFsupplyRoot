/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services/payment";
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaCreditCard,
  FaChartLine 
} from "react-icons/fa";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from "recharts";

export function PaymentStats() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions().then((res) => {
      if (res.success) {
        setPayments(res.data.data);
        setLoading(false);
      }
    });
  }, []);

  const success = payments.filter((p) => p.status === "SUCCESS").length;
  const failed = payments.filter((p) => p.status === "FAILED").length;
  const pending = payments.filter((p) => p.status === "PENDING").length;

  const successRate = payments.length > 0 
    ? ((success / payments.length) * 100).toFixed(1) 
    : "0";

  const chartData = [
    { name: "Thành công", value: success, color: "#10b981" },
    { name: "Thất bại", value: failed, color: "#ef4444" },
    { name: "Đang xử lý", value: pending, color: "#f59e0b" }
  ];

  const statItems = [
    {
      icon: FaCheckCircle,
      label: "Thành công",
      value: success,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: FaTimesCircle,
      label: "Thất bại",
      value: failed,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: FaClock,
      label: "Đang xử lý",
      value: pending,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
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
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaCreditCard className="text-lg text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Giao dịch thanh toán
            </h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full border border-green-200">
            <FaChartLine className="text-green-600 text-xs" />
            <span className="text-xs font-semibold text-green-700">
              {successRate}%
            </span>
          </div>
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
        {payments.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-600">
                Phân bổ trạng thái
              </h4>
              <span className="text-xs text-gray-500">
                {payments.length} giao dịch
              </span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ percent }) => 
                    `${(percent as number * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '12px',
                    padding: '6px 10px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={24}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: '11px',
                    paddingTop: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}