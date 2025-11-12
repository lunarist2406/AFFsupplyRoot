/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { getAllOrdersForAdmin } from '@/services/order';
import { getAllTransactions } from '@/services/payment';
import { StatsCard } from './components/StatsCard';
import { OrderStats } from './components/OrderStats';
import { PaymentStats } from './components/PaymentStats';

export default function AdminRevenue() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await getAllOrdersForAdmin();
        const paymentsRes = await getAllTransactions();

        const totalRevenue = paymentsRes.data.data
          .filter((t: any) => t.status === 'SUCCESS')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        setStats({
          totalRevenue,
          totalOrders: ordersRes.data.length,
          totalTransactions: paymentsRes.data.total,
        });
      } catch (err) {
        console.error('Error loading admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-950 via-gray-600 to-green-950 p-4 md:px-25 font-manuale">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-secondary mb-1">
          Dashboard Doanh Thu
        </h1>
        <p className="text-sm text-yellow-primary">
          Tổng quan về doanh thu và đơn hàng của hệ thống
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-yellow-primary">Đang tải dữ liệu...</div>
        </div>
      ) : (
        <>
          {/* Stats Cards - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard
              title="Doanh thu tổng"
              value={`${stats.totalRevenue.toLocaleString('vi-VN')}₫`}
              icon={FaMoneyBillWave}
              gradient="from-green-500 via-emerald-500 to-teal-600"
              trend="+12.5% so với tháng trước"
            />
            <StatsCard
              title="Tổng đơn hàng"
              value={stats.totalOrders.toLocaleString('vi-VN')}
              icon={FaShoppingCart}
              gradient="from-blue-500 via-indigo-500 to-purple-600"
              trend="+8.3% so với tháng trước"
            />
            <StatsCard
              title="Tổng giao dịch"
              value={stats.totalTransactions.toLocaleString('vi-VN')}
              icon={FaCreditCard}
              gradient="from-orange-400 via-pink-500 to-red-500"
              trend="+15.7% so với tháng trước"
            />
          </div>

          {/* Order & Payment Stats - Compact Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <OrderStats />
            <PaymentStats />
          </div>
        </>
      )}
    </div>
  );
}