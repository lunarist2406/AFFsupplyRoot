// components/EnhancedSellerDetailDialog.tsx
"use client";

import React, { useState } from 'react';
import { motion,Variants} from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Building2,
  Phone,
  MapPin,
  Calendar,
  Check,
  X,
} from 'lucide-react';
import { Seller } from '../variable/seller';
import StatusBadge from './StatusBadge';
import RejectDialog from './RejectDialog';

interface EnhancedSellerDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: Seller;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  showActions?: boolean;
}

export default function EnhancedSellerDetailDialog({
  open,
  onOpenChange,
  seller,
  onApprove,
  onReject,
  showActions = false,
}: EnhancedSellerDetailDialogProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleApprove = () => {
    onApprove?.(seller.id);
    onOpenChange(false);
  };

  const handleRejectConfirm = (reason: string) => {
    onReject?.(seller.id, reason);
    setShowRejectDialog(false);
    onOpenChange(false);
  };

  const infoItems = [
    { icon: Building2, label: 'Thương hiệu', value: seller.brandName },
    { icon: Building2, label: 'Công ty', value: seller.companyName },
    { icon: Phone, label: 'Số điện thoại', value: seller.businessPhone },
    { icon: MapPin, label: 'Địa chỉ', value: seller.businessAddress },
    {
      icon: Calendar,
      label: 'Ngày tạo',
      value: new Date(seller.createdAt).toLocaleString('vi-VN'),
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


    const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
        type: "spring",
        stiffness: 100,
        damping: 15, // thêm damping cho mượt hơn (optional)
        mass: 0.8,   // giúp hiệu ứng nhẹ hơn (optional)
        },
    },
    };


  return (
    <>
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-b from-green-950 via-gray-800 to-green-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-primary/30 shadow-2xl rounded-2xl text-foreground">
    <DialogHeader>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-yellow-400">
          <div className="p-2 bg-yellow-400/10 rounded-lg">
            <Building2 className="h-6 w-6 text-yellow-400" />
          </div>
          Chi tiết người bán
        </DialogTitle>
        <DialogDescription className="mt-2 text-gray-300">
          Thông tin chi tiết về đăng ký người bán
        </DialogDescription>
      </motion.div>
    </DialogHeader>

    {/* phần scroll mượt */}
    <ScrollArea className="flex-1 pr-4 overflow-y-auto scroll-smooth">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 py-4"
      >
        {/* Status */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-yellow-400/20"
        >
          <span className="text-sm font-semibold text-yellow-primary">
            Trạng thái hiện tại:
          </span>
          <StatusBadge status={seller.status} />
        </motion.div>

        <Separator className="bg-yellow-400/20" />

        {/* Info Grid */}
        <motion.div variants={itemVariants} className="grid gap-3">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-gray-800/40 to-gray-700/20 hover:from-gray-700/60 hover:to-gray-600/30 transition-all duration-300 border border-transparent hover:border-yellow-400/30"
              >
                <div className="p-2 bg-yellow-400/10 rounded-lg flex-shrink-0">
                  <Icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-yellow-300/70 mb-1 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium break-words text-gray-100">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* phần mô tả, logo, tài liệu, lý do từ chối giữ nguyên */}
        {/* chỉ cần thêm tone nền đồng bộ */}
      </motion.div>
    </ScrollArea>

    {showActions && seller.status === 'PENDING' && (
      <DialogFooter className="gap-2 pt-4 border-t border-yellow-400/20">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="gap-2 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
        >
          Đóng
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowRejectDialog(true)}
          className="gap-2 bg-rose-700 hover:bg-rose-600"
        >
          <X className="h-4 w-4" />
          Từ chối
        </Button>
        <Button
          onClick={handleApprove}
          className="gap-2 bg-emerald-700 hover:bg-emerald-600 text-white"
        >
          <Check className="h-4 w-4" />
          Duyệt
        </Button>
      </DialogFooter>
    )}
  </DialogContent>
</Dialog>


      <RejectDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
}