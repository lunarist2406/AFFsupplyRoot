// components/EnhancedSellersTable.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence,Variants  } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  Check,
  X,
  MoreVertical,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { Seller } from '../variable/seller';
import StatusBadge from './StatusBadge';
import RejectDialog from './RejectDialog';
import Image from 'next/image';

interface EnhancedSellersTableProps {
  sellers: Seller[];
  loading?: boolean;
  onViewDetail?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  showActions?: boolean;
}

export default function EnhancedSellersTable({
  sellers,
  loading = false,
  onViewDetail,
  onApprove,
  onReject,
  showActions = false,
}: EnhancedSellersTableProps) {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  const filteredSellers = sellers
    .filter((seller) =>
      seller.brandName.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredSellers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSellers = filteredSellers.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleRejectClick = (id: string) => {
    setSelectedSellerId(id);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedSellerId) {
      onReject?.(selectedSellerId, reason);
    }
    setShowRejectDialog(false);
    setSelectedSellerId(null);
  };



const rowVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo thương hiệu..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 border-2 focus:border-primary transition-colors"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Ngày tạo {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
          <div className="text-sm text-muted-foreground font-medium">
            {filteredSellers.length} kết quả
          </div>
        </div>

        {/* Table */}
<div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white via-card to-muted/20 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 shadow-md overflow-hidden backdrop-blur-sm">
  <Table className="min-w-full text-sm">
    <TableHeader>
      <TableRow className="bg-muted/70 dark:bg-neutral-800/80 backdrop-blur-sm text-muted-foreground uppercase tracking-wide text-xs font-semibold">
        <TableHead className="py-4 px-6 font-bold">Thương hiệu</TableHead>
        <TableHead className="py-4 px-6 font-bold">Công ty</TableHead>
        <TableHead className="py-4 px-6 font-bold">Số điện thoại</TableHead>
        <TableHead className="py-4 px-6 font-bold">Trạng thái</TableHead>
        <TableHead className="py-4 px-6 font-bold text-right">Hành động</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <AnimatePresence mode="wait">
        {paginatedSellers.length > 0 ? (
          paginatedSellers.map((seller, index) => (
            <motion.tr
              key={seller.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              className="hover:bg-primary/5 transition-all duration-200 border-b border-border/50 group"
            >
              <TableCell className="px-6 py-4 font-medium text-foreground">
                <div className="flex items-center gap-3">
                  {seller.logoUrl && (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 250 }}
                    >
                      <Image
                        src={seller.logoUrl}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover border border-border shadow-sm group-hover:shadow-md"
                      />
                    </motion.div>
                  )}
                  <span className="font-semibold">{seller.brandName}</span>
                </div>
              </TableCell>

              <TableCell className="px-6 py-4 text-muted-foreground">
                {seller.companyName}
              </TableCell>

              <TableCell className="px-6 py-4 font-mono text-sm text-muted-foreground">
                {seller.businessPhone}
              </TableCell>

              <TableCell className="px-6 py-4">
                <StatusBadge status={seller.status} />
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-full"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 border border-border/40 shadow-lg rounded-xl"
                  >
                    <DropdownMenuItem
                      onClick={() => onViewDetail?.(seller.id)}
                      className="cursor-pointer flex items-center gap-2 hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>

                    {showActions && seller.status === "PENDING" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => onApprove?.(seller.id)}
                          className="cursor-pointer text-emerald-600 flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Duyệt
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRejectClick(seller.id)}
                          className="cursor-pointer text-destructive flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Từ chối
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <Filter className="h-8 w-8" />
                <p className="font-medium">Không tìm thấy kết quả</p>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </TableBody>
  </Table>
</div>


        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <p className="text-sm text-muted-foreground font-medium">
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Sau
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <RejectDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
}