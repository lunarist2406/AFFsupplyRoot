// app/controlling-seller/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SellersTable from "./components/SellersTable";
import SellerDetailDialog from "./components/SellerDetailModal";
import useRegisterSeller, { Seller } from "@/hooks/useRegisterSeller";

export default function ControllingSeller() {
  const {
    fetchSellers,
    fetchSellerDetail,
    approveSeller,
    rejectSeller,
    loading,
  } = useRegisterSeller();

  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  // Fetch seller list theo status
  const loadSellers = async () => {
    try {
      const data = await fetchSellers(status);
      setSellers(data || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast.error("Không thể tải danh sách người bán.");
    }
  };

  useEffect(() => {
    loadSellers();
  }, [status]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Quản Lý Đăng Ký Người Bán
            </h1>
            <p className="text-muted-foreground mt-2">
              Quản lý và phê duyệt các đăng ký người bán trên hệ thống
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="PENDING" className="gap-2">
                Chờ duyệt
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {sellers.filter((s) => s.status === "PENDING").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="APPROVED" className="gap-2">
                Đã duyệt
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {sellers.filter((s) => s.status === "APPROVED").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="REJECTED" className="gap-2">
                Đã từ chối
                {!loading && (
                  <Badge variant="secondary" className="ml-1">
                    {sellers.filter((s) => s.status === "REJECTED").length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={status} className="mt-6">
              <SellersTable
                sellers={sellers}
                loading={loading}
                onViewDetail={handleViewDetail}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={status === "PENDING"}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Seller Detail Dialog */}
      {selectedSeller && (
        <SellerDetailDialog
          open={openDetail}
          onOpenChange={setOpenDetail}
          seller={selectedSeller}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={status === "PENDING"}
        />
      )}
    </div>
  );
}
