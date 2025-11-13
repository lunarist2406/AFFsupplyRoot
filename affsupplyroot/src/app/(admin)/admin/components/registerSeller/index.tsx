// app/controlling-seller/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion,Variants,easeInOut  } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useRegisterSeller from "@/hooks/useRegisterSeller";
import { Seller } from "./variable/seller";
import StatsCards from "./components/StatsCards";
import ChartSection from "./components/ChartSection";
import EnhancedSellersTable from "./components/EnhancedSellersTable";
import EnhancedSellerDetailDialog from "./components/EnhancedSellerDetailDialog";

type SellerStatus = "PENDING" | "APPROVED" | "REJECTED";

export default function ControllingSeller() {
  const {
    fetchSellers,
    fetchSellerDetail,
    approveSeller,
    rejectSeller,
    loading,
  } = useRegisterSeller();

  const [status, setStatus] = useState<SellerStatus>("PENDING");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  // Fetch seller list theo status
  const loadSellers = useCallback(async () => {
    try {
      const data = await fetchSellers(status);
      setSellers(data || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast.error("Không thể tải danh sách người bán.");
    }
  }, [fetchSellers, status]);

  useEffect(() => {
    loadSellers();
  }, [loadSellers]);

  // Calculate statistics
  const stats = useMemo(() => {
    const allSellers = sellers;
    const pending = allSellers.filter((s) => s.status === "PENDING").length;
    const approved = allSellers.filter((s) => s.status === "APPROVED").length;
    const rejected = allSellers.filter((s) => s.status === "REJECTED").length;
    const total = allSellers.length;
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate,
      trend: 12, // Mock data - replace with real calculation
    };
  }, [sellers]);

  // Generate monthly data for charts
  const monthlyData = useMemo(() => {
    // Mock data - replace with real data from API
    return [
      { month: "T7", pending: 8, approved: 15, rejected: 3 },
      { month: "T8", pending: 12, approved: 20, rejected: 5 },
      { month: "T9", pending: 10, approved: 25, rejected: 4 },
      { month: "T10", pending: 15, approved: 30, rejected: 6 },
      { month: "T11", pending: stats.pending, approved: stats.approved, rejected: stats.rejected },
    ];
  }, [stats]);

  const statusData = useMemo(() => {
    return [
      { name: "Chờ duyệt", value: stats.pending, color: "#f59e0b" },
      { name: "Đã duyệt", value: stats.approved, color: "#10b981" },
      { name: "Từ chối", value: stats.rejected, color: "#ef4444" },
    ];
  }, [stats]);

  const handleViewDetail = async (id: string) => {
    try {
      const detail = await fetchSellerDetail(id);
      if (detail) {
        setSelectedSeller(detail);
        setOpenDetail(true);
      }
    } catch (error) {
      console.error("Error fetching seller detail:", error);
      toast.error("Không thể tải chi tiết người bán.");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveSeller(id);
      toast.success("✅ Đã duyệt người bán thành công!");
      loadSellers();
    } catch (error) {
      console.error("Error approving seller:", error);
      toast.error("Không thể duyệt người bán.");
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      await rejectSeller(id, reason);
      toast.info("🚫 Đã từ chối hồ sơ người bán.");
      loadSellers();
    } catch (error) {
      console.error("Error rejecting seller:", error);
      toast.error("Không thể từ chối người bán.");
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  return (
<div className="min-h-screen bg-gradient-to-r from-green-950 via-gray-800 to-green-950 dark:from-green-950 dark:via-gray-900 dark:to-yellow-950 p-6 font-manuale text-[#E7C877]">
  <div className="max-w-7xl mx-auto space-y-6">
    {/* Header */}
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="bg-emerald-950/40 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-800/40 p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] via-yellow-400 to-[#E7C877] bg-clip-text text-transparent mb-2">
            Quản Lý Đăng Ký Người Bán
          </h1>
          <p className="text-gray-300 text-lg">
            Quản lý và phê duyệt các đăng ký người bán trên hệ thống
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-yellow-900/40 to-yellow-800/20 rounded-lg border border-yellow-700/40"
        >
          <p className="text-sm text-gray-400">Tỷ lệ duyệt</p>
          <p className="text-2xl font-bold text-[#FFD700]">
            {stats.approvalRate}%
          </p>
        </motion.div>
      </div>
    </motion.div>

    {/* Stats Cards */}
    <StatsCards stats={stats} />

    {/* Charts */}
    <ChartSection monthlyData={monthlyData} statusData={statusData} />

    {/* Main Content */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-emerald-950/40 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-800/40 p-8"
    >
      <Tabs value={status} onValueChange={(v) => setStatus(v as SellerStatus)}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto h-12 p-1 bg-yellow-950/30 border border-yellow-800/40 rounded-lg">
          <TabsTrigger
            value="PENDING"
            className="gap-2 text-yellow-300 data-[state=active]:bg-yellow-900/60 data-[state=active]:text-yellow-100 transition-colors"
          >
            <span className="font-semibold">Chờ duyệt</span>
            {!loading && (
              <Badge
                variant="secondary"
                className="ml-1 bg-yellow-800/50 text-yellow-200"
              >
                {sellers.filter((s) => s.status === "PENDING").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="APPROVED"
            className="gap-2 text-emerald-300 data-[state=active]:bg-emerald-900/60 data-[state=active]:text-emerald-100 transition-colors"
          >
            <span className="font-semibold">Đã duyệt</span>
            {!loading && (
              <Badge
                variant="secondary"
                className="ml-1 bg-emerald-800/50 text-emerald-200"
              >
                {sellers.filter((s) => s.status === 'APPROVED').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="REJECTED"
            className="gap-2 text-rose-300 data-[state=active]:bg-rose-900/60 data-[state=active]:text-rose-100 transition-colors"
          >
            <span className="font-semibold">Đã từ chối</span>
            {!loading && (
              <Badge
                variant="secondary"
                className="ml-1 bg-rose-800/50 text-rose-200"
              >
                {sellers.filter((s) => s.status === 'REJECTED').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={status} className="mt-6">
          <EnhancedSellersTable
            sellers={sellers}
            loading={loading}
            onViewDetail={handleViewDetail}
            onApprove={handleApprove}
            onReject={handleReject}
            showActions={status === 'PENDING'}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  </div>

  {selectedSeller && (
    <EnhancedSellerDetailDialog
      open={openDetail}
      onOpenChange={setOpenDetail}
      seller={selectedSeller}
      onApprove={handleApprove}
      onReject={handleReject}
      showActions={status === 'PENDING'}
    />
  )}
</div>

  );
}