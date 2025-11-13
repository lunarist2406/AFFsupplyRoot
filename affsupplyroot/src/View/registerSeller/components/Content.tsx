"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Store, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "Quản lý cửa hàng",
    description: "Kiểm soát toàn bộ thông tin và hoạt động"
  },
  {
    icon: BarChart3,
    title: "Theo dõi doanh thu",
    description: "Báo cáo chi tiết và phân tích thời gian thực"
  },
  {
    icon: TrendingUp,
    title: "Tăng trưởng bền vững",
    description: "Công cụ hỗ trợ phát triển kinh doanh"
  }
];

export default function Content() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl space-y-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 border-yellow-400/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              Cơ hội kinh doanh
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent leading-tight mb-6"
          >
            Trở thành đối tác của chúng tôi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-300 leading-relaxed mb-8"
          >
            Hãy cùng chúng tôi mở rộng thương hiệu và mang đến sản phẩm tốt nhất
            cho khách hàng. Việc đăng ký seller giúp bạn có thể quản lý cửa hàng,
            sản phẩm, đơn hàng và theo dõi doanh thu một cách dễ dàng.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 gap-4"
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 backdrop-blur-sm group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors">
                  <FeatureIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="relative"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"
            />
            <p className="relative text-gray-300 italic font-medium text-lg">
              Bắt đầu hôm nay – thành công ngày mai.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}