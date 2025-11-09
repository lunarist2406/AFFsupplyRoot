// components/StatusBadge.tsx

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Seller } from '../variable/seller';

interface StatusBadgeProps {
  status: Seller['status'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    PENDING: {
      label: 'Chờ duyệt',
      className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400',
    },
    APPROVED: {
      label: 'Đã duyệt',
      className: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400',
    },
    REJECTED: {
      label: 'Từ chối',
      className: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400',
    },
  };

  const variant = variants[status];

  return (
    <Badge variant="outline" className={`font-medium ${variant.className}`}>
      {variant.label}
    </Badge>
  );
}