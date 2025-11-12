import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaChartLine } from 'react-icons/fa';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  gradient: string;
  trend?: string;
}

export function StatsCard({ title, value, icon: Icon, gradient, trend }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className={`relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br ${gradient} p-6 text-white`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">{title}</div>
            <Icon className="text-3xl opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-2">{value}</div>
          {trend && (
            <div className="flex items-center text-sm opacity-90">
              <FaChartLine className="mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}