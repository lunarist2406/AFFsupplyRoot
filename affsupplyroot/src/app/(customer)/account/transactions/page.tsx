"use client";

import { useEffect, useState } from "react";
import { getMyTransactions, Transaction } from "@/services/payment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { CreditCard, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await getMyTransactions(page * pageSize, pageSize);
      if (response.success) {
        setTransactions(response.data.data);
        setTotal(response.data.total);
      } else {
        toast.error(response.message || "Không thể tải lịch sử giao dịch");
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error("Có lỗi xảy ra khi tải lịch sử giao dịch");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      PENDING: { label: "Chờ thanh toán", variant: "outline" },
      SUCCESS: { label: "Thành công", variant: "default" },
      FAILED: { label: "Thất bại", variant: "destructive" },
    };

    const config = statusConfig[status] || { label: status, variant: "outline" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-primary/20 via-green-primary/30 to-green-primary/20 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Lịch sử giao dịch</h1>
            <p className="text-gray-600 mt-2">Theo dõi các giao dịch thanh toán của bạn</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CreditCard className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chưa có giao dịch nào
                </h3>
                <p className="text-gray-600">
                  Bạn chưa có giao dịch thanh toán nào.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Giao dịch #{transaction.id}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(transaction.createdAt)}
                            </span>
                            <span>Đơn hàng #{transaction.orderID}</span>
                          </CardDescription>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Phương thức</p>
                          <p className="font-medium">{transaction.paymentMethod}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Số tiền</p>
                          <p className="text-xl font-bold text-green-primary">
                            {formatPrice(transaction.amount)}
                          </p>
                        </div>
                      </div>

                      {transaction.vnp_BankCode && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Ngân hàng</p>
                            <p className="font-medium">{transaction.vnp_BankCode}</p>
                          </div>
                          {transaction.vnp_CardType && (
                            <div>
                              <p className="text-gray-600">Loại thẻ</p>
                              <p className="font-medium">{transaction.vnp_CardType}</p>
                            </div>
                          )}
                          {transaction.vnp_TransactionNo && (
                            <div>
                              <p className="text-gray-600">Mã GD ngân hàng</p>
                              <p className="font-medium">{transaction.vnp_TransactionNo}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Trước
                  </Button>
                  <span className="text-sm text-gray-600">
                    Trang {page + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                  >
                    Sau
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
