// components/EnhancedRejectDialog.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, X } from 'lucide-react';

interface EnhancedRejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

const commonReasons = [
  'Thiếu giấy tờ pháp lý',
  'Thông tin không chính xác',
  'Logo không đạt chuẩn',
  'Địa chỉ kinh doanh không rõ ràng',
  'Không đủ điều kiện',
];

export default function EnhancedRejectDialog({
  open,
  onOpenChange,
  onConfirm,
}: EnhancedRejectDialogProps) {
  const [reason, setReason] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handlePresetClick = (preset: string) => {
    if (selectedPreset === preset) {
      setSelectedPreset(null);
      setReason('');
    } else {
      setSelectedPreset(preset);
      setReason(preset);
    }
  };

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
      setSelectedPreset(null);
    }
  };

  const handleClose = () => {
    setReason('');
    setSelectedPreset(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-950/30 rounded-lg">
                <AlertCircle className="h-6 w-6 text-rose-600" />
              </div>
              Từ chối đăng ký
            </DialogTitle>
            <DialogDescription className="mt-2 text-base">
              Vui lòng chọn hoặc nhập lý do từ chối để người bán có thể hiểu và khắc phục.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quick Select Reasons */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Lý do phổ biến</Label>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              <AnimatePresence>
                {commonReasons.map((preset, index) => (
                  <motion.div
                    key={preset}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge
                      variant={selectedPreset === preset ? 'default' : 'outline'}
                      className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                        selectedPreset === preset
                          ? 'bg-rose-600 hover:bg-rose-700 border-rose-600'
                          : 'hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300'
                      }`}
                      onClick={() => handlePresetClick(preset)}
                    >
                      {preset}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Custom Reason */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <Label htmlFor="reason" className="text-base font-semibold">
              Lý do chi tiết
            </Label>
            <Textarea
              id="reason"
              placeholder="Nhập lý do từ chối chi tiết hoặc chọn từ các lựa chọn phía trên..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setSelectedPreset(null);
              }}
              rows={5}
              className="resize-none border-2 focus:border-rose-300 transition-colors"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tối thiểu 10 ký tự</span>
              <span className={reason.length < 10 ? 'text-rose-500' : 'text-emerald-500'}>
                {reason.length} ký tự
              </span>
            </div>
          </motion.div>

          {/* Warning Message */}
          {reason.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900 rounded-lg"
            >
              <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-rose-700 dark:text-rose-400">
                <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                <p>
                  Người bán sẽ nhận được thông báo này và không thể sửa đổi hồ sơ.
                  Vui lòng kiểm tra kỹ lý do trước khi xác nhận.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!reason.trim() || reason.length < 10}
            className="gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Xác nhận từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}