// components/SellerDetailDialog.tsx

import React, { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Building2,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ImageIcon,
  Check,
  X,
} from 'lucide-react';
import { Seller } from '../variable/seller';
import StatusBadge from './StatusBadge';
import RejectDialog from './RejectDialog';
import Image from 'next/image';


interface SellerDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: Seller;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  showActions?: boolean;
}

export default function SellerDetailDialog({
  open,
  onOpenChange,
  seller,
  onApprove,
  onReject,
  showActions = false,
}: SellerDetailDialogProps) {
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Chi tiết người bán
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đăng ký người bán
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Trạng thái:
                </span>
                <StatusBadge status={seller.status} />
              </div>

              <Separator />

              {/* Info Grid */}
              <div className="grid gap-4">
                {infoItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium break-words">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              {seller.description && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Mô tả</Label>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {seller.description}
                  </p>
                </div>
              )}

              {/* Logo */}
              {seller.logoUrl && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Logo</Label>
                  </div>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-muted">
                    <Image
                      src={seller.logoUrl}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      height = {40}
                      width = {40}
                    />
                  </div>
                </div>
              )}

              {/* Document */}
              {seller.documentUrl && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Tài liệu</Label>
                  </div>
                  <a
                    href={seller.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Xem tài liệu đính kèm
                  </a>
                </div>
              )}

              {/* Rejection Reason */}
              {seller.status === 'REJECTED' && seller.rejectionReason && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-rose-600">
                    Lý do từ chối
                  </Label>
                  <p className="text-sm text-muted-foreground bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg border border-rose-200 dark:border-rose-900">
                    {seller.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {showActions && seller.status === 'PENDING' && (
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Đóng
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowRejectDialog(true)}
              >
                <X className="h-4 w-4 mr-2" />
                Từ chối
              </Button>
              <Button onClick={handleApprove}>
                <Check className="h-4 w-4 mr-2" />
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