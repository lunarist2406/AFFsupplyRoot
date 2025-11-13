// components/StatsCards.tsx
"use client";

import React from 'react';
import { motion,Variants  } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    approvalRate: number;
    trend: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Tổng đăng ký',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Chờ duyệt',
      value: stats.pending,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
    {
      title: 'Đã duyệt',
      value: stats.approved,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
    },
    {
      title: 'Đã từ chối',
      value: stats.rejected,
      icon: XCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      borderColor: 'border-rose-200 dark:border-rose-800',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

    const cardVariants: Variants = {
    hidden: { 
        y: 20, 
        opacity: 0 
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        type: "spring",
        stiffness: 100,
        damping: 15, // giảm dao động
        mass: 0.8,   // giúp chuyển động tự nhiên hơn
        },
    },
    };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={index} variants={cardVariants}>
            <Card className={`p-6 border-2 ${card.borderColor} hover:shadow-lg transition-shadow duration-300`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <motion.p
                    className="text-3xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                  >
                    {card.value}
                  </motion.p>
                  {index === 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      {stats.trend >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-rose-600" />
                      )}
                      <span className={stats.trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {Math.abs(stats.trend)}% so với tháng trước
                      </span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}