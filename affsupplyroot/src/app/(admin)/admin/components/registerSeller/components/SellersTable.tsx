// components/SellersTable.tsx

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Seller } from '../variable/seller';
import StatusBadge from './StatusBadge';
import RejectDialog from './RejectDialog';

interface SellersTableProps {
  sellers: Seller[];
  loading?: boolean;
  onViewDetail?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  showActions?: boolean;
}

export default function SellersTable({
  sellers,
  loading = false,
  onViewDetail,
  onApprove,
  onReject,
  showActions = false,
}: SellersTableProps) {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const pageSize = 10;

  const filteredSellers = sellers.filter((seller) =>
    seller.brandName.toLowerCase().includes(filter.toLowerCase())
  );

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo thương hiệu..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredSellers.length} kết quả
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Thương hiệu</TableHead>
                <TableHead className="font-semibold">Công ty</TableHead>
                <TableHead className="font-semibold">Số điện thoại</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold text-right">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSellers.length > 0 ? (
                paginatedSellers.map((seller) => (
                  <TableRow key={seller.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {seller.logoUrl && (
                          <img
                            src={seller.logoUrl}
                            alt=""
                            className="h-10 w-10 rounded-md object-cover border"
                          />
                        )}
                        <span>{seller.brandName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{seller.companyName}</TableCell>
                    <TableCell>{seller.businessPhone}</TableCell>
                    <TableCell>
                      <StatusBadge status={seller.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewDetail?.(seller.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          {showActions && seller.status === 'PENDING' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onApprove?.(seller.id)}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Duyệt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRejectClick(seller.id)}
                                className="text-destructive"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Từ chối
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Filter className="h-8 w-8" />
                      <p>Không tìm thấy kết quả</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <RejectDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
}